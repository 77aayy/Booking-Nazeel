import re
import sys
import unicodedata
from difflib import SequenceMatcher
from pathlib import Path

import pandas as pd


def normalize_text(value: str) -> str:
    s = str(value or "").strip().lower()
    s = unicodedata.normalize("NFKC", s)
    s = s.replace("أ", "ا").replace("إ", "ا").replace("آ", "ا")
    s = s.replace("ى", "ي").replace("ة", "ه")
    s = re.sub(r"[^\w\s]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def booking_name_variants(name: str) -> set[str]:
    base = normalize_text(name)
    variants = {base}
    if "," in str(name):
        parts = [p.strip() for p in str(name).split(",") if p.strip()]
        if len(parts) >= 2:
            variants.add(normalize_text(" ".join(parts[::-1])))
    return {v for v in variants if v}


def similarity(a: str, b: str) -> float:
    return SequenceMatcher(None, a, b).ratio()


def pick_column(columns: list, includes_any: list[str], fallback_idx: int | None = None):
    for col in columns:
        n = normalize_text(col)
        if any(k in n for k in includes_any):
            return col
    if fallback_idx is not None and 0 <= fallback_idx < len(columns):
        return columns[fallback_idx]
    return None


def extract_refs_from_attendance(df_att: pd.DataFrame) -> set[str]:
    refs = set()
    for raw in df_att.values.ravel():
        val = str(raw).strip()
        if not val or val.lower() == "nan":
            continue
        for token in re.findall(r"\d{8,13}", val):
            refs.add(token.lstrip("0") or token)
    return refs


def extract_possible_attendance_names(df_att: pd.DataFrame) -> set[str]:
    names = set()
    for raw in df_att.values.ravel():
        text = str(raw).strip()
        if not text or text.lower() == "nan":
            continue
        text = str(raw).strip()
        if not text:
            continue
        if re.search(r"\d", text):
            continue
        if ":" in text:
            continue
        if len(text) < 5:
            continue
        words = [w for w in re.split(r"\s+", text) if w]
        if len(words) < 2 or len(words) > 6:
            continue
        n = normalize_text(text)
        if n:
            names.add(n)
    return names


def main():
    root = Path.cwd()
    booking_path = next((p for p in root.glob("*.xls") if "2026-03-01" in p.name), None)
    attendance_path = next((p for p in root.glob("*.xlsx") if "GuestsStatistical" in p.name), None)

    if len(sys.argv) >= 3:
        booking_path = Path(sys.argv[1])
        attendance_path = Path(sys.argv[2])

    if not booking_path or not booking_path.exists():
        raise FileNotFoundError("Booking file not found.")
    if not attendance_path or not attendance_path.exists():
        raise FileNotFoundError("Attendance file not found.")

    booking_df = pd.read_excel(booking_path)
    att_df = pd.read_excel(attendance_path, header=None)

    cols = [str(c) for c in booking_df.columns]
    ref_col = pick_column(cols, ["رقم الحجز", "booking", "id"], fallback_idx=0)
    guest_col = pick_column(cols, ["اسم الضيف", "الضيف", "guest"], fallback_idx=2)
    status_col = pick_column(cols, ["الحاله", "status"], fallback_idx=9 if len(cols) > 9 else None)

    if not ref_col or not guest_col:
        raise ValueError("Could not detect booking reference/guest columns.")

    att_refs = extract_refs_from_attendance(att_df)
    att_names = extract_possible_attendance_names(att_df)

    rows = []
    for _, row in booking_df.iterrows():
        ref_raw = str(row.get(ref_col, "")).strip()
        ref_digits = re.sub(r"\D", "", ref_raw)
        ref_norm = ref_digits.lstrip("0") or ref_digits

        guest_name = str(row.get(guest_col, "")).strip()
        status_val = str(row.get(status_col, "")).strip() if status_col else ""

        matched_by_ref = bool(ref_norm and ref_norm in att_refs)

        matched_by_name = False
        best_name = ""
        best_score = 0.0
        if not matched_by_ref and guest_name:
            variants = booking_name_variants(guest_name)
            for v in variants:
                for n in att_names:
                    sc = similarity(v, n)
                    if sc > best_score:
                        best_score, best_name = sc, n
            matched_by_name = best_score >= 0.92

        is_attended = matched_by_ref or matched_by_name
        if is_attended:
            reason = "reference_match" if matched_by_ref else "name_fuzzy_match"
            out = row.to_dict()
            out["attendance_detected"] = "yes"
            out["attendance_reason"] = reason
            out["matched_name_score"] = round(best_score, 3) if matched_by_name else ""
            out["matched_name_candidate"] = best_name if matched_by_name else ""
            out["status_value"] = status_val
            rows.append(out)

    attended_df = pd.DataFrame(rows)
    output_path = root / "booking_attended_only.xlsx"
    attended_df.to_excel(output_path, index=False)

    print(f"Booking file: {booking_path.name}")
    print(f"Attendance file: {attendance_path.name}")
    print(f"Detected attended rows: {len(attended_df)}")
    print(f"Output: {output_path}")


if __name__ == "__main__":
    main()

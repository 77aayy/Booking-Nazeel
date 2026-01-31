function handleAuthCheck() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "index.html";
    return false;
  }

  const decoded = decodeToken(token);
  if (!decoded) {
    localStorage.removeItem("token");
    window.location.href = "index.html";
    return false;
  }

  document.getElementById("userGreeting").textContent += decoded.username;
  return true;
}

function handleLogout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

function decodeToken(token) {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (e) {
    return null;
  }
}


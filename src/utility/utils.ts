export const getJwtValue = () => {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === "jwt") {
      return cookieValue;
    }
  }
  return localStorage.getItem("jwt");
};

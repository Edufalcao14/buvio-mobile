// Function to decode JWT tokens
export const decodeJWT = (token: string) => {
    if (!token || typeof token !== 'string' || token.split('.').length !== 3) {
      console.error("Invalid JWT token format:", token);
      return null;
    }
  
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };
  
  // Check if a token is expired
  export const isTokenExpired = (token: string) => {
    if (!token) return true;
  
    const decodedToken = decodeJWT(token);
    if (!decodedToken) return true;
  
    // exp is in seconds, Date.now() is in milliseconds
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };
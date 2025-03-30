/**
 * Gets a cookie value by name
 * @param name The name of the cookie to retrieve
 * @returns The cookie value or empty string if not found
 */
export function getCookie(name: string): string {
    
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${name}=`))
      ?.split('=')[1];
      
    return cookieValue || '';
  }
  
  /**
   * Sets a cookie with the given name and value
   * @param name The name of the cookie to set
   * @param value The value to store in the cookie
   * @param days Number of days until the cookie expires (default: 30)
   */
  export function setCookie(name: string, value: string, days: number = 30): void {
    
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);
    document.cookie = `${name}=${value}; expires=${expiryDate.toUTCString()}; path=/`;
  }
  
  /**
   * Removes a cookie by setting its expiration date to the past
   * @param name The name of the cookie to remove
   */
  export function removeCookie(name: string): void {
    if (typeof document === 'undefined') return;
    
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
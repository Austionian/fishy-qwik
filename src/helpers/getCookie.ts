/**
 *  Returns the cookie value or an empty string.
 */
function getCookie(cookie: string) {
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${cookie}=`))
    ?.split("=")[1];

  return value ? value : "";
}

export default getCookie;

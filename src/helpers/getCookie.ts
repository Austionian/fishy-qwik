export default function getCookie(cookie: string) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${cookie}=`))
    ?.split("=")[1];
}

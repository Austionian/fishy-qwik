export default function getCookie(cookie: string) {
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${cookie}=`))
    ?.split("=")[1];

  return value ? value : "";
}

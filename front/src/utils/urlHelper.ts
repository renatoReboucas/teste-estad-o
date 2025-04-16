export function getUrlPart(url: string) {
  const urlPart = url.split('/').pop();
  if (urlPart) {
    return urlPart;
  } else {
    return '';
  }
}
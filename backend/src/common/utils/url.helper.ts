export async function formatNewsUrl(editoria: string, urlPart: string): Promise<string> {
  const baseUrl = `${process?.env?.URL}:${process?.env?.PORT_FRONT}`;
  const formattedEditoria = await removeAccents(editoria);

  const formattedUrl = await removeAccents(urlPart);

  return `${baseUrl}/${formattedEditoria}/${formattedUrl}`;
}

export async function removeAccents(str: string): Promise<string> {
  return str.toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/\s+/g, '-')
  .replace(/[^\w-]+/g, '');
}
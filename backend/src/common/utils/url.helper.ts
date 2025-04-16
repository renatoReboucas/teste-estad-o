export async function formatNewsUrl(editoria: string, urlPart: string): Promise<string> {
  const formattedEditoria = await removeAccents(editoria);

  const formattedUrl = await removeAccents(urlPart);

  return `${formattedEditoria}/${formattedUrl}`;
}

export async function removeAccents(str: string): Promise<string> {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}

/**
 * Utility functions for handling image paths and URLs
 */
export const getImageUrl = (file?: Express.Multer.File): string | undefined => {
  const baseUrl = `${process?.env?.URL}:${process?.env?.PORT}`;
  if (!file) return undefined;
  return `${baseUrl}/public/${file.filename}`;
};
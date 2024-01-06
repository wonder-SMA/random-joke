export const getWithFirstUpperCharText = (text: string): string => {
  const trimmedText = text.trim();

  if (!text || trimmedText === '') {
    return '';
  }

  return trimmedText.slice(0, 1).toUpperCase() + trimmedText.slice(1);
};

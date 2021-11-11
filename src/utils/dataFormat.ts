export const conversionDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleString('ja-JP').replace(/\//g, '.').slice(0, 16);
};

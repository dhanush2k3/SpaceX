export function debounce(
  func: (text: string) => void, 
): (text: string) => void {
  const delay = 500
  let timeoutId: NodeJS.Timeout;

  return (text: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(text), delay);
  };
}

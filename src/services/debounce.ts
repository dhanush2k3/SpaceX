

// export function debounce<T extends (...args : any[]) => void>(func : T , delay : number) 
// :(...args : Parameters<T>) => void{

//     let timeoutid : NodeJS.Timeout;

//     return (...args : Parameters<T>) => {
//         clearTimeout(timeoutid);

//         timeoutid = setTimeout(() => {
//         func(...args);
//         },delay)
//     }
// }


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

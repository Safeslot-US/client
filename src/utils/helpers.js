//Closure to display 5 slots at a time.
export const displayFive = function (list)  {
    let start = 0; 
    let end = 5; 
    return function addFive() {
      let sliced = list.slice(start, end); 
      start += 5; 
      end += 5;
      return sliced; 
    }
  }

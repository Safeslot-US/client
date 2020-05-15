//Closure to display 5 slots at a time.
export const displayNine = function (list)  {
    let start = 0; 
    let end = 9; 
    return function addNine() {
      let sliced = list.slice(start, end); 
      start += 9; 
      end += 9;
      return sliced; 
    }
  }

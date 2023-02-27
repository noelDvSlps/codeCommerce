// let keyX
export const keyGenerator = (prefix) => {
  let today = new Date();
  let key =
    today.getDate().toString() +
    (today.getMonth() + 1).toString() +
    today.getFullYear().toString() +
    today.getHours().toString() +
    today.getMinutes().toString() +
    today.getSeconds().toString() +
    today.getMilliseconds();
    // if (keyX === key) {
    //   keyGenerator(prefix)
    // } else {
    //   keyX = key
      return (prefix + key)
    
    
  };
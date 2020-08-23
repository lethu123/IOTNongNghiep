// const object1 = {
//   a: 'somestring',
//   b: 42
// };
// const a = [];
// for (const [key, value] of Object.entries(object1)) {
//   a.push({ [key]: value });
// }

// console.log(a);


export const getCurrent = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + '-' + dd;

  console.log("today", today);
  return today;
}

export const getCurrentFE = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + "/" + mm + '/' + yyyy;
  return today;
}
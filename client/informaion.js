var date = new Date("03-27-2022"); // M-D-YYYY

var d = date.getDate();
var m = date.getMonth() + 1;
var y = date.getFullYear();

var dateString = y + (m <= 9 ? "0" + m : m) + (d <= 9 ? "0" + d : d);
console.log(dateString); //20220327

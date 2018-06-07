var moment = require('moment');

var date = moment();

// console.log(date.format('YYYY Do, MMM'));
// console.log(date.add(1000, 'years'));
// console.log(date.format('LT'))
console.log(date.format('hh:m a'))

var time = date.valueOf() // eqauls to moment().valueOf() which collects the timestamp
console.log(time)



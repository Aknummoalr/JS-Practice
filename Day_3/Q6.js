// Flatten this with and without using flat() & flatMap()

//With use of Flat and Flatmap
const complexData = [
  [1, 2],
  [3, [4, 5]],
  [[6], [[7, 8], 9]],
  10
];

console.log(complexData.flat(3));


const flattend = complexData.flatMap((n) => {
    if(Array.isArray(n)){
        return n.flat(Infinity);
    }

    if(typeof n === 'number'){
        return n;
    }
})
console.log(flattend);
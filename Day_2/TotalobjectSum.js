// Write a function that will accept an array of objects (values as numbers) as a parameter,
//  and will return a new array of sum of all values of Object

let myObj = [
    {
        a: 2,
        b: 3,
        c: 4
    },
    {
        a: 4,
        b: 5,
        c: 6
    },
]

// function TotalobjectSum(myObj){
//     return myObj.map(Object.values(myObj))
// }


const ans = myObj
    .map(myObj => Object.values(myObj)
        .reduce((sum, num) => sum + num, 0)
    )
    .reduce((total, itemSum) => total + itemSum, 0);

console.log(ans)


// Write a function that accepts one parameter, Obj, and will work like an object. keys.

ob = {
    1: 'a',
    2: 'b',
    3: 'c',
    4: 'd',
    5: 'e',
    6: 'f',
    7: 'g',
}

// Object.prototype.Mykeys = function(obj){
//     let ans = []
//     for(let i in obj){
//         ans.push(i);
//     }
//     return ans;
// }

// console.log(ob.Mykeys);

function Mykeys(obj){
    let res =[]
    for(let k in obj){
        res.push(Number(k));
    }
    return res;
}

console.log(Mykeys(ob));
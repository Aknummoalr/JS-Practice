// Write a function that accepts two parameters,arr and callback, and will work like Map.
function callbackFn(k){
    return k*2;
}

function anotherCallback(k){
    return k+1;
}

arr = [2,3,4,5,6,7,8];
//we use array.prototype to create our custom map
// this stands for array passed
// callbackFn acts on each of the index i of array

Array.prototype.MyMap = function(callbackFn){
    let result = []
    for(let i = 0 ; i < this.length;i++){
        result.push(callbackFn(this[i], i ,this));
    }

    return result
}


console.log(arr.MyMap(callbackFn));
console.log(arr.MyMap(anotherCallback));
console.log(arr.MyMap((s) => s*s));




//************************************************ */

// function MyMap(arr, callbackFn){
//     let res = []
//     for(let i=0 ; i < arr.length ; i++){
//         res[i] = callbackFn(arr[i]);
//     }
//     return res;
// }

// function callbackFn(t){
//     return t+1;
// }

// console.log(MyMap(arr,callbackFn));

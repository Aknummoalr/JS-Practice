// Write a function that will accept an array of objects (values can be any type, arr, obj, str,num) as a parameter, and will return a new array of sum of all numeric values of Object
// eg.  [{a:1, b: 4}, {b:2}]] ⇒ [5, 2]

const obj = [{a: 1,b: 4},{c:2},{d:6,e:2}];
// const arr = [{a:3,b:1},{c:3}];

function callbackFn(obj){
    let sum = 0;
    for(k in obj){
        let v = obj[k];
        sum += v; 
    }

    return sum;
}

function ObjectSum(obj){
    let ans = obj.map(callbackFn);
    return ans;
}

console.log(ObjectSum(obj));
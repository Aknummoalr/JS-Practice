
arr = [2,5,7,3,13,11];

Array.prototype.MyReduce = function(callbackFn){
    let Accum = 0
    for(let i = 0 ; i < this.length;i++){
        Accum = callbackFn(Accum, this[i], i, this);
    }
    return Accum 
} 

console.log(arr.MyReduce((ac, i) => ac+i)); // 41
console.log(arr.MyReduce((ac, i) => ac*i)); // 0
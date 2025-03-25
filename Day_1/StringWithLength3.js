// Given an array of strings, print the strings with length 3, e.g [a, b, cat, f, dog] output = [cat, dog]

arr = ['a','b','cat','f','dog']
const ans=[]
for(let i =0;i<arr.length;i++){
    let t = arr[i].length;
    if(t == 3){
        ans.push(arr[i]);
    }
}
console.log(ans);
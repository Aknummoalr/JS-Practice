//  Given an array of strings, print the strings with even length, e.g [a, b, cat, ff, dog] output = [ff]
arr = ['a','b','cat','ff','dog','catdog']
const ans=[]
for(let i =0;i<arr.length;i++){
    let t = arr[i].length;
    if(t%2 == 0){
        ans.push(arr[i]);
    }
}
console.log(ans);


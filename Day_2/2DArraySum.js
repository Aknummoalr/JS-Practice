array = [
    [1,2,4],
    [2,3,4],
    [3,4,5],
    [4,5,6]
]

function twoDArraySum(arr){
    let ans = 0;
    for(let  i =0 ; i < arr.length;i++){
        for(let j=0 ; j < arr[i].length;j++){
            ans+=arr[i][j];
        }
    }
    
    return ans;
}

console.log(twoDArraySum(array));
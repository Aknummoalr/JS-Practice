//Check if number is Prime or not

function isPrime(num){
    if(num < 2){
        return false;
    }
    let i=2;
    while(i < num){
        if(num % i == 0){
            return false;
        }
        i++;
    }
    return true;
}

console.log(isPrime(5));
console.log(isPrime(8));

let num = 14
let i =2;
let ans = num % i==0 ? true:false;
console.log(ans);
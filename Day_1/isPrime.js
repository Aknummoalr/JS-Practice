//Check if number is Prime or not

function isPrime(num){
    let i=2;
    while(i < num){
        if(num % i == 0){
            return false
        }
        i++;
    }
    return true;
}

console.log(isPrime(5));
console.log(isPrime(8));




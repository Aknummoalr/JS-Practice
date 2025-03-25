//print n prime numbers
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


function printNPrime(num){
    let x = 2
    while(x <=num){
        if(isPrime(x)){
            console.log(x);
        }
        x++;
    }
}
// printNPrime(29);

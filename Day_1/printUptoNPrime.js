//print n prime numbers
function isPrime(num){
    if(num < 2){
        return false;
    }
    let i=2;
    while(i < num){
        if(num % i == 0){
            return false
        }
        i++;
    }
    return true;
}


function printUptoNPrime(num){
    let x = 2
    while(x <=num){
        if(isPrime(x)){
            console.log(x);
        }
        x++;
    }
}
// printUptoNPrime(29);

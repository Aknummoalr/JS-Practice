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

let obj = {
    'a':4,
    'b':5,
    'c':6,
    'd':7,
    'e':45674
}
const ans = []
for(let i in obj){
    //print if value is even
    if(obj[i] % 2 == 0){
        console.log(i+":"+obj[i])
    }

    //print if value is prime
    if(isPrime(obj[i])){
        console.log(i+":"+obj[i])
    }

    //print double of each value
    // console.log(obj[i]*2);

    //print half of each value
    // console.log(obj[i]/2);
}

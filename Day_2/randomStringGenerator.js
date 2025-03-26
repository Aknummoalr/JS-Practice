// Write a function to generate an ID of a defined length. ID will be alphanumeric. e.g. generateID(5) ⇒ a31cx, generateeID(3) ⇒ 1x0.

// issue generates string of small chars only

function generate(num){
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_-+<>,.?/`~";
    let result = ''
    for(let i = 0 ;i < num; i++){
        result += chars.charAt(Math.floor(Math.random() * num));
    }

    return result;
}
console.log(generate(26));
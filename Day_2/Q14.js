// Write a function that will accept an array of objects (values can be any type, arr, obj, str,num) as a parameter, and will return a new array of sum of all numeric values of Object, and if value is an Object or arr calculate the sum of it.
 const data = [
    { 
        a: 10, 
        b: [5, { c: 3, d: 7 }], 
        e: "hello"
    },
    {   x: 2, 
        y: { 
            z: [1, 2, 3], 
            w: 4 
        },
        q: "test" 
    },
    { 
        p: {
            q: 
            { 
                r: 6 
            } 
        },
        s: [2, 3, 4] 
    }
]; 
    
// Output: [25, 12, 15]

function SumOfComplexData(d){
    return d.map(
        (x) =>{
            if(Array.isArray(x)){
                let s =(y)=>{
                    if(typeof y === 'object'){
                        return Object.values(y).reduce((sum,num) => sum+num,0);
                    }
                }
                return s;
            }
            if(typeof x === 'object'){
                let s = (y) => {
                    if(Array.isArray(y)){
                        return y.reduce((sum,num) => sum+num,0);
                    }
                }
                return s;
            }

            return SumOfComplexData(x);

        }

    )
}

console.log(SumOfComplexData(data));

ar = [2,3,4,5,6];
console.log(ar.reduce((sum,num)=> sum+num,0));
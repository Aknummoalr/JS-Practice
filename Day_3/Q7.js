// Write a function that will accept an array of objects (values can be any type, arr, obj, str,num) as a parameter, and will return a new array of sum of all numeric values of Object, and if value is an Object or arr calculate the sum of it. 
// UPDATE: Do it just for single nesting (no need of recursion)
// 
const data = [
{ a: 10, b: [5, 10], e: "hello" },
{ x: 2, y: { z: [1, 2, 3], w: 4 }, q: "test" },
{ p: { q: 8 }, s: [2, 3, 4] }
];                           
// 
// // Output: [15, 6, 17]


function abc(d){
    return d.map((ob) => { 
        const res = Object.values(ob).flatMap((v) => {
            if(Array.isArray(v)){
                return v.filter(i => typeof i === 'number')
            }

            if(typeof v === 'object' && v !== null){
                return Object.values(v).filter(i => typeof i === 'number');
            }

            return typeof v === 'number' ? v : []; 
        })

        return res.reduce((sum, num) => sum+num, 0);
    })
}

console.log(abc(data));
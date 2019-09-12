// function sandwich(a, b, c) {
//     console.log(a)
//     console.log(b)
//     console.log(c)
// }

// const food = ['a', 'b', 'c'];

// // sandwich.apply(null, food);

// sandwich(...food);

// const firstArray = [2, 6, 3, 8, 10, 1, 34, 23, 56, 37]
// const secondArray = [3, 45, 65, 23, 90, 49]
// let max;

// max = Math.max(...firstArray, ...secondArray);

// console.log(max);

var pilots = [{
        id: 10,
        name: "Poe Dameron",
        years: 14,
    },
    {
        id: 2,
        name: "Temmin 'Snap' Wexley",
        years: 30,
    },
    {
        id: 41,
        name: "Tallissan Lintra",
        years: 16,
    },
    {
        id: 99,
        name: "Ello Asty",
        years: 22,
    }
];
let sum = 0;
for (let i = 0; i < pilots.length; i++) {
    sum = sum + (pilots[i].years)
}
console.log(sum);

let sumOfPilotYear = pilots.reduce((prev, next, index, array) => {
    console.log('prev', prev);
    console.log('next', next);
    console.log('index', index);
    console.log('array', array)
    return prev + next.years
}, [])
console.log(sumOfPilotYear);
// @ts-check

let minLabel = 1;
let maxLabel = 1000000;
// this.cups = [3,8,9,1,2,5,4,6,7];
let cups = [3,9,8,2,5,4,7,1,6];
for (let nLoop = 10; nLoop <= maxLabel; nLoop++) cups.push(nLoop);
let moves = 1;
let startTime = Date.now();
do {
    let removedCups = cups.splice(1, 3);
    let destinationLabel = cups[0] - 1;
    while (cups.indexOf(destinationLabel) == -1)
    {
        destinationLabel--;
        if (destinationLabel < minLabel) destinationLabel = maxLabel;
    }
    let destinationCupIndex = cups.indexOf(destinationLabel);
    cups.splice(destinationCupIndex + 1, 0, removedCups[0], removedCups[1], removedCups[2]);
    cups.push(cups.shift());
    if (moves % 1000 == 0)
    {
        console.log(`After ${moves} moves, cup 1 is at position ${cups.indexOf(1)}`);
        let eta = startTime + (Date.now() - startTime) * 10000000 / moves;
        console.log(moves * 100 / 10000000 + "% complete; ETA is " + new Date(eta).toLocaleString());
    }
} while (moves++ < 10000000);
let indexOfOne = cups.indexOf(1);
let factor1 = cups[indexOfOne + 1];
let factor2 = cups[indexOfOne + 2];
console.log(`Final answer is ${factor1} * ${factor2} = ${factor1 * factor2}`);

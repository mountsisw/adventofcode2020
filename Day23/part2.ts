// @ts-check

import { doPart, PuzzlePart } from "../aocFW.js";

window.onload = function () { doPart(new PuzzleSolution()); };

const maxLabel = 1000000;
const maxMoves = 10000000;

class PuzzleSolution extends PuzzlePart
{
    private cupCircle: Map<number, number>;

    // called after a file is selected, prior to processing
    public init(inputElement: HTMLDivElement, outputElement: HTMLDivElement, answerElement: HTMLDivElement)
    {
        super.init(inputElement, outputElement, answerElement);
        this.cupCircle = new Map();
    }

    // called once per record (line) in the input file
    public processRecord(record: string) : Boolean
    {
        // let cups = [3,8,9,1,2,5,4,6,7];
        let cups = [3,9,8,2,5,4,7,1,6];
        let nextLabel: number;
        for (let nLoop = 0; nLoop < cups.length - 1; nLoop++)
        {
            nextLabel = cups[nLoop + 1];
            this.cupCircle.set(cups[nLoop], nextLabel);
        }
        this.cupCircle.set(nextLabel, cups.length + 1);
        for (let nLoop = cups.length + 1; nLoop < maxLabel; nLoop++)
        {
            nextLabel = nLoop + 1;
            this.cupCircle.set(nLoop, nextLabel);
        }
        this.cupCircle.set(nextLabel, cups[0]);
        console.log("nextLabel: " + nextLabel);
        console.log("Cup circle size: " + this.cupCircle.size);
        return false;
    }

    // called after all records are read in
    public displayAnswer()
    {
        let minLabel = 1;
        let move = 1;
        let currentCupLabel = 3;
        let removedCups = new Array(3);
        let startTime = Date.now();
        do {
            /* console.log("-- move " + move + " --");
            let label = currentCupLabel;
            let debug = "cups:"
            do {
                debug += " " + label;
                label = this.cupCircle.get(label);
            } while (label != currentCupLabel);
            console.log(debug); */
            removedCups[0] = this.cupCircle.get(currentCupLabel);
            removedCups[1] = this.cupCircle.get(removedCups[0]);
            removedCups[2] = this.cupCircle.get(removedCups[1]);
            // console.log("pick up: " + removedCups[0] + ", " + removedCups[1] + ", " + removedCups[2]);
            this.cupCircle.set(currentCupLabel, this.cupCircle.get(removedCups[2]));
            let destinationLabel = currentCupLabel;
            do
            {
                destinationLabel--;
                if (destinationLabel < minLabel) destinationLabel = maxLabel;
            } while (removedCups.indexOf(destinationLabel) > -1)
            // console.log("destination: " + destinationLabel);
            // console.log("");
            let destinationAfter = this.cupCircle.get(destinationLabel);
            this.cupCircle.set(destinationLabel, removedCups[0]);
            this.cupCircle.set(removedCups[2], destinationAfter);
            currentCupLabel = this.cupCircle.get(currentCupLabel);
            if (move % 10000 == 0)
            {
                let eta = startTime + (Date.now() - startTime) * maxMoves / move;
                console.log(move * 100 / maxMoves + "% complete; ETA is " + new Date(eta).toLocaleString());
            }
        } while (move++ < maxMoves);

        /* console.log("-- final --");
        let label = currentCupLabel;
        let debug = "cups:"
        do {
            debug += " " + label;
            label = this.cupCircle.get(label);
        } while (label != currentCupLabel);
        console.log(debug); */
        let factor1 = this.cupCircle.get(1);
        let factor2 = this.cupCircle.get(factor1);
        this.answerDisplay.innerText = `Final answer is ${factor1} * ${factor2} = ${factor1 * factor2}`;
    }
}
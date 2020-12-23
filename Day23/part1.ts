// @ts-check

import { doPart, PuzzlePart } from "../aocFW.js";

window.onload = function () { doPart(new PuzzleSolution()); };

class PuzzleSolution extends PuzzlePart
{
    public cups: Array<number>;
    
    // called after a file is selected, prior to processing
    public init(inputElement: HTMLDivElement, outputElement: HTMLDivElement, answerElement: HTMLDivElement)
    {
        super.init(inputElement, outputElement, answerElement);
        this.cups = new Array();
    }

    // called once per record (line) in the input file
    public processRecord(record: string) : Boolean
    {
        this.cups = [3,8,9,1,2,5,4,6,7];
        // this.cups = [3,9,8,2,5,4,7,1,6];
        return false;
    }

    // called after all records are read in
    public displayAnswer()
    {
        let minLabel = 1;
        let maxLabel = 1000000;
        for (let nLoop = 10; nLoop <= maxLabel; nLoop++) this.cups.push(nLoop);
        let moves = 1;
        do {
            let removedCups = this.cups.splice(1, 3);
            let destinationLabel = this.cups[0] - 1;
            while (this.cups.indexOf(destinationLabel) == -1)
            {
                destinationLabel--;
                if (destinationLabel < minLabel) destinationLabel = maxLabel;
            }
            let destinationCupIndex = this.cups.indexOf(destinationLabel);
            this.cups.splice(destinationCupIndex + 1, 0, removedCups[0], removedCups[1], removedCups[2]);
            this.cups.push(this.cups.shift());
            if (moves % 1000 == 0) console.log(`After ${moves} moves, cup 1 is at position ${this.cups.indexOf(1)}`);
        } while (moves++ < 10000000);
        let indexOfOne = this.cups.indexOf(1);
        this.answerDisplay.innerText = "Final answer is " + (this.cups[indexOfOne + 1] * this.cups[indexOfOne + 2]);
    }
}
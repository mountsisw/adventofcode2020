// @ts-check

import { doPart, PuzzlePart } from "../aocFW.js";

window.onload = function () { doPart(new PuzzleSolution()); };

class PuzzleSolution extends PuzzlePart
{
    private data: Array<number>;
    private oneJolts: number;
    private threeJolts: number;

    // called after a file is selected, prior to processing
    public init(inputElement: HTMLDivElement, outputElement: HTMLDivElement, answerElement: HTMLDivElement)
    {
        super.init(inputElement, outputElement, answerElement);
        this.data = new Array();
        this.oneJolts = 0;
        this.threeJolts = 1;
    }

    // called once per record (line) in the input file
    public processRecord(record: string) : Boolean
    {
        if (record.length > 0)
        {
            this.data.push(Number(record));
        }
        return true;
    }

    // called after all records are read in
    public displayAnswer()
    {
        this.data.sort((a, b) => { return a - b; } );
        let jolts: number = 0;
        for (let nLoop = 0; nLoop < this.data.length; nLoop++)
        {
            this.oneJolts += this.data[nLoop] == jolts + 1 ? 1 : 0;
            this.threeJolts += this.data[nLoop] == jolts + 3 ? 1 : 0;
            jolts = this.data[nLoop];
        }
        this.outputDisplay.innerText = "Joltage reading is " + String(this.oneJolts * this.threeJolts);
    }
}


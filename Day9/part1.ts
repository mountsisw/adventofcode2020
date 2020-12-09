// @ts-check

import { doPart, PuzzlePart } from "../aocFW.js";

window.onload = function () { doPart(new PuzzleSolution()); };

class PuzzleSolution extends PuzzlePart
{
    private data: Array<number>;
    private preambleLength: number;

    // called after a file is selected, prior to processing
    public init(inputElement: HTMLDivElement, outputElement: HTMLDivElement, answerElement: HTMLDivElement)
    {
        super.init(inputElement, outputElement, answerElement);
        this.data = new Array();
        this.preambleLength = 25;
    }

    // called once per record (line) in the input file
    public processRecord(record: string) : Boolean
    {
        if (record.length > 0)
        {
            let newNumber = Number(record);
            this.data.push(newNumber);
            let newLength = this.data.length;
            if (newLength > this.preambleLength)
            {
                for (let loop1: number = newLength - this.preambleLength - 1; loop1 < newLength - 1; loop1++)
                    for (let loop2: number = loop1 + 1; loop2 < newLength; loop2++)
                        if (this.data[loop1] + this.data[loop2] == newNumber) return true;
                return false;
            }
        }
        return true;
    }

    // called after all records are read in
    public displayAnswer()
    {
        this.outputDisplay.innerText = "First offending number is " + this.data[this.data.length - 1];
    }
}


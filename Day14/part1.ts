// @ts-check

import { doPart, PuzzlePart } from "../aocFW.js";

window.onload = function () { doPart(new PuzzleSolution()); };

class PuzzleSolution extends PuzzlePart
{
    private andMask: number;
    private orMask: number;
    private lower8andMask: number;
    private lower8orMask: number;
    private values: Map<number, number>;

    // called after a file is selected, prior to processing
    public init(inputElement: HTMLDivElement, outputElement: HTMLDivElement, answerElement: HTMLDivElement)
    {
        super.init(inputElement, outputElement, answerElement);
        this.andMask = this.orMask = this.lower8andMask = this.lower8orMask = 0;
        this.values = new Map();
    }

    // called once per record (line) in the input file
    public processRecord(record: string) : Boolean
    {
        if (record.length > 0)
        {
            this.inputDisplay.innerText = record;
            let fields: Array<string> = record.split(" ");
            if (fields[0] == "mask")
            {
                this.andMask = this.orMask = this.lower8andMask = this.lower8orMask = 0;
                for (let nLoop: number = 0; nLoop < 8; nLoop++)
                {
                    let maskChar: string = fields[2].substr(fields[2].length - (nLoop + 1), 1);
                    if (maskChar != "0") this.lower8andMask += Math.pow(2, nLoop);
                    if (maskChar == "1") this.lower8orMask += Math.pow(2, nLoop);
                }
                for (let nLoop: number = 8; nLoop < fields[2].length; nLoop++)
                {
                    let maskChar: string = fields[2].substr(fields[2].length - (nLoop + 1), 1);
                    if (maskChar != "0") this.andMask += Math.pow(2, nLoop - 8);
                    if (maskChar == "1") this.orMask += Math.pow(2, nLoop - 8);
                }
                this.outputDisplay.innerText = String(this.andMask) + " and " + String(this.orMask);
                console.log(this.andMask + ", " + this.orMask + ", " + this.lower8andMask + ", " + this.lower8orMask);
            }
            else
            {
                let index: number = Number(fields[0].substr(4, fields[0].length - 5));
                let value: number = Number(fields[2]);
                let lowerValue: number = value % 256;
                lowerValue &= this.lower8andMask;
                lowerValue |= this.lower8orMask;
                let upperValue: number = Math.floor(value / 256);
                upperValue &= this.andMask;
                upperValue |= this.orMask;
                value = upperValue * 256 + lowerValue;
                this.values.set(index, value);
                this.outputDisplay.innerText = String(value);
                console.log("[" + index + "] " + fields[2] + " => " + value);
            }
        }
        return true;
    }

    // called after all records are read in
    public displayAnswer()
    {
        let sum: number = 0;
        this.values.forEach((value) => { sum += value; });
        this.answerDisplay.innerText = "Sum of values is " + String(sum);
    }
}


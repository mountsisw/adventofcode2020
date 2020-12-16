// @ts-check

import { doPart, PuzzlePart } from "../aocFW.js";

window.onload = function () { doPart(new PuzzleSolution()); };

class PuzzleSolution extends PuzzlePart
{
    private ranges: Array<[number, number]>;
    private answer: number;
    private mode: number;

    // called after a file is selected, prior to processing
    public init(inputElement: HTMLDivElement, outputElement: HTMLDivElement, answerElement: HTMLDivElement)
    {
        super.init(inputElement, outputElement, answerElement);
        this.ranges = new Array();
        this.answer = 0;
        this.mode = 0;
    }

    // called once per record (line) in the input file
    public processRecord(record: string) : Boolean
    {
        if (this.mode == 0)
        {
            if (record.length == 0) this.mode = 1;
            else
            {
                let fields = record.split(" ");
                let range = fields[1].split("-");
                let minMax: [number, number] = [Number(range[0]), Number(range[1])];
                this.ranges.push(minMax);
                range = fields[3].split("-");
                minMax = [Number(range[0]), Number(range[1])];
                this.ranges.push(minMax);
            }
        }
        else if (this.mode == 1) { if (record == "nearby tickets:") this.mode = 2; }
        else
        {
            this.inputDisplay.innerText = record;
            this.outputDisplay.innerText = "Valid";
            let fields = record.split(",");
            for (let nLoop = 0; nLoop < fields.length; nLoop++)
            {
                let found = false;
                let value = Number(fields[nLoop]);
                for (let loop1 = 0; loop1 < this.ranges.length; loop1++)
                {
                    if (value >= this.ranges[loop1][0] && value <= this.ranges[loop1][1])
                    {
                        found = true;
                        break;
                    }
                }
                if (found == false)
                {
                    this.outputDisplay.innerText = value + " is invalid";
                    this.answer += value;
                }
            }
        }
        return true;
    }

    // called after all records are read in
    public displayAnswer()
    {
        this.answerDisplay.innerText = "Ticket scanning error rate is " + this.answer;
    }
}


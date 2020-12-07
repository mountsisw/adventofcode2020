// @ts-check

import { doPart, PuzzlePart } from "../aocFW.js";

window.onload = function () { doPart(new PuzzleSolution()); };

class PuzzleSolution extends PuzzlePart
{
    private bagRules: Map<string, Map<string, number>>;

    // called after a file is selected prior to processing
    public init(inputElement: HTMLDivElement, outputElement: HTMLDivElement, answerElement: HTMLDivElement)
    {
        super.init(inputElement, outputElement, answerElement);
        this.bagRules = new Map();
    }

    // called once per record (line) in the input file
    public processRecord(record: string) : Boolean
    {
        if (record.length > 0)
        {
            let parsedRecord: Array<string> = record.split(" ");
            let index: number = 4;
            let contents: Map<string, number> = new Map();
            while (index < parsedRecord.length)
            {
                if (Number.isNaN(Number(parsedRecord[index])) == false)
                    contents.set(parsedRecord[index + 1] + parsedRecord[index + 2], Number(parsedRecord[index]))
                index += 4;
            }
            this.bagRules.set(parsedRecord[0] + parsedRecord[1], contents);
        }
        return true;
    }

    // called after all records are read in
    public displayAnswer()
    {
        let finalCount: number = this.getBags("shinygold");
        this.answerDisplay.innerText = `Shiny gold bags contain ${finalCount} other bags`;
    }

    private getBags(bagKey: string) : number
    {
        let bagCount: number = 0;
        this.bagRules.get(bagKey).forEach(function (value, key)
        {
            bagCount += value * (this.getBags(key) + 1);
        }, this);
        return bagCount;
    }
}


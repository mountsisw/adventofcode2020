// @ts-check

import { doPart, PuzzlePart } from "../aocFW.js";

window.onload = function () { doPart(new PuzzleSolution()); };

class PuzzleSolution extends PuzzlePart
{
    private data: Array<number>;
    private combos: Map<number, number>;

    // called after a file is selected, prior to processing
    public init(inputElement: HTMLDivElement, outputElement: HTMLDivElement, answerElement: HTMLDivElement)
    {
        super.init(inputElement, outputElement, answerElement);
        this.data = new Array();
        this.combos = new Map();
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
        this.outputDisplay.innerText = "Adapter combinations is " + String(this.calcCombos(0));
    }

    private calcCombos(jolts: number)
    {
        if (this.combos.has(jolts)) return this.combos.get(jolts);
        let total: number = this.data.includes(jolts + 1) ? this.calcCombos(jolts + 1) : 0;
        total += this.data.includes(jolts + 2) ? this.calcCombos(jolts + 2) : 0;
        total += this.data.includes(jolts + 3) ? this.calcCombos(jolts + 3) : 0;
        if (total == 0) total = 1;
        this.combos.set(jolts, total);
        return total;
    }
}
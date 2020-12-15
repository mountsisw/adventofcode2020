// @ts-check

import { doPart, PuzzlePart } from "../aocFW.js";

window.onload = function () { doPart(new PuzzleSolution()); };

class PuzzleSolution extends PuzzlePart
{
    private answers: Array<string>;

    // called after a file is selected, prior to processing
    public init(inputElement: HTMLDivElement, outputElement: HTMLDivElement, answerElement: HTMLDivElement)
    {
        super.init(inputElement, outputElement, answerElement);
        this.answers = new Array();
    }

    // called once per record (line) in the input file
    public processRecord(record: string) : Boolean
    {
        if (record.length > 0)
        {
            this.inputDisplay.innerText = record;
            let fields: Array<string> = record.split(",");
            let numbersSaid: Map<number, [number, number]> = new Map();
            let priorNumber: number;
            for (let turn: number = 0; turn < 30000000; turn++)
            {
                let nextNumber: number;
                if (turn < fields.length)
                {
                    nextNumber = Number(fields[turn]);
                    numbersSaid.set(nextNumber, [turn, -1]);
                }
                else
                {
                    nextNumber = numbersSaid.get(priorNumber)[1] > -1 ? numbersSaid.get(priorNumber)[0] - numbersSaid.get(priorNumber)[1] : 0;
                    if (numbersSaid.has(nextNumber))
                        numbersSaid.set(nextNumber, [turn, numbersSaid.get(nextNumber)[0]]);
                    else numbersSaid.set(nextNumber, [turn, -1]);
                }
                priorNumber = nextNumber;
            }
            this.outputDisplay.innerText = String(priorNumber);
            this.answers.push(record + " => " + String(priorNumber));
        }
        return true;
    }

    // called after all records are read in
    public displayAnswer()
    {
        this.answers.forEach((value) => { this.answerDisplay.innerHTML += value + "<br/>"; });
    }
}
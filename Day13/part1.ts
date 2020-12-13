// @ts-check

import { doPart, PuzzlePart } from "../aocFW.js";

window.onload = function () { doPart(new PuzzleSolution()); };

class PuzzleSolution extends PuzzlePart
{
    private departureTime: number;
    private busses: Array<number>;

    // called after a file is selected, prior to processing
    public init(inputElement: HTMLDivElement, outputElement: HTMLDivElement, answerElement: HTMLDivElement)
    {
        super.init(inputElement, outputElement, answerElement);
        this.departureTime = 0;
        this.busses = new Array();
    }

    // called once per record (line) in the input file
    public processRecord(record: string) : Boolean
    {
        if (record.length > 0)
        {
            if (this.departureTime == 0) this.departureTime = Number(record);
            else
            {
                let availableRoutes: Array<string> = record.split(",");
                for (let nLoop: number = 0; nLoop < availableRoutes.length; nLoop++)
                    if (availableRoutes[nLoop] != "x") this.busses.push(Number(availableRoutes[nLoop]));
            }
        }
        return true;
    }

    // called after all records are read in
    public displayAnswer()
    {
        let waitTime: number;
        let earliestBus: number;
        let minWait = Number.MAX_SAFE_INTEGER;
        for (let nLoop: number = 0; nLoop < this.busses.length; nLoop++)
        {
            let waitTime: number = this.busses[nLoop] - this.departureTime % this.busses[nLoop];
            if (waitTime == this.busses[nLoop]) waitTime = 0;
            if (waitTime < minWait)
            {
                minWait = waitTime;
                earliestBus = this.busses[nLoop];
            }
        }
        this.answerDisplay.innerText = "Weird answer is " + String(earliestBus * minWait);
    }
}


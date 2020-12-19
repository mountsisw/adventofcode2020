// @ts-check

import { doPart, PuzzlePart } from "../aocFW.js";

window.onload = function () { doPart(new PuzzleSolution()); };

class PuzzleSolution extends PuzzlePart
{
    private rules: Map<string, Array<string>>;
    private answer: number;
    private mode: number;

    // called after a file is selected, prior to processing
    public init(inputElement: HTMLDivElement, outputElement: HTMLDivElement, answerElement: HTMLDivElement)
    {
        super.init(inputElement, outputElement, answerElement);
        this.rules = new Map();
        this.answer = 0;
        this.mode = 0;
    }

    // called once per record (line) in the input file
    public processRecord(record: string) : Boolean
    {
        if (record.length > 0)
        {
            this.inputDisplay.innerText = record;
            if (this.mode == 0)
            {
                let fields = record.split(": ");
                this.rules.set(fields[0], fields[1].split(" "));
                this.outputDisplay.innerText = "Stored";
            }
            else
            {
                let result = this.validMessage(record, 0, "0");
                console.log(record + " => " + result + " | " + record.length);
                if (result == record.length)
                {
                    this.answer++;
                    this.outputDisplay.innerText = "Valid";
                    console.log(record + " is valid");
                }
                else
                {
                    this.outputDisplay.innerText = "Invalid";
                    console.log(record + " is invalid");
                }
            }
        }
        else this.mode++;
        return true;
    }

    // called after all records are read in
    public displayAnswer()
    {
        this.answerDisplay.innerText = this.answer + " valid messages";
    }

    private validMessage(message: string, position: number, rule: string) : number
    {
        if (position >= message.length) return 0;
        let parameters: Array<string> = this.rules.get(rule);
        if (parameters.length == 1 && parameters[0].substr(0, 1) == '"')
            return message.substr(position, 1) == parameters[0].substr(1, 1) ? 1 : -1;
        let results: Array<string> = new Array(parameters.length);
        results.fill("U");
        let rulePosition = position;
        parameters.forEach((value, index) =>
        {
            if (value != "|")
            {
                let result = this.validMessage(message, rulePosition, value);
                results[index] = result > 0 ? "T" : "F";
                rulePosition += Math.abs(result);
            }
            else rulePosition = position;
        }, this);
        let index = 1;
        while (index < results.length)
        {
            if (results[index] == "U") index += 2;
            else
            {
                if (results[index - 1] == "F") results[index] = "F";
                results.splice(index - 1, 1);
            }
        }
        while (results.length > 1)
        {
            if (results[0] == "T") results[2] = "T";
            results.splice(0, 2);
        }
        return results[0] == "T" ? rulePosition - position : position - rulePosition;
    }
}
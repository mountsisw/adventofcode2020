// @ts-check

import { doPart, PuzzlePart } from "../aocFW.js";

window.onload = function () { doPart(new PuzzleSolution()); };

class PuzzleSolution extends PuzzlePart
{
    private problems: Array<string>;
    private answer: number;

    // called after a file is selected, prior to processing
    public init(inputElement: HTMLDivElement, outputElement: HTMLDivElement, answerElement: HTMLDivElement)
    {
        super.init(inputElement, outputElement, answerElement);
        this.problems = new Array();
        this.answer = 0;
    }

    // called once per record (line) in the input file
    public processRecord(record: string) : Boolean
    {
        if (record.length > 0)
        {
            this.inputDisplay.innerText = record;
            let result = this.doMath(record);
            this.outputDisplay.innerText = String(result);
            this.answer += result;
        }
        return true;
    }

    // called after all records are read in
    public displayAnswer()
    {
        this.answerDisplay.innerText = "Sum of values is " + this.answer;
    }

    private doMath(problem: string) : number
    {
        let firstClosingParen: number;
        do {
            firstClosingParen = problem.indexOf(")");
            if (firstClosingParen > -1)
            {
                let lastOpeningParen = firstClosingParen - 1;
                while (problem.substr(lastOpeningParen, 1) != "(") lastOpeningParen--;
                let result = this.doMath(problem.slice(lastOpeningParen + 1, firstClosingParen));
                problem = problem.substr(0, lastOpeningParen) + String(result) + problem.substr(firstClosingParen + 1);
            }
            else
            {
                let fields = problem.split(" ");
                let result: number;
                while (fields.length > 1)
                {
                    let index = fields.indexOf("+");
                    if (index == -1) index = fields.indexOf("*");
                    let op1 = Number(fields[index - 1]);
                    let op2 = Number(fields[index + 1]);
                    result = fields[index] == "+" ? op1 + op2 : op1 * op2;
                    fields.splice(index - 1, 3, String(result));
                }
                return result;
            }
        } while (firstClosingParen > -1)
    }
}
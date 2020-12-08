// @ts-check

import { doPart, PuzzlePart } from "../aocFW.js";

window.onload = function () { doPart(new PuzzleSolution()); };

class PuzzleSolution extends PuzzlePart
{
    private instructions: Array<[string, number]>;

    // called after a file is selected, prior to processing
    public init(inputElement: HTMLDivElement, outputElement: HTMLDivElement, answerElement: HTMLDivElement)
    {
        super.init(inputElement, outputElement, answerElement);
        this.instructions = new Array();
    }

    // called once per record (line) in the input file
    public processRecord(record: string) : Boolean
    {
        if (record.length > 0)
        {
            this.instructions.push([record.substr(0, 3), Number(record.substr(4))]);
        }
        return true;
    }

    // called after all records are read in
    public displayAnswer()
    {
        let register: number = 0;
        let ip: number = 0;
        let executed: Array<number> = new Array();
        do {
            executed.push(ip);
            let instruction: string = this.instructions[ip][0];
            let parameter: number = this.instructions[ip][1];
            if (instruction == "nop") ip++;
            else if (instruction == "jmp") ip += parameter;
            else if (instruction == "acc") { register += parameter; ip++; }
            else console.log("Unexpected instruction " + instruction);
        } while (executed.includes(ip) == false);
        this.outputDisplay.innerText = "Accumulator at " + String(register);
    }
}


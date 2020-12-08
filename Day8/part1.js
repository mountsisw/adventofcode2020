// @ts-check
import { doPart, PuzzlePart } from "../aocFW.js";
window.onload = function () { doPart(new PuzzleSolution()); };
class PuzzleSolution extends PuzzlePart {
    // called after a file is selected, prior to processing
    init(inputElement, outputElement, answerElement) {
        super.init(inputElement, outputElement, answerElement);
        this.instructions = new Array();
    }
    // called once per record (line) in the input file
    processRecord(record) {
        if (record.length > 0) {
            this.instructions.push([record.substr(0, 3), Number(record.substr(4))]);
        }
        return true;
    }
    // called after all records are read in
    displayAnswer() {
        let register = 0;
        let ip = 0;
        let executed = new Array();
        do {
            executed.push(ip);
            let instruction = this.instructions[ip][0];
            let parameter = this.instructions[ip][1];
            if (instruction == "nop")
                ip++;
            else if (instruction == "jmp")
                ip += parameter;
            else if (instruction == "acc") {
                register += parameter;
                ip++;
            }
            else
                console.log("Unexpected instruction " + instruction);
        } while (executed.includes(ip) == false);
        this.outputDisplay.innerText = "Accumulator at " + String(register);
    }
}

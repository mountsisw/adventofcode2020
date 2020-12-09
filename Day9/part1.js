// @ts-check
import { doPart, PuzzlePart } from "../aocFW.js";
window.onload = function () { doPart(new PuzzleSolution()); };
class PuzzleSolution extends PuzzlePart {
    // called after a file is selected, prior to processing
    init(inputElement, outputElement, answerElement) {
        super.init(inputElement, outputElement, answerElement);
        this.data = new Array();
        this.preambleLength = 25;
    }
    // called once per record (line) in the input file
    processRecord(record) {
        if (record.length > 0) {
            let newNumber = Number(record);
            this.data.push(newNumber);
            let newLength = this.data.length;
            if (newLength > this.preambleLength) {
                for (let loop1 = newLength - this.preambleLength - 1; loop1 < newLength - 1; loop1++)
                    for (let loop2 = loop1 + 1; loop2 < newLength; loop2++)
                        if (this.data[loop1] + this.data[loop2] == newNumber)
                            return true;
                return false;
            }
        }
        return true;
    }
    // called after all records are read in
    displayAnswer() {
        this.outputDisplay.innerText = "First offending number is " + this.data[this.data.length - 1];
    }
}

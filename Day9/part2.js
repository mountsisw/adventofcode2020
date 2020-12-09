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
        let dataLength = this.data.length;
        let badValue = this.data[dataLength - 1];
        let minValue;
        let maxValue;
        for (let loop1 = 0; loop1 < dataLength - 2; loop1++) {
            let index = loop1;
            let sum = this.data[index];
            minValue = sum;
            maxValue = sum;
            do {
                let nextNum = this.data[++index];
                if (nextNum + sum <= badValue) {
                    minValue = Math.min(minValue, nextNum);
                    maxValue = Math.max(maxValue, nextNum);
                }
                sum += nextNum;
            } while (sum < badValue && index < dataLength - 1);
            if (sum == badValue)
                break;
        }
        this.outputDisplay.innerText = "Encryption weakness is " + String(minValue + maxValue);
    }
}

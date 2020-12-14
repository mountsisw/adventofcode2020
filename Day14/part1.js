// @ts-check
import { doPart, PuzzlePart } from "../aocFW.js";
window.onload = function () { doPart(new PuzzleSolution()); };
class PuzzleSolution extends PuzzlePart {
    // called after a file is selected, prior to processing
    init(inputElement, outputElement, answerElement) {
        super.init(inputElement, outputElement, answerElement);
        this.andMask = this.orMask = this.lower8andMask = this.lower8orMask = 0;
        this.values = new Map();
    }
    // called once per record (line) in the input file
    processRecord(record) {
        if (record.length > 0) {
            this.inputDisplay.innerText = record;
            let fields = record.split(" ");
            if (fields[0] == "mask") {
                this.andMask = this.orMask = this.lower8andMask = this.lower8orMask = 0;
                for (let nLoop = 0; nLoop < 8; nLoop++) {
                    let maskChar = fields[2].substr(fields[2].length - (nLoop + 1), 1);
                    if (maskChar != "0")
                        this.lower8andMask += Math.pow(2, nLoop);
                    if (maskChar == "1")
                        this.lower8orMask += Math.pow(2, nLoop);
                }
                for (let nLoop = 8; nLoop < fields[2].length; nLoop++) {
                    let maskChar = fields[2].substr(fields[2].length - (nLoop + 1), 1);
                    if (maskChar != "0")
                        this.andMask += Math.pow(2, nLoop - 8);
                    if (maskChar == "1")
                        this.orMask += Math.pow(2, nLoop - 8);
                }
                this.outputDisplay.innerText = String(this.andMask) + " and " + String(this.orMask);
                console.log(this.andMask + ", " + this.orMask + ", " + this.lower8andMask + ", " + this.lower8orMask);
            }
            else {
                let index = Number(fields[0].substr(4, fields[0].length - 5));
                let value = Number(fields[2]);
                let lowerValue = value % 256;
                lowerValue &= this.lower8andMask;
                lowerValue |= this.lower8orMask;
                let upperValue = Math.floor(value / 256);
                upperValue &= this.andMask;
                upperValue |= this.orMask;
                value = upperValue * 256 + lowerValue;
                this.values.set(index, value);
                this.outputDisplay.innerText = String(value);
                console.log("[" + index + "] " + fields[2] + " => " + value);
            }
        }
        return true;
    }
    // called after all records are read in
    displayAnswer() {
        let sum = 0;
        this.values.forEach((value) => { sum += value; });
        this.answerDisplay.innerText = "Sum of values is " + String(sum);
    }
}

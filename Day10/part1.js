// @ts-check
import { doPart, PuzzlePart } from "../aocFW.js";
window.onload = function () { doPart(new PuzzleSolution()); };
class PuzzleSolution extends PuzzlePart {
    // called after a file is selected, prior to processing
    init(inputElement, outputElement, answerElement) {
        super.init(inputElement, outputElement, answerElement);
        this.data = new Array();
        this.oneJolts = 0;
        this.threeJolts = 1;
    }
    // called once per record (line) in the input file
    processRecord(record) {
        if (record.length > 0) {
            this.data.push(Number(record));
        }
        return true;
    }
    // called after all records are read in
    displayAnswer() {
        this.data.sort((a, b) => { return a - b; });
        let jolts = 0;
        for (let nLoop = 0; nLoop < this.data.length; nLoop++) {
            this.oneJolts += this.data[nLoop] == jolts + 1 ? 1 : 0;
            this.threeJolts += this.data[nLoop] == jolts + 3 ? 1 : 0;
            jolts = this.data[nLoop];
        }
        this.outputDisplay.innerText = "Joltage reading is " + String(this.oneJolts * this.threeJolts);
    }
}

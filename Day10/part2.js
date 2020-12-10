// @ts-check
import { doPart, PuzzlePart } from "../aocFW.js";
window.onload = function () { doPart(new PuzzleSolution()); };
class PuzzleSolution extends PuzzlePart {
    // called after a file is selected, prior to processing
    init(inputElement, outputElement, answerElement) {
        super.init(inputElement, outputElement, answerElement);
        this.data = new Array();
        this.combos = new Map();
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
        // this.data.push(this.data[this.data.length - 1] + 3);
        this.outputDisplay.innerText = "Adapter combinations is " + String(this.calcCombos(0));
    }
    calcCombos(jolts) {
        if (this.combos.has(jolts))
            return this.combos.get(jolts);
        let total = this.data.includes(jolts + 1) ? this.calcCombos(jolts + 1) : 0;
        total += this.data.includes(jolts + 2) ? this.calcCombos(jolts + 2) : 0;
        total += this.data.includes(jolts + 3) ? this.calcCombos(jolts + 3) : 0;
        if (total == 0)
            total = 1;
        this.combos.set(jolts, total);
        return total;
    }
}

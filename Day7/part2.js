// @ts-check
import { doPart, PuzzlePart } from "../aocFW.js";
window.onload = function () { doPart(new PuzzleSolution()); };
class PuzzleSolution extends PuzzlePart {
    // called after a file is selected prior to processing
    init(inputElement, outputElement, answerElement) {
        super.init(inputElement, outputElement, answerElement);
        this.bagRules = new Map();
    }
    // called once per record (line) in the input file
    processRecord(record) {
        if (record.length > 0) {
            let parsedRecord = record.split(" ");
            let index = 4;
            let contents = new Map();
            while (index < parsedRecord.length) {
                if (Number.isNaN(Number(parsedRecord[index])) == false)
                    contents.set(parsedRecord[index + 1] + parsedRecord[index + 2], Number(parsedRecord[index]));
                index += 4;
            }
            this.bagRules.set(parsedRecord[0] + parsedRecord[1], contents);
        }
        return true;
    }
    // called after all records are read in
    displayAnswer() {
        let finalCount = this.getBags("shinygold");
        this.answerDisplay.innerText = `Shiny gold bags contain ${finalCount} other bags`;
    }
    getBags(bagKey) {
        let bagCount = 0;
        this.bagRules.get(bagKey).forEach(function (value, key) {
            bagCount += value * (this.getBags(key) + 1);
        }, this);
        return bagCount;
    }
}

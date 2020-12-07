// @ts-check
import { doPart, PuzzlePart } from "../aocFW.js";
window.onload = function () { doPart(new PuzzleSolution()); };
class PuzzleSolution extends PuzzlePart {
    // called after a file is selected, prior to processing
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
        let containingBags = new Map();
        let searchTerms = new Map();
        searchTerms.set("shinygold", null);
        do {
            let nextSearchTerms = new Map();
            this.bagRules.forEach(function (contents, bagName) {
                searchTerms.forEach(function (value, key) {
                    if (contents.has(key)) {
                        containingBags.set(bagName, null);
                        nextSearchTerms.set(bagName, null);
                    }
                });
            });
            searchTerms = nextSearchTerms;
        } while (searchTerms.size > 0);
        this.answerDisplay.innerText = `Total of ${containingBags.size} can have shiny gold bags`;
    }
}

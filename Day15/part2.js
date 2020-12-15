// @ts-check
import { doPart, PuzzlePart } from "../aocFW.js";
window.onload = function () { doPart(new PuzzleSolution()); };
class PuzzleSolution extends PuzzlePart {
    // called after a file is selected, prior to processing
    init(inputElement, outputElement, answerElement) {
        super.init(inputElement, outputElement, answerElement);
        this.answers = new Array();
    }
    // called once per record (line) in the input file
    processRecord(record) {
        if (record.length > 0) {
            this.inputDisplay.innerText = record;
            let fields = record.split(",");
            let numbersSaid = new Map();
            let priorNumber;
            for (let turn = 0; turn < 30000000; turn++) {
                let nextNumber;
                if (turn < fields.length) {
                    nextNumber = Number(fields[turn]);
                    numbersSaid.set(nextNumber, [turn, -1]);
                }
                else {
                    nextNumber = numbersSaid.get(priorNumber)[1] > -1 ? numbersSaid.get(priorNumber)[0] - numbersSaid.get(priorNumber)[1] : 0;
                    if (numbersSaid.has(nextNumber))
                        numbersSaid.set(nextNumber, [turn, numbersSaid.get(nextNumber)[0]]);
                    else
                        numbersSaid.set(nextNumber, [turn, -1]);
                }
                priorNumber = nextNumber;
            }
            this.outputDisplay.innerText = String(priorNumber);
            this.answers.push(record + " => " + String(priorNumber));
        }
        return true;
    }
    // called after all records are read in
    displayAnswer() {
        this.answers.forEach((value) => { this.answerDisplay.innerHTML += value + "<br/>"; });
    }
}

// @ts-check
import { doPart, PuzzlePart } from "../aocFW.js";
window.onload = function () { doPart(new PuzzleSolution()); };
class PuzzleSolution extends PuzzlePart {
    // called after a file is selected, prior to processing
    init(inputElement, outputElement, answerElement) {
        super.init(inputElement, outputElement, answerElement);
        this.problems = new Array();
        this.answer = 0;
    }
    // called once per record (line) in the input file
    processRecord(record) {
        if (record.length > 0) {
            this.inputDisplay.innerText = record;
            let result = this.doMath(record);
            this.outputDisplay.innerText = String(result);
            this.answer += result;
        }
        return true;
    }
    // called after all records are read in
    displayAnswer() {
        this.answerDisplay.innerText = "Sum of values is " + this.answer;
    }
    doMath(problem) {
        let firstClosingParen;
        do {
            firstClosingParen = problem.indexOf(")");
            if (firstClosingParen > -1) {
                let lastOpeningParen = firstClosingParen - 1;
                while (problem.substr(lastOpeningParen, 1) != "(")
                    lastOpeningParen--;
                let result = this.doMath(problem.slice(lastOpeningParen + 1, firstClosingParen));
                problem = problem.substr(0, lastOpeningParen) + String(result) + problem.substr(firstClosingParen + 1);
            }
            else {
                let fields = problem.split(" ");
                let index = 0;
                let result;
                while (index < fields.length - 1) {
                    let op1 = Number(fields[index]);
                    let op2 = Number(fields[index + 2]);
                    result = fields[index + 1] == "+" ? op1 + op2 : op1 * op2;
                    fields[index + 2] = String(result);
                    index += 2;
                }
                return result;
            }
        } while (firstClosingParen > -1);
    }
}

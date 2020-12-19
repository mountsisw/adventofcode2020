// @ts-check
import { doPart, PuzzlePart } from "../aocFW.js";
window.onload = function () { doPart(new PuzzleSolution()); };
class PuzzleSolution extends PuzzlePart {
    // called after a file is selected, prior to processing
    init(inputElement, outputElement, answerElement) {
        super.init(inputElement, outputElement, answerElement);
        this.rules = new Map();
        this.answer = 0;
        this.mode = 0;
    }
    // called once per record (line) in the input file
    processRecord(record) {
        if (record.length > 0) {
            this.inputDisplay.innerText = record;
            if (this.mode == 0) {
                let fields = record.split(": ");
                this.rules.set(fields[0], fields[1].split(" "));
                this.outputDisplay.innerText = "Stored";
            }
            else {
                let matches42 = 0;
                let matches31 = 0;
                let position = 0;
                let result42 = this.validMessage(record, position, "42");
                if (result42 > 0) {
                    do {
                        matches42++;
                        position += result42;
                    } while (this.validMessage(record, position, "42") == result42);
                }
                if (matches42 >= 2) {
                    let result31 = this.validMessage(record, position, "31");
                    if (result31 > 0) {
                        do {
                            matches31++;
                            position += result31;
                        } while (this.validMessage(record, position, "31") == result31);
                    }
                }
                console.log(record + " => " + position + " | " + record.length);
                if ((position == record.length) && (matches42 >= 2) && (matches31 >= 1) && (matches31 < matches42)) {
                    this.answer++;
                    this.outputDisplay.innerText = "Valid";
                    console.log(record + " is valid");
                }
                else {
                    this.outputDisplay.innerText = "Invalid";
                    console.log(record + " is invalid");
                }
            }
        }
        else {
            this.rules.set("8", "42 | 42 8".split(" "));
            this.rules.set("11", "42 31 | 42 11 31".split(" "));
            this.mode++;
        }
        return true;
    }
    // called after all records are read in
    displayAnswer() {
        this.answerDisplay.innerText = this.answer + " valid messages";
    }
    validMessage(message, position, rule) {
        // console.log(position + ": " + rule);
        if (position >= message.length)
            return 0;
        let parameters = this.rules.get(rule);
        if (parameters.length == 1 && parameters[0].substr(0, 1) == '"')
            return message.substr(position, 1) == parameters[0].substr(1, 1) ? 1 : -1;
        let results = new Array(parameters.length);
        results.fill("U");
        let rulePosition = position;
        parameters.forEach((value, index) => {
            if (value != "|") {
                let result = this.validMessage(message, rulePosition, value);
                results[index] = result > 0 ? "T" : "F";
                rulePosition += Math.abs(result);
            }
            else
                rulePosition = position;
        }, this);
        let index = 1;
        while (index < results.length) {
            if (results[index] == "U")
                index += 2;
            else {
                if (results[index - 1] == "F")
                    results[index] = "F";
                results.splice(index - 1, 1);
            }
        }
        while (results.length > 1) {
            if (results[0] == "T")
                results[2] = "T";
            results.splice(0, 2);
        }
        return results[0] == "T" ? rulePosition - position : position - rulePosition;
    }
}

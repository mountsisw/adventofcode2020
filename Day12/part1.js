// @ts-check
import { doPart, PuzzlePart } from "../aocFW.js";
window.onload = function () { doPart(new PuzzleSolution()); };
class PuzzleSolution extends PuzzlePart {
    // called after a file is selected, prior to processing
    init(inputElement, outputElement, answerElement) {
        super.init(inputElement, outputElement, answerElement);
        this.x = this.y = 0;
        this.xChange = 1;
        this.yChange = 0;
    }
    // called once per record (line) in the input file
    processRecord(record) {
        if (record.length > 0) {
            let instruction = record.substr(0, 1);
            let magnitude = Number(record.substr(1));
            if (instruction == "N")
                this.y += magnitude;
            if (instruction == "S")
                this.y -= magnitude;
            if (instruction == "E")
                this.x += magnitude;
            if (instruction == "W")
                this.x -= magnitude;
            if (instruction == "F") {
                this.x += magnitude * this.xChange;
                this.y += magnitude * this.yChange;
            }
            if (record == "L90" || record == "R270") {
                if (Math.abs(this.xChange) == 1) {
                    this.yChange = this.xChange;
                    this.xChange = 0;
                }
                else {
                    this.xChange = this.yChange * -1;
                    this.yChange = 0;
                }
            }
            else if (record == "R90" || record == "L270") {
                if (Math.abs(this.xChange) == 1) {
                    this.yChange = this.xChange * -1;
                    this.xChange = 0;
                }
                else {
                    this.xChange = this.yChange;
                    this.yChange = 0;
                }
            }
            else if (record == "L180" || record == "R180") {
                this.xChange = this.xChange * -1;
                this.yChange = this.yChange * -1;
            }
            else if (instruction == "L" || instruction == "R")
                console.error("Unexpected turn " + record);
            this.inputDisplay.innerText = record;
            this.outputDisplay.innerText = "(" + this.x + "," + this.y + "), (" + this.xChange + "," + this.yChange + ")";
            console.log(record + ": (" + this.x + "," + this.y + "), (" + this.xChange + "," + this.yChange + ")");
        }
        return true;
    }
    // called after all records are read in
    displayAnswer() {
        this.answerDisplay.innerText = "Manhattan distance is " + String(Math.abs(this.x) + Math.abs(this.y));
    }
}

// @ts-check
import { doPart, PuzzlePart } from "../aocFW.js";
window.onload = function () { doPart(new PuzzleSolution()); };
class PuzzleSolution extends PuzzlePart {
    // called after a file is selected, prior to processing
    init(inputElement, outputElement, answerElement) {
        super.init(inputElement, outputElement, answerElement);
        this.x = this.y = 0;
        this.xDistance = 10;
        this.yDistance = 1;
    }
    // called once per record (line) in the input file
    processRecord(record) {
        if (record.length > 0) {
            let instruction = record.substr(0, 1);
            let magnitude = Number(record.substr(1));
            if (instruction == "N")
                this.yDistance += magnitude;
            if (instruction == "S")
                this.yDistance -= magnitude;
            if (instruction == "E")
                this.xDistance += magnitude;
            if (instruction == "W")
                this.xDistance -= magnitude;
            if (instruction == "F") {
                this.x += magnitude * this.xDistance;
                this.y += magnitude * this.yDistance;
            }
            if (record == "L180" || record == "R180") {
                this.xDistance = this.xDistance * -1;
                this.yDistance = this.yDistance * -1;
            }
            else if (instruction == "L" || instruction == "R")
                if (magnitude == 90 || magnitude == 270) {
                    let temp = this.yDistance;
                    this.yDistance = this.xDistance;
                    this.xDistance = temp;
                    if (record == "L90" || record == "R270")
                        this.xDistance *= -1;
                    else
                        this.yDistance *= -1;
                }
                else
                    console.error("Unexpected turn " + record);
            this.inputDisplay.innerText = record;
            this.outputDisplay.innerText = "(" + this.x + "," + this.y + "), (" + this.xDistance + "," + this.yDistance + ")";
            console.log(record + ": (" + this.x + "," + this.y + "), (" + this.xDistance + "," + this.yDistance + ")");
        }
        return true;
    }
    // called after all records are read in
    displayAnswer() {
        this.answerDisplay.innerText = "Manhattan distance is " + String(Math.abs(this.x) + Math.abs(this.y));
    }
}

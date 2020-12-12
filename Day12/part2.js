// @ts-check
import { doPart, PuzzlePart } from "../aocFW.js";
window.onload = function () { doPart(new PuzzleSolution()); };
class PuzzleSolution extends PuzzlePart {
    // called after a file is selected, prior to processing
    init(inputElement, outputElement, answerElement) {
        super.init(inputElement, outputElement, answerElement);
        this.x = this.y = 0;
        this.direction = "NE";
        this.xWaypoint = 10;
        this.yWaypoint = 1;
    }
    // called once per record (line) in the input file
    processRecord(record) {
        if (record.length > 0) {
            let instruction = record.substr(0, 1);
            let magnitude = Number(record.substr(1));
            if (instruction == "N") {
                this.yWaypoint += magnitude;
                if (this.yWaypoint > 0)
                    this.direction = "N" + this.direction.substr(1);
            }
            if (instruction == "S") {
                this.yWaypoint -= magnitude;
                if (this.yWaypoint < 0)
                    this.direction = "S" + this.direction.substr(1);
            }
            if (instruction == "E") {
                this.xWaypoint += magnitude;
                if (this.xWaypoint > 0)
                    this.direction = this.direction.substr(0, 1) + "E";
            }
            if (instruction == "W") {
                this.xWaypoint -= magnitude;
                if (this.xWaypoint < 0)
                    this.direction = this.direction.substr(0, 1) + "W";
            }
            if (instruction == "L") {
                if (magnitude == 90) {
                    if (this.direction == "NE")
                        this.direction = "NW";
                    else if (this.direction == "NW")
                        this.direction = "SW";
                    else if (this.direction == "SW")
                        this.direction = "SE";
                    else if (this.direction == "SE")
                        this.direction = "NE";
                }
                else if (magnitude == 180) {
                    if (this.direction == "NE")
                        this.direction = "SW";
                    else if (this.direction == "NW")
                        this.direction = "SE";
                    else if (this.direction == "SW")
                        this.direction = "NE";
                    else if (this.direction == "SE")
                        this.direction = "NW";
                }
                else if (magnitude == 270) {
                    if (this.direction == "NE")
                        this.direction = "SE";
                    else if (this.direction == "NW")
                        this.direction = "NE";
                    else if (this.direction == "SW")
                        this.direction = "NW";
                    else if (this.direction == "SE")
                        this.direction = "SW";
                }
                else
                    console.error("Unexpected turn " + record);
            }
            if (instruction == "R") {
                if (magnitude == 90) {
                    if (this.direction == "NE")
                        this.direction = "SE";
                    else if (this.direction == "NW")
                        this.direction = "NE";
                    else if (this.direction == "SW")
                        this.direction = "NW";
                    else if (this.direction == "SE")
                        this.direction = "SW";
                }
                else if (magnitude == 180) {
                    if (this.direction == "NE")
                        this.direction = "SW";
                    else if (this.direction == "NW")
                        this.direction = "SE";
                    else if (this.direction == "SW")
                        this.direction = "NE";
                    else if (this.direction == "SE")
                        this.direction = "NW";
                }
                else if (magnitude == 270) {
                    if (this.direction == "NE")
                        this.direction = "NW";
                    else if (this.direction == "NW")
                        this.direction = "SW";
                    else if (this.direction == "SW")
                        this.direction = "SE";
                    else if (this.direction == "SE")
                        this.direction = "NE";
                }
                else
                    console.error("Unexpected turn " + record);
            }
            if (instruction == "L" || instruction == "R") {
                if (magnitude == 180) {
                    this.xWaypoint *= -1;
                    this.yWaypoint *= -1;
                }
                else {
                    let temp = this.xWaypoint;
                    this.xWaypoint = Math.abs(this.yWaypoint);
                    this.yWaypoint = Math.abs(temp);
                    if (this.direction == "NW" || this.direction == "SW")
                        this.xWaypoint *= -1;
                    if (this.direction == "SE" || this.direction == "SW")
                        this.yWaypoint *= -1;
                }
            }
            if (instruction == "F") {
                this.x += magnitude * this.xWaypoint;
                this.y += magnitude * this.yWaypoint;
            }
            console.log(record + ", (" + this.x + "," + this.y + "), (" + this.xWaypoint + "," + this.yWaypoint + "), " + this.direction);
        }
        return true;
    }
    // called after all records are read in
    displayAnswer() {
        this.answerDisplay.innerText = "Manhattan distance is " + String(Math.abs(this.x) + Math.abs(this.y));
    }
}

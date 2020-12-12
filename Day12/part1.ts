// @ts-check

import { doPart, PuzzlePart } from "../aocFW.js";

window.onload = function () { doPart(new PuzzleSolution()); };

class PuzzleSolution extends PuzzlePart
{
    private x: number;
    private y: number;
    private xChange: number;
    private yChange: number;
    private direction: string;

    // called after a file is selected, prior to processing
    public init(inputElement: HTMLDivElement, outputElement: HTMLDivElement, answerElement: HTMLDivElement)
    {
        super.init(inputElement, outputElement, answerElement);
        this.x = this.y = 0;
        this.direction = "E";
        this.xChange = 1;
        this.yChange = 0;
    }

    // called once per record (line) in the input file
    public processRecord(record: string) : Boolean
    {
        if (record.length > 0)
        {
            let instruction: string = record.substr(0, 1);
            let magnitude: number = Number(record.substr(1));
            if (instruction == "N") this.y += magnitude;
            if (instruction == "S") this.y -= magnitude;
            if (instruction == "E") this.x += magnitude;
            if (instruction == "W") this.x -= magnitude;
            if (instruction == "L")
            {
                if (magnitude == 90)
                {
                    if (this.direction == "E") this.direction = "N";
                    else if (this.direction == "N") this.direction = "W";
                    else if (this.direction == "W") this.direction = "S";
                    else if (this.direction == "S") this.direction = "E";
                }
                else if (magnitude == 180)
                {
                    if (this.direction == "E") this.direction = "W";
                    else if (this.direction == "N") this.direction = "S";
                    else if (this.direction == "W") this.direction = "E";
                    else if (this.direction == "S") this.direction = "N";
                }
                else if (magnitude == 270)
                {
                    if (this.direction == "E") this.direction = "S";
                    else if (this.direction == "N") this.direction = "E";
                    else if (this.direction == "W") this.direction = "N";
                    else if (this.direction == "S") this.direction = "W";
                }
                else console.error("Unexpected turn " + record);
            }
            if (instruction == "R")
            {
                if (magnitude == 90)
                {
                    if (this.direction == "E") this.direction = "S";
                    else if (this.direction == "N") this.direction = "E";
                    else if (this.direction == "W") this.direction = "N";
                    else if (this.direction == "S") this.direction = "W";
                }
                else if (magnitude == 180)
                {
                    if (this.direction == "E") this.direction = "W";
                    else if (this.direction == "N") this.direction = "S";
                    else if (this.direction == "W") this.direction = "E";
                    else if (this.direction == "S") this.direction = "N";
                }
                else if (magnitude == 270)
                {
                    if (this.direction == "E") this.direction = "N";
                    else if (this.direction == "N") this.direction = "W";
                    else if (this.direction == "W") this.direction = "S";
                    else if (this.direction == "S") this.direction = "E";
                }
                else console.error("Unexpected turn " + record);
            }
            if (instruction == "L" || instruction == "R")
            {
                if (this.direction == "E") { this.xChange = 1; this.yChange = 0; }
                if (this.direction == "N") { this.xChange = 0; this.yChange = 1; }
                if (this.direction == "W") { this.xChange = -1; this.yChange = 0; }
                if (this.direction == "S") { this.xChange = 0; this.yChange = -1; }
            }
            if (instruction == "F")
            {
                this.x += magnitude * this.xChange;
                this.y += magnitude * this.yChange;
            }
            console.log(this.x + ", " + this.y + ", " + this.direction);
        }
        return true;
    }

    // called after all records are read in
    public displayAnswer()
    {
        this.answerDisplay.innerText = "Manhattan distance is " + String(Math.abs(this.x) + Math.abs(this.y));
    }
}


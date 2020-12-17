// @ts-check

import { doPart, PuzzlePart } from "../aocFW.js";

window.onload = function () { doPart(new PuzzleSolution()); };

class PuzzleSolution extends PuzzlePart
{
    private activeCubes: Array<string>;
    private recordCount: number;

    // called after a file is selected, prior to processing
    public init(inputElement: HTMLDivElement, outputElement: HTMLDivElement, answerElement: HTMLDivElement)
    {
        super.init(inputElement, outputElement, answerElement);
        this.activeCubes = new Array();
        this.recordCount = 0;
    }

    // called once per record (line) in the input file
    public processRecord(record: string) : Boolean
    {
        if (record.length > 0)
        {
            for (let nLoop: number = 0; nLoop < record.length; nLoop++)
            {
                if (record.substr(nLoop, 1) == "#")
                    this.activeCubes.push(new Cube(nLoop, this.recordCount, 0, 0).toString());
            }
            this.recordCount++;
        }
        return true;
    }

    // called after all records are read in
    public displayAnswer()
    {
        let nextActiveCubes: Array<string>;
        let nextInactiveCubes: Array<string>;
        for (let nLoop = 0; nLoop < 6; nLoop++)
        {
            nextActiveCubes = new Array();
            nextInactiveCubes = new Array();
            this.activeCubes.forEach((cube) => 
            {
                let coordinates: Array<string> = cube.split("|");
                let x: number = Number(coordinates[0]);
                let y: number = Number(coordinates[1]);
                let z: number = Number(coordinates[2]);
                let w: number = Number(coordinates[3]);
                for (let xLoop = x - 1; xLoop <= x + 1; xLoop++)
                    for (let yLoop = y - 1; yLoop <= y + 1; yLoop++)
                        for (let zLoop = z - 1; zLoop <= z + 1; zLoop++)
                            for (let wLoop = w - 1; wLoop <= w + 1; wLoop++)
                            {
                                let newCube = new Cube(xLoop, yLoop, zLoop, wLoop);
                                let newKey = newCube.toString();
                                if (nextActiveCubes.includes(newKey) == false && nextInactiveCubes.includes(newKey) == false)
                                    if (newCube.activeNext(this.activeCubes)) nextActiveCubes.push(newKey);
                                    else nextInactiveCubes.push(newKey);
                            }
            });
            this.activeCubes = nextActiveCubes;
        }
        this.answerDisplay.innerText = "After six cycles, there are " + this.activeCubes.length + " active cubes";
    }
}

class Cube
{
    constructor(public x: number, public y: number, public z: number, public w: number, public active: boolean = true) { }
    public toString() { return String(this.x) + "|" + String(this.y) + "|" + String(this.z) + "|" + String(this.w); }
    public activeNext(matrix: Array<string>) : boolean
    {
        let activeNeighbors: number = 0;
        let active: boolean = matrix.includes(this.toString());
        for (let xLoop = this.x - 1; xLoop <= this.x + 1; xLoop++)
            for (let yLoop = this.y - 1; yLoop <= this.y + 1; yLoop++)
                for (let zLoop = this.z - 1; zLoop <= this.z + 1; zLoop++)
                    for (let wLoop = this.w - 1; wLoop <= this.w + 1; wLoop++)
                    {
                        let newCube = new Cube(xLoop, yLoop, zLoop, wLoop);
                        let newKey = newCube.toString();
                        if (matrix.includes(newKey)) activeNeighbors++;
                        if (active && activeNeighbors == 5) return false;
                        if (active == false && activeNeighbors == 4) return false;
                    }
        return activeNeighbors > 2;
    }
}
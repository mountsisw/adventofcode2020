// @ts-check
import { doPart, PuzzlePart } from "../aocFW.js";
window.onload = function () { doPart(new PuzzleSolution()); };
class PuzzleSolution extends PuzzlePart {
    // called after a file is selected, prior to processing
    init(inputElement, outputElement, answerElement) {
        super.init(inputElement, outputElement, answerElement);
        this.activeCubes = new Array();
        this.recordCount = 0;
    }
    // called once per record (line) in the input file
    processRecord(record) {
        if (record.length > 0) {
            for (let nLoop = 0; nLoop < record.length; nLoop++) {
                if (record.substr(nLoop, 1) == "#")
                    this.activeCubes.push(new Cube(nLoop, this.recordCount, 0, 0).toString());
            }
            this.recordCount++;
        }
        return true;
    }
    // called after all records are read in
    displayAnswer() {
        let nextActiveCubes;
        let nextInactiveCubes;
        for (let nLoop = 0; nLoop < 6; nLoop++) {
            nextActiveCubes = new Array();
            nextInactiveCubes = new Array();
            this.activeCubes.forEach((cube) => {
                let coordinates = cube.split("|");
                let x = Number(coordinates[0]);
                let y = Number(coordinates[1]);
                let z = Number(coordinates[2]);
                let w = Number(coordinates[3]);
                for (let xLoop = x - 1; xLoop <= x + 1; xLoop++)
                    for (let yLoop = y - 1; yLoop <= y + 1; yLoop++)
                        for (let zLoop = z - 1; zLoop <= z + 1; zLoop++)
                            for (let wLoop = w - 1; wLoop <= w + 1; wLoop++) {
                                let newCube = new Cube(xLoop, yLoop, zLoop, wLoop);
                                let newKey = newCube.toString();
                                if (nextActiveCubes.includes(newKey) == false && nextInactiveCubes.includes(newKey) == false)
                                    if (newCube.activeNext(this.activeCubes))
                                        nextActiveCubes.push(newKey);
                                    else
                                        nextInactiveCubes.push(newKey);
                            }
            });
            this.activeCubes = nextActiveCubes;
        }
        this.answerDisplay.innerText = "After six cycles, there are " + this.activeCubes.length + " active cubes";
    }
}
class Cube {
    constructor(x, y, z, w, active = true) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.active = active;
    }
    toString() { return String(this.x) + "|" + String(this.y) + "|" + String(this.z) + "|" + String(this.w); }
    activeNext(matrix) {
        let activeNeighbors = 0;
        let active = matrix.includes(this.toString());
        for (let xLoop = this.x - 1; xLoop <= this.x + 1; xLoop++)
            for (let yLoop = this.y - 1; yLoop <= this.y + 1; yLoop++)
                for (let zLoop = this.z - 1; zLoop <= this.z + 1; zLoop++)
                    for (let wLoop = this.w - 1; wLoop <= this.w + 1; wLoop++) {
                        let newCube = new Cube(xLoop, yLoop, zLoop, wLoop);
                        let newKey = newCube.toString();
                        if (matrix.includes(newKey))
                            activeNeighbors++;
                        if (active && activeNeighbors == 5)
                            return false;
                        if (active == false && activeNeighbors == 4)
                            return false;
                    }
        return activeNeighbors > 2;
    }
}

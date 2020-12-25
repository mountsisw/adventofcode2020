// @ts-check
import { doPart, PuzzlePart } from "../aocFW.js";
window.onload = function () { doPart(new PuzzleSolution()); };
class PuzzleSolution extends PuzzlePart {
    // called after a file is selected, prior to processing
    init(inputElement, outputElement, answerElement) {
        super.init(inputElement, outputElement, answerElement);
        this.blackTiles = new Map();
    }
    // called once per record (line) in the input file
    processRecord(record) {
        if (record.length > 0) {
            this.inputDisplay.innerText = record;
            let index = 0;
            this.x = this.y = 0;
            do {
                if (record[index] == "w")
                    this.x -= 2;
                else if (record[index] == "e")
                    this.x += 2;
                else {
                    this.y += record[index] == "n" ? 1 : -1;
                    this.x += record[++index] == "e" ? 1 : -1;
                }
            } while (++index < record.length);
            let tiles;
            if (this.blackTiles.has(this.x)) {
                tiles = this.blackTiles.get(this.x);
                index = tiles.indexOf(this.y);
                if (index > -1)
                    tiles.splice(index, 1);
                else
                    tiles.push(this.y);
            }
            else {
                tiles = new Array();
                tiles.push(this.y);
                index = -1;
            }
            this.blackTiles.set(this.x, tiles);
            this.outputDisplay.innerText = index > -1 ? "Back to white" : "Flipped to black";
        }
        return true;
    }
    // called after all records are read in
    displayAnswer() {
        let tileCount = 0;
        this.blackTiles.forEach(tiles => tileCount += tiles.length);
        for (let dayLoop = 1; dayLoop <= 100; dayLoop++) {
            // check the black tiles for changes
            let blackTilesToFlip = new Array();
            let xRange = new MinMax();
            let yRange = new MinMax();
            this.blackTiles.forEach((yValues, xValue) => {
                xRange.newValue(xValue);
                yValues.forEach(yValue => {
                    yRange.newValue(yValue);
                    let count = this.countAdjacentTiles(xValue, yValue);
                    if (count == 0 || count > 2)
                        blackTilesToFlip.push([xValue, yValue]);
                }, this);
            }, this);
            // check the white tiles for changes
            let whiteTilesToFlip = new Array();
            for (let xLoop = xRange.min - 2; xLoop <= xRange.max + 2; xLoop++)
                for (let yLoop = yRange.min - 1; yLoop <= yRange.max + 1; yLoop++) {
                    if (this.hasTile(xLoop, yLoop) == false) {
                        let count = this.countAdjacentTiles(xLoop, yLoop);
                        if (count == 2)
                            whiteTilesToFlip.push([xLoop, yLoop]);
                    }
                }
            // flip black tiles
            blackTilesToFlip.forEach(tile => {
                let yValues = this.blackTiles.get(tile[0]);
                if (yValues.length <= 1)
                    this.blackTiles.delete(tile[0]);
                else {
                    yValues.splice(yValues.indexOf(tile[1]), 1);
                    this.blackTiles.set(tile[0], yValues);
                }
            }, this);
            // flip white tiles
            whiteTilesToFlip.forEach(tile => {
                let yValues = this.blackTiles.has(tile[0]) ? this.blackTiles.get(tile[0]) : new Array();
                yValues.push(tile[1]);
                this.blackTiles.set(tile[0], yValues);
            }, this);
            // all done
            tileCount += whiteTilesToFlip.length - blackTilesToFlip.length;
            if (dayLoop < 10 || dayLoop % 10 == 0)
                console.log("Day " + dayLoop + ": " + tileCount);
            this.answerDisplay.innerText = "Day " + dayLoop + ": " + tileCount;
        }
    }
    countAdjacentTiles(x, y) {
        let tiles = this.hasTile(x + 1, y + 1) ? 1 : 0; // ne
        tiles += this.hasTile(x + 2, y) ? 1 : 0; // e
        tiles += this.hasTile(x + 1, y - 1) ? 1 : 0; // se
        tiles += this.hasTile(x - 1, y - 1) ? 1 : 0; // sw
        tiles += this.hasTile(x - 2, y) ? 1 : 0; // w
        return tiles + (this.hasTile(x - 1, y + 1) ? 1 : 0); // nw
    }
    hasTile(x, y) {
        return this.blackTiles.has(x) ? this.blackTiles.get(x).includes(y) : false;
    }
}
class MinMax {
    constructor() {
        this.min = Number.MAX_SAFE_INTEGER;
        this.max = Number.MIN_SAFE_INTEGER;
    }
    newValue(updatedValue) {
        let retVal = 0;
        if (updatedValue < this.min) {
            this.min = updatedValue;
            retVal = -1;
        }
        if (updatedValue > this.max) {
            this.max = updatedValue;
            retVal += 1;
        }
        this.value = updatedValue;
        return retVal;
    }
}

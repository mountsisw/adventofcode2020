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
        this.answerDisplay.innerText = tileCount + " tiles are left with the black side up";
    }
}

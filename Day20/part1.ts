// @ts-check

import { doPart, PuzzlePart } from "../aocFW.js";

window.onload = function () { doPart(new PuzzleSolution()); };

const maxBorderLength = 10;
const maxValue = Math.pow(2, maxBorderLength) - 1;

class MinMax
{
    public value: number;
    public min: number;
    public max: number;

    constructor()
    {
        this.min = Number.MAX_SAFE_INTEGER;
        this.max = Number.MIN_SAFE_INTEGER;
    }

    public newValue(updatedValue: number) : number
    {
        let retVal = 0;
        if (updatedValue < this.min) { this.min = updatedValue; retVal = -1; }
        if (updatedValue > this.max) { this.max = updatedValue; retVal += 1; }
        this.value = updatedValue;
        return retVal;
    }
}

class TilePresentation
{
    public mask: number;
    constructor(public tileID: number, public index: number, public rotation: number, public flip: number,
        public top: number, public left: number, public right: number, public bottom: number)
    { this.mask = this.top * (maxValue + 1) + this.left; }
}

class Tile
{
    public presentations: Array<TilePresentation>;
    public presentationUsed: number;

    constructor(public id: number)
    {
        this.presentations = new Array();
        this.presentationUsed = -1;
    }
    private flipMe(value: number) : number
    {
        let flipped = 0;
        for (let nLoop = 0; nLoop < maxBorderLength; nLoop++)
            if ((Math.pow(2, nLoop) & value) > 0) flipped += Math.pow(2, maxBorderLength - 1 - nLoop);
        return flipped;
    }
    public addPresentations(top: number, left: number, right: number, bottom: number)
    {
        let topFlip = this.flipMe(top);
        let leftFlip = this.flipMe(left);
        let rightFlip = this.flipMe(right);
        let bottomFlip = this.flipMe(bottom);
        this.doRotations(0, top, left, right, bottom, topFlip, leftFlip, rightFlip, bottomFlip);
        this.doRotations(1, bottom, leftFlip, rightFlip, top, bottomFlip, left, right, topFlip);
    }
    private doRotations(flip: number, top: number, left: number, right: number, bottom: number,
        topFlip: number, leftFlip: number, rightFlip: number, bottomFlip: number)
    {
        let index = this.presentations.length;
        this.presentations.push(new TilePresentation(this.id, index++, 0, flip, top, left, right, bottom));
        this.presentations.push(new TilePresentation(this.id, index++, 1, flip, leftFlip, bottom, top, rightFlip));
        this.presentations.push(new TilePresentation(this.id, index++, 2, flip, bottomFlip, rightFlip, leftFlip, topFlip));
        this.presentations.push(new TilePresentation(this.id, index++, 3, flip, right, topFlip, bottomFlip, left));
    }
}

class PuzzleSolution extends PuzzlePart
{
    private rows: number;
    private top: number;
    private left: number;
    private right: number;
    private nextTile: Tile;
    private tiles: Map<number, Tile>;

    // called after a file is selected, prior to processing
    public init(inputElement: HTMLDivElement, outputElement: HTMLDivElement, answerElement: HTMLDivElement)
    {
        super.init(inputElement, outputElement, answerElement);
        this.tiles = new Map();
    }

    // called once per record (line) in the input file
    public processRecord(record: string) : Boolean
    {
        if (record.length > 0)
        {
            if (record.substr(0, 4) == "Tile")
            {
                this.nextTile = new Tile(Number(record.substr(5, 4)));
                this.rows = this.top = this.left = this.right = 0;
            }
            else
            {
                if (this.rows == 0)
                {
                    for (let nLoop = 0; nLoop < record.length; nLoop++)
                        if (record.substr(nLoop, 1) == "#") this.top += Math.pow(2, nLoop);
                }
                if (this.rows < 10)
                {
                    if (record.substr(0, 1) == "#") this.left += Math.pow(2, this.rows);
                    if (record.substr(9, 1) == "#") this.right += Math.pow(2, this.rows);
                }
                if (this.rows == 9)
                {
                    let bottom = 0;
                    for (let nLoop = 0; nLoop < record.length; nLoop++)
                        if (record.substr(nLoop, 1) == "#") bottom += Math.pow(2, nLoop);
                    this.nextTile.addPresentations(this.top, this.left, this.right, bottom);
                    this.tiles.set(this.nextTile.id, this.nextTile);
                }
                this.rows++;
            }
        }
        return true;
    }

    private arrangement: Array<TilePresentation>;
    private maxTilesPerDirection: number;
    private tops: Map<number, Array<TilePresentation>> = new Map();
    private rights: Map<number, Array<TilePresentation>> = new Map();
    private bottoms: Map<number, Array<TilePresentation>> = new Map();
    private lefts: Map<number, Array<TilePresentation>> = new Map();
    private masks: Map<number, Array<TilePresentation>> = new Map();

    // called after all records are read in
    public displayAnswer()
    {
        let startTime = Date.now();
        this.tiles.forEach((tile) =>
        {
            tile.presentations.forEach((presentation) =>
            {
                console.log(presentation.tileID + "," + presentation.index + "," + presentation.flip + "," + presentation.rotation + "," +
                    presentation.top + "," + presentation.right + "," + presentation.bottom + "," + presentation.left + "," + presentation.mask);

                let presentations: Array<TilePresentation> = this.rights.has(presentation.right) ? this.rights.get(presentation.right) : new Array();
                presentations.push(presentation);
                this.rights.set(presentation.right, presentations);

                presentations = this.bottoms.has(presentation.bottom) ? this.bottoms.get(presentation.bottom) : new Array();
                presentations.push(presentation);
                this.bottoms.set(presentation.bottom, presentations);

                presentations = this.lefts.has(presentation.left) ? this.lefts.get(presentation.left) : new Array();
                presentations.push(presentation);
                this.lefts.set(presentation.left, presentations);

                presentations = this.tops.has(presentation.top) ? this.tops.get(presentation.top) : new Array();
                presentations.push(presentation);
                this.tops.set(presentation.top, presentations);

                presentations = this.masks.has(presentation.mask) ? this.masks.get(presentation.mask) : new Array();
                presentations.push(presentation);
                this.masks.set(presentation.mask, presentations);
            });
        });

        let rightInfo = new MinMax();
        this.rights.forEach(value => rightInfo.newValue(value.length));
        console.log("Right values: total is " + this.rights.size + ", min instances is " + rightInfo.min + ", max instances is " + rightInfo.max);
        let bottomInfo = new MinMax();
        this.bottoms.forEach(value => bottomInfo.newValue(value.length));
        console.log("Bottom values: total is " + this.bottoms.size + ", min instances is " + bottomInfo.min + ", max instances is " + bottomInfo.max);

        let leftInfo = new MinMax();
        this.lefts.forEach(value => leftInfo.newValue(value.length));
        console.log("Left values: total is " + this.lefts.size + ", min instances is " + leftInfo.min + ", max instances is " + leftInfo.max);
        let topInfo = new MinMax();
        this.tops.forEach(value => topInfo.newValue(value.length));
        console.log("Top values: total is " + this.tops.size + ", min instances is " + topInfo.min + ", max instances is " + topInfo.max);
        let maskInfo = new MinMax();
        this.masks.forEach(value => maskInfo.newValue(value.length));
        console.log("Mask values: total is " + this.masks.size + ", min instances is " + maskInfo.min + ", max instances is " + maskInfo.max);

        // this.dumpData(); return;
        this.arrangement = new Array();
        this.maxTilesPerDirection = Math.sqrt(this.tiles.size);
        if (this.maxTilesPerDirection != Math.floor(this.maxTilesPerDirection))
        {
            console.error("Number of tiles " + this.tiles.size + " is suspect");
            this.maxTilesPerDirection = Math.floor(this.maxTilesPerDirection);
        }
        let retVal = this.placeFirstTile();
        if (retVal)
        {
            let answer = this.arrangement[0].tileID *
                this.arrangement[this.maxTilesPerDirection - 1].tileID *
                this.arrangement[(this.maxTilesPerDirection - 1) * this.maxTilesPerDirection].tileID *
                this.arrangement[(this.maxTilesPerDirection * this.maxTilesPerDirection) - 1].tileID;
            console.log("Answer is " + answer.toLocaleString());
            this.answerDisplay.innerText = String(answer);
        }
        else
        {
            console.log("No solution found");
            this.answerDisplay.innerText = "No solution found";
        }
        let position = 0;
        this.arrangement.forEach(presentation =>
        {
            console.log("Position " + position++ + ": tile " + presentation.tileID + ", flip " + presentation.flip + 
                ", rotation " + presentation.rotation);
        });
        console.log("Milliseconds: " + (Date.now() - startTime));
    }

    private placeFirstTile() : boolean
    {
        for (let [id, tile] of this.tiles)
        {
            for (let presentation of tile.presentations)
            {
                this.placePresentation(presentation);
                if (this.placeNextTile()) return true;
                this.removePresentation();
            }
        }
        return false;
    }

    private placePresentation(presentation: TilePresentation)
    {
        this.arrangement.push(presentation);
        let logLine: string = "";
        this.arrangement.forEach(presentation => logLine += presentation.tileID + "[" + presentation.index + "], ");
        console.log(Date.now() + ", tiles placed: " + logLine);
        this.tiles.get(presentation.tileID).presentationUsed = presentation.index;
    }

    private removePresentation()
    {
        let presentation: TilePresentation = this.arrangement.pop();
        this.tiles.get(presentation.tileID).presentationUsed = -1;
    }

    private placeNextTile() : boolean
    {
        let row = Math.floor(this.arrangement.length / this.maxTilesPerDirection);
        let column = this.arrangement.length % this.maxTilesPerDirection;
        let matchCollection: Map<number, Array<TilePresentation>> = null;
        let matchValue: number;
        if (row == 0 && column > 0)
        {
            matchCollection = this.lefts;
            matchValue = this.arrangement[this.arrangement.length - 1].right;
        }
        else if (column == 0 && row > 0)
        {
            matchCollection = this.tops;
            matchValue = this.arrangement[this.arrangement.length - this.maxTilesPerDirection].bottom;
        }
        else if (column > 0 && row > 0)
        {
            matchCollection = this.masks;
            let leftValue = this.arrangement[this.arrangement.length - 1].right;
            let topValue = this.arrangement[this.arrangement.length - this.maxTilesPerDirection].bottom;
            matchValue = (maxValue + 1) * topValue + leftValue;
        }
        if (matchCollection.has(matchValue)) 
            for (let presentation of matchCollection.get(matchValue))
            {
                if (this.tiles.get(presentation.tileID).presentationUsed == -1)
                {
                    this.placePresentation(presentation);
                    if (this.arrangement.length == this.tiles.size) return true;
                    if (this.placeNextTile()) return true;
                    this.removePresentation();
                }
            }
        return false;
    }
    
    public dumpData()
    {
        let total = 0;
        let answer = "<table>";
        answer += this.tableRow("Tiles", String(this.tiles.size));
        answer += this.tableRow("Presentations", String(this.tiles.size * 16));
        answer += this.tableRow("Unique tops", String(this.tops.size));
        answer += this.tableRow("Unique bottoms", String(this.bottoms.size));
        let matches: Map<number, number> = new Map();
        this.tops.forEach((value, key) => matches.set(key, this.bottoms.get(key).length), this);
        let matchCounts: Map<number, number> = new Map();
        matches.forEach((value, key) =>
        {
            let matchCount = matchCounts.has(value) ? matchCounts.get(value) : 0;
            matchCounts.set(value, matchCount + 1);
        });
        matchCounts.forEach((value, key) => answer += this.tableRow(key + " matches", String(value)), this);
        answer += this.tableRow("Unique rights", String(this.rights.size));
        answer += this.tableRow("Unique lefts", String(this.lefts.size));
        matches = new Map();
        this.lefts.forEach((value, key) => matches.set(key, this.rights.get(key).length), this);
        matchCounts = new Map();
        matches.forEach((value, key) =>
        {
            let matchCount = matchCounts.has(value) ? matchCounts.get(value) : 0;
            matchCounts.set(value, matchCount + 1);
        });
        matchCounts.forEach((value, key) => answer += this.tableRow(key + " matches", String(value)), this);
        answer += this.tableRow("Unique masks", String(this.masks.size));
        console.log(answer + "</table>");
    }

    private tableRow(label: string, value: string)
    {
        return "<tr><td>" + label + "</td><td>" + value + "</td></tr>";
    }
}

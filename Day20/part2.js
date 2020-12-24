// @ts-check
import { doPart, PuzzlePart } from "../aocFW.js";
window.onload = function () { doPart(new PuzzleSolution()); };
const maxBorderLength = 10;
const maxValue = Math.pow(2, maxBorderLength) - 1;
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
class TilePresentation {
    constructor(tileID, index, rotation, flip, top, left, right, bottom) {
        this.tileID = tileID;
        this.index = index;
        this.rotation = rotation;
        this.flip = flip;
        this.top = top;
        this.left = left;
        this.right = right;
        this.bottom = bottom;
        this.mask = this.top * (maxValue + 1) + this.left;
    }
}
class Tile {
    constructor(id) {
        this.id = id;
        this.presentations = new Array();
        this.presentationUsed = -1;
        this.data = new Array();
    }
    addData(rawData) {
        this.data.push(rawData);
    }
    flipMe(value) {
        let flipped = 0;
        for (let nLoop = 0; nLoop < maxBorderLength; nLoop++)
            if ((Math.pow(2, nLoop) & value) > 0)
                flipped += Math.pow(2, maxBorderLength - 1 - nLoop);
        return flipped;
    }
    addPresentations(top, left, right, bottom) {
        let topFlip = this.flipMe(top);
        let leftFlip = this.flipMe(left);
        let rightFlip = this.flipMe(right);
        let bottomFlip = this.flipMe(bottom);
        this.doRotations(0, top, left, right, bottom, topFlip, leftFlip, rightFlip, bottomFlip);
        this.doRotations(1, bottom, leftFlip, rightFlip, top, bottomFlip, left, right, topFlip);
    }
    doRotations(flip, top, left, right, bottom, topFlip, leftFlip, rightFlip, bottomFlip) {
        let index = this.presentations.length;
        this.presentations.push(new TilePresentation(this.id, index++, 0, flip, top, left, right, bottom));
        this.presentations.push(new TilePresentation(this.id, index++, 1, flip, leftFlip, bottom, top, rightFlip));
        this.presentations.push(new TilePresentation(this.id, index++, 2, flip, bottomFlip, rightFlip, leftFlip, topFlip));
        this.presentations.push(new TilePresentation(this.id, index++, 3, flip, right, topFlip, bottomFlip, left));
    }
    getArrangedData(presentationIndex = -1) {
        let presentation = this.presentations[presentationIndex == -1 ? this.presentationUsed : presentationIndex];
        let copiedData = this.data.slice();
        if (presentation.flip == 1)
            copiedData.reverse();
        if (presentation.rotation == 0)
            return copiedData;
        let arrangedData = new Array();
        let arrangedLine;
        if (presentation.rotation == 1) {
            copiedData.reverse();
            for (let nLoop = 0; nLoop < this.data.length; nLoop++) {
                arrangedLine = "";
                copiedData.forEach(line => arrangedLine += line.substr(nLoop, 1));
                arrangedData.push(arrangedLine);
            }
        }
        if (presentation.rotation == 2) {
            copiedData.reverse().forEach(line => arrangedData.push(line.split("").reverse().join("")));
        }
        if (presentation.rotation == 3)
            for (let nLoop = this.data[0].length - 1; nLoop >= 0; nLoop--) {
                arrangedLine = "";
                copiedData.forEach(line => arrangedLine += line.substr(nLoop, 1));
                arrangedData.push(arrangedLine);
            }
        return arrangedData;
    }
}
class PuzzleSolution extends PuzzlePart {
    // called after a file is selected, prior to processing
    init(inputElement, outputElement, answerElement) {
        super.init(inputElement, outputElement, answerElement);
        this.tiles = new Map();
    }
    // called once per record (line) in the input file
    processRecord(record) {
        if (record.length > 0) {
            if (record.substr(0, 4) == "Tile") {
                this.nextTile = new Tile(Number(record.substr(5, 4)));
                this.tileRows = 0;
                this.topBorder = this.leftBorder = this.rightBorder = 0;
            }
            else {
                if (this.tileRows == 0) {
                    for (let nLoop = 0; nLoop < record.length; nLoop++)
                        if (record.substr(nLoop, 1) == "#")
                            this.topBorder += Math.pow(2, nLoop);
                }
                if (this.tileRows > 0 && this.tileRows < maxBorderLength - 1) {
                    this.nextTile.addData(record.substr(1, maxBorderLength - 2));
                }
                if (this.tileRows < maxBorderLength) {
                    if (record.substr(0, 1) == "#")
                        this.leftBorder += Math.pow(2, this.tileRows);
                    if (record.substr(maxBorderLength - 1, 1) == "#")
                        this.rightBorder += Math.pow(2, this.tileRows);
                }
                if (this.tileRows == maxBorderLength - 1) {
                    let bottom = 0;
                    for (let nLoop = 0; nLoop < record.length; nLoop++)
                        if (record.substr(nLoop, 1) == "#")
                            bottom += Math.pow(2, nLoop);
                    this.nextTile.addPresentations(this.topBorder, this.leftBorder, this.rightBorder, bottom);
                    this.tiles.set(this.nextTile.id, this.nextTile);
                }
                this.tileRows++;
            }
        }
        return true;
    }
    // called after all records are read in
    displayAnswer() {
        let startTime = Date.now();
        this.tops = new Map();
        // this.rights = new Map();
        // this.bottoms = new Map();
        this.lefts = new Map();
        this.masks = new Map();
        this.tiles.forEach((tile) => {
            tile.presentations.forEach((presentation) => {
                console.log(presentation.tileID + "," + presentation.index + "," + presentation.flip + "," + presentation.rotation + "," +
                    presentation.top + "," + presentation.right + "," + presentation.bottom + "," + presentation.left + "," + presentation.mask);
                let presentations;
                /* presentations = this.rights.has(presentation.right) ? this.rights.get(presentation.right) : new Array();
                presentations.push(presentation);
                this.rights.set(presentation.right, presentations);

                presentations = this.bottoms.has(presentation.bottom) ? this.bottoms.get(presentation.bottom) : new Array();
                presentations.push(presentation);
                this.bottoms.set(presentation.bottom, presentations); */
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
        /* let rightInfo = new MinMax();
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
        console.log("Mask values: total is " + this.masks.size + ", min instances is " + maskInfo.min + ", max instances is " + maskInfo.max); */
        this.maxTilesPerDirection = Math.sqrt(this.tiles.size);
        if (this.maxTilesPerDirection != Math.floor(this.maxTilesPerDirection)) {
            console.error("Number of tiles " + this.tiles.size + " is suspect");
            this.maxTilesPerDirection = Math.floor(this.maxTilesPerDirection);
        }
        this.arrangements = new Array();
        this.arrangement = new Array();
        this.placeFirstTile();
        let answer = "";
        let cornerIndecies = [0, this.maxTilesPerDirection - 1,
            (this.maxTilesPerDirection - 1) * this.maxTilesPerDirection,
            (this.maxTilesPerDirection * this.maxTilesPerDirection) - 1];
        this.arrangements.forEach((arrangement, index) => {
            let thisAnswer = "Arrangement " + index + " answer is " +
                (arrangement[cornerIndecies[0]].tileID * arrangement[cornerIndecies[1]].tileID *
                    arrangement[cornerIndecies[2]].tileID * arrangement[cornerIndecies[3]].tileID);
            console.log(thisAnswer);
            answer += thisAnswer + "<br/>";
        });
        if (answer == "")
            this.answerDisplay.innerHTML = "No solutions found";
        else
            this.answerDisplay.innerHTML = answer;
        console.log("Milliseconds: " + (Date.now() - startTime));
        // end part 1, now on to part 2
        // this.dumpData(); return;
        let maxRoughness = 0;
        let maxMonsters = 0;
        let maxArrangement;
        answer = "";
        this.arrangements.forEach((arrangement, arrangementIndex) => {
            let picture = new Array(this.maxTilesPerDirection * (maxBorderLength - 2));
            picture.fill("");
            arrangement.forEach((presentation, index) => {
                let tileData = this.tiles.get(presentation.tileID).getArrangedData(presentation.index);
                let pictureLoop = Math.floor(index / this.maxTilesPerDirection) * (maxBorderLength - 2);
                tileData.forEach(line => picture[pictureLoop++] += line);
            }, this);
            // picture.forEach(line => console.log(line));
            console.log("Checking arrangement " + arrangementIndex + " for monsters");
            let monsterCount = this.hereBeMonsters(picture);
            if (monsterCount > maxMonsters) {
                maxMonsters = monsterCount;
                maxArrangement = arrangementIndex;
                maxRoughness = 0;
                picture.forEach(line => maxRoughness += line.match(/#/g).length);
                maxRoughness -= monsterCount * 15;
            }
            answer += this.tableRow("Arrangement " + arrangementIndex + ", " + monsterCount + " monsters");
            answer += this.tableRow("<pre>" + picture.join("\n") + "</pre>");
            answer += this.tableRow("&nbsp;");
        }, this);
        this.answerDisplay.innerHTML += "Roughness is " + maxRoughness + " in arrangement " + maxArrangement +
            "<table>" + answer + "</table>";
    }
    hereBeMonsters(picture) {
        let monsterLine1 = /..................#./;
        let monsterLine2 = /#....##....##....###/g;
        let monsterLine3 = /.#..#..#..#..#..#.../;
        let monsterCount = 0;
        for (let lineLoop = 1; lineLoop < picture.length - 1; lineLoop++) {
            for (let match of picture[lineLoop].matchAll(monsterLine2)) {
                console.log("Match on line " + lineLoop + ", position " + match.index + ": " + match[0]);
                let line3Target = picture[lineLoop + 1].substr(match.index, 20);
                if (monsterLine3.test(line3Target)) {
                    console.log("Match on line " + (lineLoop + 1) + ", position " + match.index + ": " + line3Target);
                    let line1Target = picture[lineLoop - 1].substr(match.index, 20);
                    if (monsterLine1.test(line1Target)) {
                        console.log("Match on line " + (lineLoop - 1) + ", position " + match.index + ": " + line1Target);
                        monsterCount++;
                    }
                    else
                        console.log("No match on line " + (lineLoop - 1));
                }
                else
                    console.log("No match on line " + (lineLoop + 1));
            }
        }
        return monsterCount;
    }
    placeFirstTile() {
        for (let [id, tile] of this.tiles) {
            for (let presentation of tile.presentations) {
                this.placePresentation(presentation);
                this.placeNextTile();
                this.removePresentation();
            }
        }
        return false;
    }
    placePresentation(presentation) {
        this.arrangement.push(presentation);
        console.log(Date.now() + ", tiles placed: " + this.arrangement.length);
        this.tiles.get(presentation.tileID).presentationUsed = presentation.index;
    }
    removePresentation() {
        let presentation = this.arrangement.pop();
        this.tiles.get(presentation.tileID).presentationUsed = -1;
    }
    placeNextTile() {
        let row = Math.floor(this.arrangement.length / this.maxTilesPerDirection);
        let column = this.arrangement.length % this.maxTilesPerDirection;
        let matchCollection = null;
        let matchValue;
        if (row == 0 && column > 0) {
            matchCollection = this.lefts;
            matchValue = this.arrangement[this.arrangement.length - 1].right;
        }
        else if (column == 0 && row > 0) {
            matchCollection = this.tops;
            matchValue = this.arrangement[this.arrangement.length - this.maxTilesPerDirection].bottom;
        }
        else if (column > 0 && row > 0) {
            matchCollection = this.masks;
            let leftValue = this.arrangement[this.arrangement.length - 1].right;
            let topValue = this.arrangement[this.arrangement.length - this.maxTilesPerDirection].bottom;
            matchValue = (maxValue + 1) * topValue + leftValue;
        }
        if (matchCollection.has(matchValue))
            for (let presentation of matchCollection.get(matchValue)) {
                if (this.tiles.get(presentation.tileID).presentationUsed == -1) {
                    this.placePresentation(presentation);
                    if (this.arrangement.length == this.tiles.size) {
                        this.arrangements.push(this.arrangement);
                        this.arrangement = this.arrangement.slice();
                    }
                    else
                        this.placeNextTile();
                    this.removePresentation();
                }
            }
        return false;
    }
    dumpData() {
        let answer = "<table style='text-align:center'>";
        answer += this.tableRow("Tile", "Original", "Right 90", "180", "Left 90");
        this.tiles.forEach(tile => {
            answer += this.tableRow(String(tile.id), "<pre>" + tile.getArrangedData(0).join("\n") + "</pre>", "<pre>" + tile.getArrangedData(1).join("\n") + "</pre>", "<pre>" + tile.getArrangedData(2).join("\n") + "</pre>", "<pre>" + tile.getArrangedData(3).join("\n") + "</pre>");
            answer += this.tableRow("&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;");
            answer += this.tableRow(String(tile.id) + " flipped", "<pre>" + tile.getArrangedData(4).join("\n") + "</pre>", "<pre>" + tile.getArrangedData(5).join("\n") + "</pre>", "<pre>" + tile.getArrangedData(6).join("\n") + "</pre>", "<pre>" + tile.getArrangedData(7).join("\n") + "</pre>");
            answer += this.tableRow("&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;");
        }, this);
        this.answerDisplay.innerHTML = answer;
    }
    tableRow(...cellText) {
        let rowText = "<tr>";
        cellText.forEach(text => rowText += "<td>" + text + "</td>");
        return rowText + "</tr>";
    }
}

// @ts-check
import { doPart, PuzzlePart } from "../aocFW.js";
window.onload = function () { doPart(new PuzzleSolution()); };
class PuzzleSolution extends PuzzlePart {
    // called after a file is selected, prior to processing
    init(inputElement, outputElement, answerElement) {
        super.init(inputElement, outputElement, answerElement);
        this.cups = new Array();
    }
    // called once per record (line) in the input file
    processRecord(record) {
        // this.cups = [3,8,9,1,2,5,4,6,7];
        // 398254716
        this.cups = [3, 9, 8, 2, 5, 4, 7, 1, 6];
        return false;
    }
    // called after all records are read in
    displayAnswer() {
        let minLabel = 1;
        let maxLabel = 9;
        let moves = 1;
        do {
            let removedCups = this.cups.splice(1, 3);
            let destinationLabel = this.cups[0] - 1;
            while (this.cups.indexOf(destinationLabel) == -1) {
                destinationLabel--;
                if (destinationLabel < minLabel)
                    destinationLabel = maxLabel;
            }
            let destinationCupIndex = this.cups.indexOf(destinationLabel);
            this.cups.splice(destinationCupIndex + 1, 0, removedCups[0], removedCups[1], removedCups[2]);
            this.cups.push(this.cups.shift());
        } while (moves++ < 100);
        let retVal = "";
        let index = this.cups.indexOf(1);
        for (let nLoop = index + 1; nLoop < this.cups.length; nLoop++)
            retVal += String(this.cups[nLoop]);
        for (let nLoop = 0; nLoop < index; nLoop++)
            retVal += String(this.cups[nLoop]);
        this.answerDisplay.innerText = "Final cup order is " + retVal;
    }
}

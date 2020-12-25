// @ts-check
import { doPart, PuzzlePart } from "../aocFW.js";
window.onload = function () { doPart(new PuzzleSolution()); };
const modValue = 20201227;
class PuzzleSolution extends PuzzlePart {
    constructor() {
        super(...arguments);
        this.subjectNumber = 7;
    }
    // called after a file is selected, prior to processing
    init(inputElement, outputElement, answerElement) {
        super.init(inputElement, outputElement, answerElement);
        this.publicKeys = new Array();
        this.loopSizes = new Array();
    }
    // called once per record (line) in the input file
    processRecord(record) {
        if (record.length > 0) {
            let key = Number(record);
            this.publicKeys.push(key);
            let value = 1;
            let loop = 0;
            do {
                value *= this.subjectNumber;
                value = value % modValue;
                loop++;
            } while (value != key);
            this.loopSizes[this.publicKeys.length - 1] = loop;
        }
        return true;
    }
    // called after all records are read in
    displayAnswer() {
        let subjectKey = this.publicKeys[0];
        let value = 1;
        for (let nLoop = 0; nLoop < this.loopSizes[1]; nLoop++) {
            value *= subjectKey;
            value = value % modValue;
        }
        let encryptionKey = new Array(2);
        encryptionKey[0] = value;
        subjectKey = this.publicKeys[1];
        value = 1;
        for (let nLoop = 0; nLoop < this.loopSizes[0]; nLoop++) {
            value *= subjectKey;
            value = value % modValue;
        }
        encryptionKey[1] = value;
        this.answerDisplay.innerText = "Encryption keys are " + encryptionKey[0] + " and " + encryptionKey[1];
    }
}

// @ts-check

import { doPart, PuzzlePart } from "../aocFW.js";

window.onload = function () { doPart(new PuzzleSolution()); };

const modValue = 20201227;

class PuzzleSolution extends PuzzlePart
{
    private subjectNumber = 7;
    private publicKeys: Array<number>;
    private loopSizes: Array<number>;

    // called after a file is selected, prior to processing
    public init(inputElement: HTMLDivElement, outputElement: HTMLDivElement, answerElement: HTMLDivElement)
    {
        super.init(inputElement, outputElement, answerElement);
        this.publicKeys = new Array();
        this.loopSizes = new Array();
    }

    // called once per record (line) in the input file
    public processRecord(record: string) : boolean
    {
        if (record.length > 0)
        {
            let key = Number(record);
            this.publicKeys.push(key);
            let value = 1;
            let loop = 0;
            do
            {
                value *= this.subjectNumber;
                value = value % modValue;
                loop++;
            } while (value != key);
            this.loopSizes[this.publicKeys.length - 1] = loop;
        }
        return true;
    }

    // called after all records are read in
    public displayAnswer()
    {
        let subjectKey = this.publicKeys[0];
        let value = 1;
        for (let nLoop = 0; nLoop < this.loopSizes[1]; nLoop++)
        {
            value *= subjectKey;
            value = value % modValue;
        }
        let encryptionKey = new Array(2);
        encryptionKey[0] = value;
        subjectKey = this.publicKeys[1];
        value = 1;
        for (let nLoop = 0; nLoop < this.loopSizes[0]; nLoop++)
        {
            value *= subjectKey;
            value = value % modValue;
        }
        encryptionKey[1] = value;
        this.answerDisplay.innerText = "Encryption keys are " + encryptionKey[0] + " and " + encryptionKey[1];
    }
}
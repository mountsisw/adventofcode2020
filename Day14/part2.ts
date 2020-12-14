// @ts-check

import { doPart, PuzzlePart } from "../aocFW.js";

window.onload = function () { doPart(new PuzzleSolution()); };

class ThirtySixBitValueMask
{
    private upper28AndMask: number;
    private upper28OrMask: number;
    private lower8AndMask: number;
    private lower8OrMask: number;

    constructor(maskData: string)
    {
        this.upper28AndMask = this.upper28OrMask = this.lower8AndMask = this.lower8OrMask = 0;
        for (let nLoop: number = 0; nLoop < 8; nLoop++)
        {
            let maskChar: string = maskData.substr(maskData.length - (nLoop + 1), 1);
            if (maskChar != "0") this.lower8AndMask += Math.pow(2, nLoop);
            if (maskChar == "1") this.lower8OrMask += Math.pow(2, nLoop);
        }
        for (let nLoop: number = 8; nLoop < maskData.length; nLoop++)
        {
            let maskChar: string = maskData.substr(maskData.length - (nLoop + 1), 1);
            if (maskChar != "0") this.upper28AndMask += Math.pow(2, nLoop - 8);
            if (maskChar == "1") this.upper28OrMask += Math.pow(2, nLoop - 8);
        }
    }

    public apply(value: number) : number
    {
        let lowerValue: number = value % 256;
        lowerValue &= this.lower8AndMask;
        lowerValue |= this.lower8OrMask;
        let upperValue: number = Math.floor(value / 256);
        upperValue &= this.upper28AndMask;
        upperValue |= this.upper28OrMask;
        return upperValue * 256 + lowerValue;
    }
}

class PuzzleSolution extends PuzzlePart
{
    private masks: Array<ThirtySixBitValueMask>;
    private values: Map<number, number>;

    // called after a file is selected, prior to processing
    public init(inputElement: HTMLDivElement, outputElement: HTMLDivElement, answerElement: HTMLDivElement)
    {
        super.init(inputElement, outputElement, answerElement);
        this.masks = new Array();
        this.values = new Map();
    }

    // called once per record (line) in the input file
    public processRecord(record: string) : Boolean
    {
        if (record.length > 0)
        {
            this.inputDisplay.innerText = record;
            let fields: Array<string> = record.split(" ");
            if (fields[0] == "mask")
            {
                this.makeMasks(fields[2]);
                this.outputDisplay.innerText = String(this.masks.length) + " total masks";
            }
            else
            {
                let index: number = Number(fields[0].substr(4, fields[0].length - 5));
                let value: number = Number(fields[2]);
                for (let nLoop: number = 0; nLoop < this.masks.length; nLoop++)
                    this.values.set(this.masks[nLoop].apply(index), value);
            }
        }
        return true;
    }

    private makeMasks(maskTemplate: string)
    {
        this.masks = [];
        let revisedTemplate: string = "";
        let floatingPositions: Array<number> = new Array();
        for (let nLoop: number = 0; nLoop < maskTemplate.length; nLoop++)
        {
            let maskChar = maskTemplate.substr(nLoop, 1);
            if (maskChar == "0") revisedTemplate += "X";
            else if (maskChar == "1") revisedTemplate += "1";
            else
            {
                floatingPositions.push(nLoop);
                revisedTemplate += "_";
            }
        }
        this.fillFloatingValue(revisedTemplate, 0, floatingPositions);
        return;
    }

    private fillFloatingValue(template: string, index: number, floatingPositions: Array<number>)
    {
        if (index == floatingPositions.length)
        {
            this.masks.push(new ThirtySixBitValueMask(template));
            return;
        }
        let position: number = floatingPositions[index];
        template = template.substr(0, position) + "0" + template.substr(position + 1);
        this.fillFloatingValue(template, index + 1, floatingPositions);
        template = template.substr(0, position) + "1" + template.substr(position + 1);
        this.fillFloatingValue(template, index + 1, floatingPositions);
        return;
    }

    // called after all records are read in
    public displayAnswer()
    {
        let sum: number = 0;
        this.values.forEach((value) => { sum += value; });
        this.answerDisplay.innerText = "Sum of values is " + String(sum);
    }
}


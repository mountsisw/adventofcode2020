// @ts-check
import { doPart, PuzzlePart } from "../aocFW.js";
window.onload = function () { doPart(new PuzzleSolution()); };
class PuzzleSolution extends PuzzlePart {
    // called after a file is selected, prior to processing
    init(inputElement, outputElement, answerElement) {
        super.init(inputElement, outputElement, answerElement);
        this.categories = new Map();
        this.mode = 0;
        this.allowedFieldNames = new Array();
        this.allowedFieldNames.push(new Array());
    }
    // called once per record (line) in the input file
    processRecord(record) {
        if (this.mode == 0) {
            if (record.length == 0) {
                this.mode = 1;
                for (let nLoop = 1; nLoop < this.categories.size; nLoop++)
                    this.allowedFieldNames.push(this.allowedFieldNames[0].concat([]));
            }
            else {
                let fields = record.split(" ");
                let name = fields[0];
                if (fields.length == 5)
                    name += " " + fields[1];
                let range = fields[fields.length - 3].split("-");
                let minMax1 = [Number(range[0]), Number(range[1])];
                range = fields[fields.length - 1].split("-");
                let minMax2 = [Number(range[0]), Number(range[1])];
                this.categories.set(name, new Category(name, minMax1, minMax2));
                this.allowedFieldNames[0].push(name);
            }
        }
        else if (this.mode == 1) {
            if (record == "your ticket:")
                this.mode = 2;
        }
        else if (this.mode == 2) {
            this.myTicket = record;
            this.mode = 3;
        }
        else if (this.mode == 3) {
            if (record == "nearby tickets:")
                this.mode = 4;
        }
        else {
            this.inputDisplay.innerText = record;
            this.outputDisplay.innerText = "Valid";
            let fields = record.split(",");
            let allowedCategories = new Array();
            for (let nLoop = 0; nLoop < fields.length; nLoop++) {
                let value = Number(fields[nLoop]);
                let newArray = new Array();
                this.allowedFieldNames[nLoop].forEach((name) => {
                    if (this.categories.get(name).isValid(value))
                        newArray.push(name);
                });
                if (newArray.length == 0) {
                    this.outputDisplay.innerText = value + " is invalid";
                    break;
                }
                allowedCategories.push(newArray);
            }
            if (allowedCategories.length == fields.length)
                this.allowedFieldNames = allowedCategories;
        }
        return true;
    }
    // called after all records are read in
    displayAnswer() {
        let knownFields = new Array(this.allowedFieldNames.length);
        knownFields.fill(false);
        for (let nLoop = 0; nLoop < this.allowedFieldNames.length; nLoop++) {
            for (let loop1 = 0; loop1 < this.allowedFieldNames.length; loop1++)
                if (knownFields[loop1] == false && this.allowedFieldNames[loop1].length == 1) {
                    let name = this.allowedFieldNames[loop1][0];
                    knownFields[loop1] = true;
                    for (let loop2 = 0; loop2 < this.allowedFieldNames.length; loop2++)
                        if (knownFields[loop2] == false && this.allowedFieldNames[loop2].includes(name))
                            this.allowedFieldNames[loop2].splice(this.allowedFieldNames[loop2].indexOf(name), 1);
                    break;
                }
        }
        let myFields = this.myTicket.split(",");
        let answer = 1;
        for (let nLoop = 0; nLoop < this.allowedFieldNames.length; nLoop++) {
            let name = this.allowedFieldNames[nLoop][0];
            if (name.substr(0, 9) == "departure")
                answer *= Number(myFields[nLoop]);
        }
        this.answerDisplay.innerText = String(answer);
    }
}
class Category {
    constructor(name, range1, range2) {
        this.name = name;
        this.range1 = range1;
        this.range2 = range2;
        this.order = -1;
    }
    isValid(value) {
        if (value >= this.range1[0] && value <= this.range1[1])
            return true;
        if (value >= this.range2[0] && value <= this.range2[1])
            return true;
        return false;
    }
}

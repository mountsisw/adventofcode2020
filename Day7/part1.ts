// @ts-check

import { doPart, PuzzlePart } from "../aocFW.js";

window.onload = function () { doPart(new PuzzleSolution()); };

class PuzzleSolution extends PuzzlePart
{
    private bagRules: Map<string, Map<string, number>>;

    // called after a file is selected, prior to processing
    public init(inputElement: HTMLDivElement, outputElement: HTMLDivElement, answerElement: HTMLDivElement)
    {
        super.init(inputElement, outputElement, answerElement);
        this.bagRules = new Map();
    }

    // called once per record (line) in the input file
    public processRecord(record: string) : Boolean
    {
        if (record.length > 0)
        {
            let parsedRecord: Array<string> = record.split(" ");
            let index: number = 4;
            let contents: Map<string, number> = new Map();
            while (index < parsedRecord.length)
            {
                if (Number.isNaN(Number(parsedRecord[index])) == false)
                    contents.set(parsedRecord[index + 1] + parsedRecord[index + 2], Number(parsedRecord[index]))
                index += 4;
            }
            this.bagRules.set(parsedRecord[0] + parsedRecord[1], contents);
        }
        return true;
    }

    // called after all records are read in
    public displayAnswer()
    {
        let containingBags: Map<string, any> = new Map();
        let searchTerms: Map<string, any> = new Map();
        searchTerms.set("shinygold", null);
        do {
            let nextSearchTerms: Map<string, any> = new Map();
            this.bagRules.forEach(function (contents, bagName)
            {
                searchTerms.forEach(function (value, key)
                {
                    if (contents.has(key))
                    {
                        containingBags.set(bagName, null);
                        nextSearchTerms.set(bagName, null);
                    }
                });
            });
            searchTerms = nextSearchTerms;
        } while (searchTerms.size > 0);
        this.answerDisplay.innerText = `Total of ${containingBags.size} can have shiny gold bags`;
    }
}


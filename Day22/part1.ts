// @ts-check

import { doPart, PuzzlePart } from "../aocFW.js";

window.onload = function () { doPart(new PuzzleSolution()); };

class PuzzleSolution extends PuzzlePart
{
    private humanHand: Array<number>;
    private crabHand: Array<number>;
    private activeHand: Array<number>;

    // called after a file is selected, prior to processing
    public init(inputElement: HTMLDivElement, outputElement: HTMLDivElement, answerElement: HTMLDivElement)
    {
        super.init(inputElement, outputElement, answerElement);
        this.humanHand = new Array();
        this.crabHand = new Array();
    }

    // called once per record (line) in the input file
    public processRecord(record: string) : Boolean
    {
        if (record.length > 0)
        {
            if (record == "Player 1:") this.activeHand = this.humanHand;
            else if (record == "Player 2:") this.activeHand = this.crabHand;
            else this.activeHand.push(Number(record));
        }
        return true;
    }

    playCombat(humanHand: Array<number>, crabHand: Array<number>) : boolean
    {
        do {
            let humanCard = this.humanHand.shift();
            let crabCard = this.crabHand.shift();
            if (humanCard > crabCard) { this.humanHand.push(humanCard); this.humanHand.push(crabCard); }
            else { this.crabHand.push(crabCard); this.crabHand.push(humanCard); }
        } while (this.humanHand.length >= 1 && this.crabHand.length >= 1);
        return this.humanHand.length > 0;
    }

    // called after all records are read in
    public displayAnswer()
    {
        this.playCombat(this.humanHand, this.crabHand);
        let score: number = 0;
        let cardMultiplier = this.humanHand.length + this.crabHand.length;
        this.humanHand.forEach(card => score += card * cardMultiplier--);
        this.crabHand.forEach(card => score += card * cardMultiplier--);
        this.answerDisplay.innerText = "Winning score: " + score;
    }
}
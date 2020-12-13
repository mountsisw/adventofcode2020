// @ts-check
import { doPart, PuzzlePart } from "../aocFW.js";
window.onload = function () { doPart(new PuzzleSolution()); };
class PuzzleSolution extends PuzzlePart {
    // called after a file is selected, prior to processing
    init(inputElement, outputElement, answerElement) {
        super.init(inputElement, outputElement, answerElement);
        this.departureTime = 0;
        this.busses = new Array();
    }
    // called once per record (line) in the input file
    processRecord(record) {
        if (record.length > 0) {
            if (this.departureTime == 0)
                this.departureTime = Number(record);
            else {
                let availableRoutes = record.split(",");
                for (let nLoop = 0; nLoop < availableRoutes.length; nLoop++)
                    if (availableRoutes[nLoop] != "x")
                        this.busses.push(Number(availableRoutes[nLoop]));
            }
        }
        return true;
    }
    // called after all records are read in
    displayAnswer() {
        let waitTime;
        let earliestBus;
        let minWait = Number.MAX_SAFE_INTEGER;
        for (let nLoop = 0; nLoop < this.busses.length; nLoop++) {
            let waitTime = this.busses[nLoop] - this.departureTime % this.busses[nLoop];
            if (waitTime == this.busses[nLoop])
                waitTime = 0;
            if (waitTime < minWait) {
                minWait = waitTime;
                earliestBus = this.busses[nLoop];
            }
        }
        this.answerDisplay.innerText = "Weird answer is " + String(earliestBus * minWait);
    }
}

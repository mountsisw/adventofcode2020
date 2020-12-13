// @ts-check
import { doPart, PuzzlePart } from "../aocFW.js";
window.onload = function () { doPart(new PuzzleSolution()); };
class PuzzleSolution extends PuzzlePart {
    // called after a file is selected, prior to processing
    init(inputElement, outputElement, answerElement) {
        super.init(inputElement, outputElement, answerElement);
        this.departureTime = 0;
        this.busses = new Array();
        this.maxRoute = 0;
    }
    // called once per record (line) in the input file
    processRecord(record) {
        if (record.length > 0) {
            if (this.departureTime == 0)
                this.departureTime = Number(record);
            else {
                let availableRoutes = record.split(",");
                this.inputDisplay.innerText = String(availableRoutes.length) + " routes in the timetable";
                for (let nLoop = 0; nLoop < availableRoutes.length; nLoop++)
                    if (availableRoutes[nLoop] == "x")
                        this.busses.push(0);
                    else {
                        let route = Number(availableRoutes[nLoop]);
                        this.busses.push(route);
                        if (route > this.maxRoute) {
                            this.maxRoute = route;
                            this.timeOffset = nLoop;
                            this.outputDisplay.innerText = "Route " + String(this.maxRoute) + " at +" + String(this.timeOffset) + " is limiting route";
                        }
                    }
            }
        }
        return true;
    }
    // called after all records are read in
    displayAnswer() {
        let timeStart = 0;
        let matched;
        let lcm = this.busses[0];
        let lastInLCM = 0;
        do {
            timeStart += lcm;
            let timeStamp = timeStart;
            matched = 0;
            let bus = 0;
            let wereCool = true;
            while (bus < this.busses.length && wereCool)
                if (this.busses[bus] == 0) {
                    matched++;
                    bus++;
                    timeStamp++;
                }
                else if (timeStamp % this.busses[bus] == 0) {
                    if (bus > lastInLCM) {
                        lastInLCM = bus;
                        lcm = this.getLCM(lcm, this.busses[bus]);
                        console.log("New LCM " + String(lcm));
                    }
                    matched++;
                    bus++;
                    timeStamp++;
                }
                else
                    wereCool = false;
            console.log("Timestamp " + String(timeStart) + " matched " + String(matched));
        } while (matched != this.busses.length);
        this.answerDisplay.innerText = "Earliest timestamp is " + timeStart;
    }
    getLCM(a, b) {
        return (a * b) / this.getGCD(a, b);
    }
    getGCD(a, b) {
        if (a == b)
            return a;
        if (a == 0)
            return b;
        if (b == 0)
            return a;
        if (a % 2 == 0)
            if (b % 2 == 1)
                return this.getGCD(a / 2, b);
            else
                return 2 * this.getGCD(a / 2, b / 2);
        if (b % 2 == 0)
            return this.getGCD(a, b / 2);
        if (a > b)
            return this.getGCD((a - b) / 2, b);
        else
            return this.getGCD((b - a) / 2, a);
    }
}

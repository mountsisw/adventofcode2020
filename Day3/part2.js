// @ts-check
window.onload = function () {
    let fileChooser = document.getElementById("puzzleInput");
    let fileProgress = document.getElementById("fileProgress");
    fileChooser.onchange = function (event) {
        if (fileChooser.files.length > 0) {
            let file = fileChooser.files[0];
            document.getElementById("fileName").innerText = file.name + " " + file.type;
            let fr = new FileReader();
            fr.onloadend = function () {
                let aValues = fr.result.split("\n");
                // console.log(aValues);
                let maxRecords = aValues.length;
                document.getElementById("recordCount").innerText = String(maxRecords) + " records";
                fileProgress.max = maxRecords;
                let recordIndex = 0;
                let inputDiv = document.getElementById("input");
                let outputDiv = document.getElementById("output");
                initAnswer();
                window.setTimeout(function processFileRecords() {
                    let moreRecords = processRecord(aValues[recordIndex], inputDiv, outputDiv);
                    fileProgress.value = ++recordIndex;
                    if (moreRecords == true && recordIndex < maxRecords)
                        window.setTimeout(processFileRecords, 0);
                    else
                        displayAnswer(document.getElementById("answer"));
                }, 0);
            };
            fr.readAsText(file);
        }
        else
            alert("No file selected");
    };
};
class Toboggan {
    constructor(colSlope, rowSlope) {
        this.colSlope = colSlope;
        this.rowSlope = rowSlope;
        this.column = 0;
        this.row = 0;
    }
    checkForTree(ground) {
        let retVal = false;
        if (this.row % this.rowSlope == 0) {
            retVal = ground[this.column] == "#";
            this.column += this.colSlope;
            if (this.column >= ground.length)
                this.column -= ground.length;
        }
        this.row++;
        return retVal;
    }
}
let toboggans = new Array();
function initAnswer() {
    toboggans = [];
    toboggans.push({ toboggan: new Toboggan(1, 1), trees: 0 });
    toboggans.push({ toboggan: new Toboggan(3, 1), trees: 0 });
    toboggans.push({ toboggan: new Toboggan(5, 1), trees: 0 });
    toboggans.push({ toboggan: new Toboggan(7, 1), trees: 0 });
    toboggans.push({ toboggan: new Toboggan(1, 2), trees: 0 });
}
function processRecord(record, inputDisplay, outputDisplay) {
    if (record.charCodeAt(record.length - 1) == 13)
        record = record.substr(0, record.length - 1);
    inputDisplay.innerText = record;
    if (record.length > 0) {
        for (let nLoop = 0; nLoop < toboggans.length; nLoop++)
            if (toboggans[nLoop].toboggan.checkForTree(record))
                toboggans[nLoop].trees++;
    }
    return true;
}
function displayAnswer(answerDisplay) {
    let answer = 1;
    for (let nLoop = 0; nLoop < toboggans.length; nLoop++) {
        console.log(toboggans[nLoop].trees);
        answer *= toboggans[nLoop].trees;
    }
    answerDisplay.innerText = `${answer}`;
}

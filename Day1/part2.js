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
let nValues = new Array();
let answer = 0;
function processRecord(record, inputDisplay, outputDisplay) {
    if (record.length > 0) {
        inputDisplay.innerText = record;
        let value = Number(record);
        let target = 2020 - value;
        for (let nLoop = 0; nLoop < nValues.length; nLoop++) {
            let smallerTarget = target - nValues[nLoop];
            if (nValues.includes(smallerTarget)) {
                answer = value * smallerTarget * nValues[nLoop];
                outputDisplay.innerText = "Matched to " + String(smallerTarget) + " + " + String(nValues[nLoop]);
                return false;
            }
        }
        nValues.push(value);
        outputDisplay.innerText = "No match";
    }
    return true;
}
function displayAnswer(answerDisplay) {
    if (answer > 0)
        answerDisplay.innerText = String(answer);
    else
        answerDisplay.innerText = "Not found!";
}

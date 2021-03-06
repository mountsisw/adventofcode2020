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
let answer = 0;
function processRecord(record, inputDisplay, outputDisplay) {
    if (record.length > 0) {
        inputDisplay.innerText = record;
        let fields = record.split(" ");
        let minMax = fields[0].split("-");
        let first = fields[2][Number(minMax[0]) - 1] == fields[1][0];
        let second = fields[2][Number(minMax[1]) - 1] == fields[1][0];
        if ((first && !second) || (!first && second)) {
            answer++;
            outputDisplay.innerText = "Valid";
        }
        else
            outputDisplay.innerText = "Invalid";
    }
    return true;
}
function displayAnswer(answerDisplay) {
    answerDisplay.innerText = `${answer} passports are valid`;
}

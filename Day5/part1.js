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
                document.getElementById("answer").innerText = "";
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
let answer;
function initAnswer() {
    answer = 0;
}
function processRecord(record, inputDisplay, outputDisplay) {
    if (record.charCodeAt(record.length - 1) == 13)
        record = record.substr(0, record.length - 1);
    if (record.length > 0) {
        inputDisplay.innerText = record;
        let rowMin = 0, rowMax = 127, rows = 64;
        let loop2 = 0;
        for (; loop2 < 7; loop2++, rows /= 2) {
            if (record.charAt(loop2) == "F")
                rowMax -= rows;
            else
                rowMin += rows;
        }
        let colMin = 0, colMax = 7, columns = 4;
        for (; loop2 < 10; loop2++, columns /= 2) {
            if (record.charAt(loop2) == "L")
                colMax -= columns;
            else
                colMin += columns;
        }
        let ID = (rowMin * 8) + colMin;
        outputDisplay.innerText = String(ID);
        answer = Math.max(answer, ID);
    }
    return true;
}
function displayAnswer(answerDisplay) {
    answerDisplay.innerText = `Highest seat ID is ${answer}`;
}

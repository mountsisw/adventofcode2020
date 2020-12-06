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
let answers;
let text;
let total;
function initAnswer() {
    answers = new Map();
    text = "";
    total = 0;
}
function processRecord(record, inputDisplay, outputDisplay) {
    if (record.charCodeAt(record.length - 1) == 13)
        record = record.substr(0, record.length - 1);
    console.log(record);
    console.log(record.length);
    if (record.length > 0) {
        if (text.length == 0)
            for (let nLoop = 0; nLoop < record.length; nLoop++)
                answers.set(record.substr(nLoop, 1), true);
        else {
            let newMap = new Map();
            for (let nLoop = 0; nLoop < record.length; nLoop++)
                if (answers.has(record.substr(nLoop, 1)))
                    newMap.set(record.substr(nLoop, 1), true);
            answers = newMap;
        }
        text += record + " ";
    }
    else {
        console.log(text);
        console.log(answers.size);
        inputDisplay.innerText = text;
        text = "";
        outputDisplay.innerText = String(answers.size);
        total += answers.size;
        answers.clear();
    }
    return true;
}
function displayAnswer(answerDisplay) {
    answerDisplay.innerText = `Total of ${total + answers.size} Yes answers`;
}

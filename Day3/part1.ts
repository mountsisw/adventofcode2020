// @ts-check

window.onload = function ()
{
    let fileChooser: HTMLInputElement = <HTMLInputElement> document.getElementById("puzzleInput");
    let fileProgress: HTMLProgressElement = <HTMLProgressElement> document.getElementById("fileProgress");
    fileChooser.onchange = function (event)
    {
        if (fileChooser.files.length > 0)
        {
            let file: File = fileChooser.files[0];
            document.getElementById("fileName").innerText = file.name + " " + file.type;
            let fr: FileReader = new FileReader();
            fr.onloadend = function ()
            {
                let aValues: Array<string> = (<String> fr.result).split("\n");
                // console.log(aValues);
                let maxRecords: number = aValues.length;
                document.getElementById("recordCount").innerText = String(maxRecords) + " records";
                fileProgress.max = maxRecords;
                let recordIndex: number = 0;
                let inputDiv: HTMLDivElement = <HTMLDivElement> document.getElementById("input");
                let outputDiv: HTMLDivElement = <HTMLDivElement> document.getElementById("output");
                initAnswer();
                window.setTimeout(function processFileRecords()
                {
                    let moreRecords: Boolean = processRecord(aValues[recordIndex], inputDiv, outputDiv);
                    fileProgress.value = ++recordIndex;
                    if (moreRecords == true && recordIndex < maxRecords) window.setTimeout(processFileRecords, 0);
                    else displayAnswer(<HTMLDivElement> document.getElementById("answer"));
                }, 0);
            }
            fr.readAsText(file);
        }
        else alert("No file selected");
    }
}

let answer: number = 0;
let column: number = 0;

function initAnswer()
{
    answer = 0;
    column = 0;
}

function processRecord(record: string, inputDisplay: HTMLDivElement, outputDisplay: HTMLDivElement)
{
    if (record.charCodeAt(record.length - 1) == 13) record = record.substr(0, record.length - 1);
    inputDisplay.innerText = record;
    if (record.length > 0)
    {
        if (record[column] == "#") { answer++; outputDisplay.innerText = "Tree"; }
        else outputDisplay.innerText = "No tree";
        column += 3;
        if (column >= record.length) column -= record.length;
    }
    return true;
}

function displayAnswer(answerDisplay: HTMLDivElement)
{
    answerDisplay.innerText = `Ran into ${answer} trees`;
}

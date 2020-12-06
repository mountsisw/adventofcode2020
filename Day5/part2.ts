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
                document.getElementById("answer").innerText = "";
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

let answer: number;
let seatNumbers: Array<number>;

function initAnswer()
{
    answer = 0;
    seatNumbers = new Array();
}

function processRecord(record: string, inputDisplay: HTMLDivElement, outputDisplay: HTMLDivElement)
{
    if (record.charCodeAt(record.length - 1) == 13) record = record.substr(0, record.length - 1);
    if (record.length > 0)
    {
        inputDisplay.innerText = record;
        let rowMin = 0, rowMax = 127, rows = 64;
        let loop2 = 0;
        for (; loop2 < 7; loop2++, rows /= 2)
        {
            if (record.charAt(loop2) == "F") rowMax -= rows;
            else rowMin += rows;
        }
        let colMin = 0, colMax = 7, columns = 4;
        for (; loop2 < 10; loop2++, columns /= 2)
        {
            if (record.charAt(loop2) == "L") colMax -= columns;
            else colMin += columns;
        }
        let ID = (rowMin * 8) + colMin;
        outputDisplay.innerText = String(ID);
        seatNumbers.push(ID);
    }
    return true;
}

function displayAnswer(answerDisplay: HTMLDivElement)
{
    seatNumbers.sort((a, b) => { return a - b; } );
    for (let nLoop: number = 0; nLoop < seatNumbers.length - 1; nLoop++)
        if (seatNumbers[nLoop] + 2 == seatNumbers[nLoop + 1])
        {
            answerDisplay.innerText = `My seat ID is ${seatNumbers[nLoop] + 1}`;
            return;
        }
    answerDisplay.innerText = "Did not find an empty seat with two neighbors!";
}
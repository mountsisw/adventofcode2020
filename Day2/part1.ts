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

function processRecord(record: string, inputDisplay: HTMLDivElement, outputDisplay: HTMLDivElement)
{
    if (record.length > 0)
    {
        inputDisplay.innerText = record;
        let fields: Array<string> = record.split(" ");
        let minMax: Array<string> = fields[0].split("-");
        let charCount: number = 0;
        for (let nLoop = 0; nLoop < fields[2].length; nLoop++) if (fields[2].charAt(nLoop) == fields[1][0]) charCount++;
        if (charCount >= Number(minMax[0]) && charCount <= Number(minMax[1]))
        { answer++; outputDisplay.innerText = "Valid"; }
        else outputDisplay.innerText = "Invalid";
    }
    return true;
}

function displayAnswer(answerDisplay: HTMLDivElement)
{
    answerDisplay.innerText = `${answer} passports are valid`;
}

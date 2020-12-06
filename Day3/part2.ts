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

class Toboggan
{
    private column: number;
    private row: number;

    constructor(private colSlope: number, private rowSlope: number)
    {
        this.column = 0;
        this.row = 0;
    }

    public checkForTree(ground) : Boolean
    {
        let retVal: Boolean = false;
        if (this.row % this.rowSlope == 0)
        {
            retVal = ground[this.column] == "#";
            this.column += this.colSlope;
            if (this.column >= ground.length) this.column -= ground.length;
        }
        this.row++;
        return retVal;
    }
}

let toboggans: Array<any> = new Array();

function initAnswer()
{
    toboggans = [];
    toboggans.push({toboggan: new Toboggan(1, 1), trees: 0});
    toboggans.push({toboggan: new Toboggan(3, 1), trees: 0});
    toboggans.push({toboggan: new Toboggan(5, 1), trees: 0});
    toboggans.push({toboggan: new Toboggan(7, 1), trees: 0});
    toboggans.push({toboggan: new Toboggan(1, 2), trees: 0});
}

function processRecord(record: string, inputDisplay: HTMLDivElement, outputDisplay: HTMLDivElement)
{
    if (record.charCodeAt(record.length - 1) == 13) record = record.substr(0, record.length - 1);
    inputDisplay.innerText = record;
    if (record.length > 0)
    {
        for (let nLoop: number = 0; nLoop < toboggans.length; nLoop++)
            if (toboggans[nLoop].toboggan.checkForTree(record)) toboggans[nLoop].trees++;
    }
    return true;
}

function displayAnswer(answerDisplay: HTMLDivElement)
{
    let answer = 1;
    for (let nLoop: number = 0; nLoop < toboggans.length; nLoop++)
    {
        console.log(toboggans[nLoop].trees);
        answer *= toboggans[nLoop].trees;
    }
    answerDisplay.innerText = `${answer}`;
}

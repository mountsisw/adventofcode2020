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
let passport: Passport;

function initAnswer()
{
    answer = 0;
    passport = new Passport();
}

class Passport
{
    public elements: Map<string, boolean> = new Map();
    public text: string = "";

    constructor ()
    {
        this.elements.set("byr", false);
        this.elements.set("iyr", false);
        this.elements.set("eyr", false);
        this.elements.set("hgt", false);
        this.elements.set("hcl", false);
        this.elements.set("ecl", false);
        this.elements.set("pid", false);
    }
}

function processRecord(record: string, inputDisplay: HTMLDivElement, outputDisplay: HTMLDivElement)
{
    if (record.charCodeAt(record.length - 1) == 13) record = record.substr(0, record.length - 1);
    if (record.length > 0)
    {
        let fields = record.split(" ");
        for (let nLoop: number = 0; nLoop < fields.length; nLoop++)
        {
            let key = fields[nLoop].substr(0, 3);
            if (passport.elements.has(key)) passport.elements.delete(key);
        }
        passport.text += record + " ";
    }
    else
    {
        inputDisplay.innerText = passport.text;
        if (passport.elements.size > 0) outputDisplay.innerText = "Invalid";
        else { outputDisplay.innerText = "Valid"; answer++; }
        passport = new Passport();
    }
    return true;
}

function displayAnswer(answerDisplay: HTMLDivElement)
{
    if (passport.elements.size == 0) answer++;
    answerDisplay.innerText = `Found ${answer} valid passports`;
}

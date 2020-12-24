// @ts-check

export function doPart(part: PuzzlePart)
{
    let fileChooser: HTMLInputElement = <HTMLInputElement> document.getElementById("puzzleInput");
    let fileProgress: HTMLProgressElement = <HTMLProgressElement> document.getElementById("fileProgress");
    fileChooser.onchange = function (event)
    {
        if (fileChooser.files.length > 0)
        {
            let file: File = fileChooser.files[0];
            document.getElementById("fileName").innerText = " => " + file.name + ", " + file.type;
            let haveStatus: boolean = document.getElementById("status") != null;
            if (haveStatus)
            {
                document.getElementById("reading").className = "puzzle";
                document.getElementById("solving").className = "";
                document.getElementById("done").className = "";
            }
            let fr: FileReader = new FileReader();
            fr.onloadend = function ()
            {
                let aValues: Array<string> = (<String> fr.result).split("\n");
                let maxRecords: number = aValues.length;
                document.getElementById("recordCount").innerText = String(maxRecords) + " records";
                document.getElementById("answer").innerText = "";
                fileProgress.max = maxRecords;
                let recordIndex: number = 0;
                part.init(<HTMLDivElement> document.getElementById("input"),
                    <HTMLDivElement> document.getElementById("output"),
                    <HTMLDivElement> document.getElementById("answer"));
                window.setTimeout(function processFileRecords()
                {
                    let recordLength = aValues[recordIndex].length;
                    let record = aValues[recordIndex].charCodeAt(recordLength - 1) == 13 ?
                        aValues[recordIndex].substr(0, recordLength - 1) : aValues[recordIndex];
                    let moreRecords: boolean = part.processRecord(record);
                    fileProgress.value = ++recordIndex;
                    if (moreRecords == true && recordIndex < maxRecords) window.setTimeout(processFileRecords, 0);
                    else
                    {
                        if (haveStatus)
                        {
                            document.getElementById("reading").className = "";
                            document.getElementById("solving").className = "puzzle";
                        }
                        window.setTimeout(function ()
                        {
                            part.displayAnswer();
                            if (haveStatus)
                            {
                                document.getElementById("solving").className = "";
                                document.getElementById("done").className = "puzzle";
                            }
                        }, 0);
                    }
                }, 0);
            }
            fr.readAsText(file);
        }
        else alert("No file selected");
    }
}

export abstract class PuzzlePart
{
    protected inputDisplay: HTMLDivElement;
    protected outputDisplay: HTMLDivElement;
    protected answerDisplay: HTMLDivElement;

    public init(inputElement: HTMLDivElement, outputElement: HTMLDivElement, answerElement: HTMLDivElement)
    {
        this.inputDisplay = inputElement;
        this.outputDisplay = outputElement;
        this.answerDisplay = answerElement;
    }
    public processRecord(record: string) : boolean { return true; }
    public displayAnswer() {}
}
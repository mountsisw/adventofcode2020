// @ts-check
export function doPart(part) {
    let fileChooser = document.getElementById("puzzleInput");
    let fileProgress = document.getElementById("fileProgress");
    fileChooser.onchange = function (event) {
        if (fileChooser.files.length > 0) {
            let file = fileChooser.files[0];
            document.getElementById("fileName").innerText = " => " + file.name + ", " + file.type;
            let haveStatus = document.getElementById("status") != null;
            if (haveStatus) {
                document.getElementById("reading").className = "puzzle";
                document.getElementById("solving").className = "";
                document.getElementById("done").className = "";
            }
            let fr = new FileReader();
            fr.onloadend = function () {
                let aValues = fr.result.split("\n");
                let maxRecords = aValues.length;
                document.getElementById("recordCount").innerText = String(maxRecords) + " records";
                document.getElementById("answer").innerText = "";
                fileProgress.max = maxRecords;
                let recordIndex = 0;
                part.init(document.getElementById("input"), document.getElementById("output"), document.getElementById("answer"));
                window.setTimeout(function processFileRecords() {
                    let recordLength = aValues[recordIndex].length;
                    let record = aValues[recordIndex].charCodeAt(recordLength - 1) == 13 ?
                        aValues[recordIndex].substr(0, recordLength - 1) : aValues[recordIndex];
                    let moreRecords = part.processRecord(record);
                    fileProgress.value = ++recordIndex;
                    if (moreRecords == true && recordIndex < maxRecords)
                        window.setTimeout(processFileRecords, 0);
                    else {
                        if (haveStatus) {
                            document.getElementById("reading").className = "";
                            document.getElementById("solving").className = "puzzle";
                        }
                        window.setTimeout(function () {
                            part.displayAnswer();
                            if (haveStatus) {
                                document.getElementById("solving").className = "";
                                document.getElementById("done").className = "puzzle";
                            }
                        }, 0);
                    }
                }, 0);
            };
            fr.readAsText(file);
        }
        else
            alert("No file selected");
    };
}
export class PuzzlePart {
    init(inputElement, outputElement, answerElement) {
        this.inputDisplay = inputElement;
        this.outputDisplay = outputElement;
        this.answerDisplay = answerElement;
    }
    processRecord(record) { return true; }
    displayAnswer() { }
}

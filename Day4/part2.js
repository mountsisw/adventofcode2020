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
let passport;
function initAnswer() {
    answer = 0;
    passport = new Passport();
}
class Passport {
    constructor() {
        this.elements = new Map();
        this.text = "";
        this.elements.set("byr", false);
        this.elements.set("iyr", false);
        this.elements.set("eyr", false);
        this.elements.set("hgt", false);
        this.elements.set("hcl", false);
        this.elements.set("ecl", false);
        this.elements.set("pid", false);
    }
    validate(key, value) {
        if (key == "byr") {
            if (value.length == 4) {
                let year = Number(value);
                return year >= 1920 && year <= 2002;
            }
        }
        else if (key == "iyr") {
            if (value.length == 4) {
                let year = Number(value);
                return year >= 2010 && year <= 2020;
            }
        }
        else if (key == "eyr") {
            if (value.length == 4) {
                let year = Number(value);
                return year >= 2020 && year <= 2030;
            }
        }
        else if (key == "hgt") {
            let units = value.substr(-2);
            let height = Number(value.substr(0, value.length - 2));
            if (units == "cm")
                return height >= 150 && height <= 193;
            else
                return height >= 59 && height <= 76;
        }
        else if (key == "hcl") {
            return value.match(/#[0-9a-f]{6}/) ? true : false;
        }
        else if (key == "ecl") {
            let colors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
            return colors.includes(value);
        }
        else if (key == "pid") {
            if (value.length == 9)
                return value.match(/[0-9]{9}/) ? true : false;
        }
        return false;
    }
}
function processRecord(record, inputDisplay, outputDisplay) {
    if (record.charCodeAt(record.length - 1) == 13)
        record = record.substr(0, record.length - 1);
    if (record.length > 0) {
        let fields = record.split(" ");
        for (let nLoop = 0; nLoop < fields.length; nLoop++) {
            let key = fields[nLoop].substr(0, 3);
            if (passport.validate(key, fields[nLoop].substr(4)))
                passport.elements.delete(key);
        }
        passport.text += record + " ";
    }
    else {
        inputDisplay.innerText = passport.text;
        if (passport.elements.size > 0)
            outputDisplay.innerText = "Invalid";
        else {
            outputDisplay.innerText = "Valid";
            answer++;
        }
        passport = new Passport();
    }
    return true;
}
function displayAnswer(answerDisplay) {
    if (passport.elements.size == 0)
        answer++;
    answerDisplay.innerText = `Found ${answer} valid passports`;
}

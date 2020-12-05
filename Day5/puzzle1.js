window.onload = init;

let aValues = new Array();

function init()
{
    loadValues();
    let inputDiv = document.getElementById("input");
    appendToGrid(inputDiv, "Code");
    appendToGrid(inputDiv, "Row");
    appendToGrid(inputDiv, "Column");
    appendToGrid(inputDiv, "Seat");
    let maxID = -1;
    for (let loop1 = 0; loop1 < aValues.length; loop1++)
    {
        appendToGrid(inputDiv, aValues[loop1]);
        let rowMin = 0, rowMax = 127, rows = 64;
        let loop2 = 0;
        for (; loop2 < 7; loop2++, rows /= 2)
        {
            if (aValues[loop1].charAt(loop2) == "F") rowMax -= rows;
            else rowMin += rows;
        }
        appendToGrid(inputDiv, rowMin);
        let colMin = 0, colMax = 7, columns = 4;
        for (; loop2 < 10; loop2++, columns /= 2)
        {
            if (aValues[loop1].charAt(loop2) == "L") colMax -= columns;
            else colMin += columns;
        }
        appendToGrid(inputDiv, colMin);
        let ID = (rowMin * 8) + colMin;
        appendToGrid(inputDiv, ID);
        maxID = Math.max(maxID, ID);
    }
    document.getElementById("output").innerText = "Max ID is " + String(maxID);
}

function appendToGrid(div, string)
{
    let newDiv = document.createElement("div");
    newDiv.innerText = string;
    div.append(newDiv);
}

function loadValues()
{
aValues = [
    "BFBFFBBRLR",
    "FBFBFFBRLL",
    "BFBFBFFRLR",
    "BFFBFBFRLL",
    "FFBFFFBRLL",
    "BFBFFFFLRR",
    "BFBFBFBRRL",
    "BFBFFFBLRL",
    "BFFBBBBRLR",
    "BFFBFFFLRL",
    "BFBFBFBLRR",
    "FBFFBFBRLL",
    "BFFFFBBLRL",
    "FBFBFBBLLL",
    "FFFBFBBLRR",
    "FBFFFBFRLL",
    "FFFBBFBLLL",
    "BFFBBFFRRR",
    "BFFBBFBLRL",
    "BFFFBBBRLR",
    "BFFBFFBLRR",
    "FFBBFFFLRL",
    "BFBBBBBRLR",
    "BFBFBBBRRR",
    "FBFFBFBLRR",
    "FBBFBBBRLR",
    "FBFFFBBLLR",
    "BFFBBBBRRR",
    "BFBFBFFRLL",
    "FFFBFBFLLL",
    "BBFFFBBRLR",
    "BFBFFFFRLR",
    "BFBBBFBLRL",
    "FBBBBFFRLR",
    "FFBBBBFRRR",
    "FBFBFFFLRR",
    "FFFBFFBLRL",
    "BFFFFBBLRR",
    "FFBFFFBLLR",
    "FBFFFFFRLL",
    "BFFFFBFLRR",
    "BBFFFFFLLL",
    "FBFFBBBRLL",
    "FBFFFFBLLR",
    "BFFFFFBRRR",
    "BFBFFFFRRL",
    "FBBBBFBRRR",
    "FBFBFFFLLL",
    "FBFFFFBRRL",
    "FFBBFFBRRR",
    "FBFFBBFLLL",
    "FFBFBBBRLL",
    "BFBFFFFLRL",
    "FFBFFFFLRL",
    "BFBFFFBRLR",
    "FFFBFBFRRR",
    "BFBFBBFRLL",
    "FFBFFBBLRR",
    "FBBFBBBRRL",
    "FFBBFFBRLL",
    "FBFBBBBRRR",
    "BFBBFFBLLL",
    "BFBFBBBRLR",
    "FFBBFBBLLL",
    "BBFFBBBLRL",
    "FBFBBBBLRL",
    "FBFFFBFLLR",
    "FFFBFBBLRL",
    "FBBBFFBLLL",
    "FFBFBBFLLR",
    "FBFFFFBLRR",
    "FFBBFBBRLR",
    "BBFFFBBRRR",
    "BFBFFBFRRL",
    "FFBFBBFRRR",
    "BFFFFFFLLR",
    "BBFFFFFRRR",
    "BFBBBFFLRL",
    "FBBFFFBLLR",
    "FFBFBFFRLL",
    "FBFBFBFLRR",
    "BFBBBBFLLR",
    "FBBBBFBRRL",
    "FFBBBBFRLL",
    "FFBBBFBRLR",
    "BBFFFBBLLL",
    "BFFFBBFLLL",
    "FFBFBBFLLL",
    "FFBFFFFLLL",
    "FFBFBFBRLR",
    "BFBBBFFLLR",
    "FFFBFBFLRL",
    "BBFFBBFLLL",
    "FFBFBFBLRR",
    "FFBFFBFRLR",
    "FBFBFFBRRR",
    "FFBFBFFLRR",
    "BFBFBBBLLR",
    "FFFBBFFLRR",
    "BFFBFBFLRL",
    "BFBBFFFLLR",
    "BBFFBBFLLR",
    "BFFFBBFLRL",
    "BFBBFBBRRR",
    "BFFBBBFLRL",
    "FBBBFBFRLL",
    "BFFBFFFLLR",
    "BFBFFBFLLL",
    "BFFBBBFLRR",
    "BFBBFFBRLL",
    "FBBFFFBRRR",
    "BFBBFBFRRL",
    "FFFBBFFLLR",
    "FBBFFBBLLL",
    "FFBBFBFRRR",
    "BBFFFFFLLR",
    "FFBFBFBRLL",
    "FFFBBBFRLR",
    "BFFBBFBLRR",
    "FBFBBBFLRR",
    "FBBBBBBLRR",
    "BBFFBFFRRL",
    "FBFBBBFRRR",
    "FFBFFFBLLL",
    "FBBFBFBLRL",
    "BFBBFBBLLR",
    "BFBBBBFLLL",
    "BFBBBBBLLR",
    "FBBBFFFRRR",
    "BFFBBFBRLR",
    "BFBBFBFLRL",
    "BFBBFFFRLL",
    "FBBFBFFLRL",
    "FBFFFFBLLL",
    "BFBBBBBLRR",
    "FBBBFBFLRL",
    "BFBFBBFLRL",
    "FFBBFFFLLR",
    "FFBBBBBLRR",
    "FBBBBBFLLR",
    "FBBBFBFRRR",
    "FBBFBFFLLL",
    "BBFFFBBLRR",
    "FFFBFFBLLR",
    "BBFFFBBRRL",
    "FBBBFBFLLL",
    "BFFFBBFRRR",
    "FFFBFFFRRL",
    "FFFBBBBRRR",
    "FBBBFBBRRL",
    "BFFBBBBLRL",
    "FFBBBFBRLL",
    "BFFFFFBLRR",
    "FFBFFBFRRL",
    "FBBBBFFLLR",
    "FBBFBFFRRL",
    "FBFBBBFRRL",
    "FFBFFBBRRL",
    "FBFFFFBRLL",
    "FFBFBFFLLR",
    "BFBBBFFRLR",
    "BFBBFFBRRL",
    "FFBBFFBLLR",
    "BFFBBBFRLR",
    "FFBBFBBLRR",
    "FBFBBBBLLR",
    "FFBFBFFRRR",
    "BFBFBFBRRR",
    "FFFBFFBRRL",
    "BFFFBBFRLL",
    "BFBBFBFRLL",
    "FBBFFBFRRL",
    "FBBFFFBRRL",
    "BFFFBFBRRR",
    "BFFFFFBLLL",
    "FBBFFBBRRL",
    "BFFFBBFRLR",
    "FBFFBBFRLR",
    "FFFBBBBLRL",
    "BFFBFFBRRL",
    "FBFBBBBRRL",
    "FBBFBFFLRR",
    "BFBBBBBLRL",
    "BFFBFBBRRL",
    "BBFFBFFRRR",
    "FBBBFFBRLL",
    "FBBFFBBLRL",
    "FBFBBFBRRL",
    "BBFFBBFRRL",
    "BFBFFFFLLL",
    "BFFFFFBRRL",
    "FFBFFFBRLR",
    "BFFFBFFRLR",
    "FBFBFFFRLR",
    "FFBBFBFLLR",
    "FBBBFBBLLL",
    "FFBBFBBRRL",
    "BFFBBFBLLR",
    "FFBBBBFLRL",
    "BFFBBBFRRR",
    "BFFFFBBLLL",
    "FFBBBFFLRR",
    "FBFFFBBLRL",
    "FBBFBBFRLL",
    "BFBBFBFLLR",
    "FBFFBBFLRL",
    "FFBBBBBLLL",
    "FFBFFBFLLR",
    "FBBBFFFRLL",
    "BFFBBFFRLL",
    "FFBBBBFRLR",
    "FBBFFBFRLR",
    "BFBBBBFRLL",
    "BFFFBFBRLR",
    "BFBFBBFLLR",
    "FBFFFFFRRL",
    "BFBBBFFLLL",
    "BFFBFBBLRL",
    "FBBFFFBLRR",
    "BFFFFFBRLR",
    "FBBBBBBLLR",
    "FBFFBFBLLL",
    "FBFBFBFRLR",
    "FBFFBBBLLL",
    "BFFBBBFLLR",
    "FBBFBBFRLR",
    "FFFBBBFRLL",
    "FFBFBBFRLL",
    "BBFFFFBLLR",
    "FBFFBFFLRR",
    "BFFBBFFLLL",
    "BBFFFBBRLL",
    "FFFBFBBLLL",
    "BFFFFFFRRL",
    "BFBFBBBRLL",
    "FBFFBBBRRR",
    "BFFFBBFLRR",
    "FBBFBBFLLL",
    "FBBFBFFRLR",
    "FBFFFBFRLR",
    "BBFFBFBLRL",
    "FFBBBBBRLL",
    "FBFBFFFLLR",
    "BFFFFFFRLR",
    "FFBBFFBLRR",
    "FFFBBFFRRR",
    "FBBBFFFLLR",
    "FBFBBBBRLL",
    "BBFFFFFLRR",
    "FFBFFBBRLR",
    "FFBBFFFLRR",
    "BFFBFBFLRR",
    "BFFBFBBRLL",
    "FBFBFFBRLR",
    "BFFBFBBLLL",
    "BFBBFFFLRL",
    "FBBBFBBRLR",
    "FFFBBBFLRL",
    "FFBFFBBRRR",
    "FBFBBBBRLR",
    "FFFBBFFRLR",
    "BFBFFFBLLR",
    "BFBFBBFLLL",
    "FBFFBBFRRR",
    "FBBFBBFLLR",
    "FBBBBFFRRL",
    "BFFBBBBLLL",
    "FFBBBBBRLR",
    "BFFFBFFLRR",
    "BFFFBBFLLR",
    "FBFBBFFLLL",
    "BBFFFBFRLL",
    "BFBFFBFLLR",
    "FFBFFBFLRR",
    "BFBBBBFLRL",
    "FBFBBFFLRL",
    "FFBBFBFLLL",
    "FBFBBFFLLR",
    "FBFFFBFLRR",
    "FBBBBBFRLL",
    "FBFBBFBRRR",
    "FFBBFBBRLL",
    "BBFFFFBLRR",
    "BFFBBFFLLR",
    "FBBBBFBLLL",
    "BFBFBFBRLL",
    "FFFBFBBLLR",
    "FBFFBBBRLR",
    "BBFFFFBRRL",
    "FFBBBBFLLL",
    "FBFBFBBLRL",
    "FBFBBFFRRL",
    "FBBFBBBLLR",
    "BFFFFFBLRL",
    "FFBFBBBRRL",
    "FFBFBBBLLL",
    "FBBBBFBLLR",
    "FBFBFFFRRL",
    "BFBBBBBRRR",
    "FBBBFFBRRR",
    "BFBFFBBLLR",
    "FBFFBBFLRR",
    "FFBFFFFLRR",
    "FBFFFFFRLR",
    "FBBBBBBRRR",
    "BFFFBFFLLR",
    "FFBBBFBLLL",
    "BFFFBFFRRL",
    "FFFBFFBRRR",
    "BFFFFFBLLR",
    "BFBFBFFLLR",
    "FBBBBBBRLL",
    "FFBFFFFRRR",
    "FBBFFBFRLL",
    "FBBFFFBLRL",
    "BFFFFBFLRL",
    "FBFBBBFRLL",
    "BBFFBBFLRR",
    "FFFBBFFRLL",
    "FBBFFBFLLR",
    "BFFFFFFRRR",
    "FFBFBFBLRL",
    "BFFBFBFRRL",
    "BBFFFFBLLL",
    "FFBBBFBRRL",
    "FBFBBFBRLL",
    "BFBBFBBRRL",
    "BFBFFBBRRL",
    "FFFBBFBLLR",
    "FFBFBBBRRR",
    "FBBFFBFRRR",
    "BFFFFFBRLL",
    "FFFBBBBLLR",
    "BFBBFBBLLL",
    "FFBBFBFLRR",
    "BFBBFFBRLR",
    "FBBBFFBRLR",
    "BFFFBFFLLL",
    "BFBBFBFLLL",
    "FBBFBBBLLL",
    "BFBFBBFRRL",
    "BFFFBBBLRL",
    "BFBFBFFLRR",
    "FBBFBFBRLR",
    "FBFBFFBLRR",
    "BBFFFBFRRR",
    "BFBFFBFRLL",
    "BFBBBFBLRR",
    "FBBBFFBRRL",
    "FBFFFBBRRL",
    "FBBBBFBLRR",
    "BFFBBBFRRL",
    "BBFFBFBRLR",
    "BBFFBBFRRR",
    "BFBFFFBLLL",
    "BFBBFFBLRR",
    "FBFBBFBLLR",
    "FFFBBFFLLL",
    "FFBBFBBRRR",
    "BFBBBBFRLR",
    "FBBBFFFLRL",
    "FFFBBFFLRL",
    "BFBBBFFRRL",
    "BBFFBFBLLR",
    "BFFBFBFRLR",
    "BFBBFFFLLL",
    "BFFFBFBLLL",
    "FBFFBFFRLR",
    "BFFFBFBLRR",
    "FFBBFFFLLL",
    "BFBBBFBRRL",
    "FBBBFFFLRR",
    "FBFFBFFLLL",
    "BFFBBBBLRR",
    "FBBFBBBLRL",
    "BBFFFBBLLR",
    "FBFBBBFRLR",
    "FFFBFBFRRL",
    "FBBFBFBLLR",
    "FBFBFBFRRR",
    "BFFFBBBLLR",
    "BFFFBBBLLL",
    "FBBFBFFRLL",
    "FFFBFBFLRR",
    "BFBBFBBRLL",
    "BFBBBFBLLR",
    "BFFBFFBLLR",
    "BFFFFBBRLR",
    "BFFFBFBRRL",
    "BBFFFBFRLR",
    "BFFBFFBLRL",
    "FBBBFBBLLR",
    "BFFBFFBLLL",
    "BBFFBBFRLR",
    "FFBFBBFLRL",
    "FBBBBBFRRL",
    "BFFBBFFRRL",
    "BFFFFBFLLR",
    "FBFBBBFLRL",
    "BFFFBFBLLR",
    "FBFBBFBLLL",
    "FFBBFBFRRL",
    "FFBBBBBRRR",
    "FBFFFBFLLL",
    "BFBFBFBRLR",
    "FBFFBBBLRL",
    "FBBFFBFLRL",
    "FFBBBFBLLR",
    "FBFFBFFRRR",
    "BFBBFBFRRR",
    "BFFBFBFLLL",
    "BFFBFFBRRR",
    "BBFFBBFRLL",
    "FBBFFFFLLR",
    "FBBFFBFLRR",
    "BFFFBBBRLL",
    "FBBBFFBLRR",
    "FFFBFBFRLR",
    "FFBFBFFRRL",
    "FFBBFFBRLR",
    "FBBBBFBLRL",
    "FBFFBFFLRL",
    "BFFBFFFRRR",
    "BFFFFBFLLL",
    "FFBFBBBLLR",
    "FFBBBFFLRL",
    "BFBFFFBRRL",
    "FBBBBFFRRR",
    "BFFFBBBLRR",
    "BFBBBFBRRR",
    "FBBBBFBRLR",
    "FBFBBFBRLR",
    "FFBFFBBLRL",
    "FBBBFFBLRL",
    "BFBFFFBLRR",
    "FBBBFBBLRR",
    "BFFFFBBRRL",
    "BBFFFBBLRL",
    "FFFBFFBRLR",
    "FBFFBFFRRL",
    "FFFBFFBLLL",
    "FBBFBBBRLL",
    "FBBBFBBLRL",
    "BFBFFBBLRR",
    "FFBBBBBRRL",
    "BFFBBFBRLL",
    "BBFFBFFLRL",
    "FBFFFBFLRL",
    "BFBFBFFRRR",
    "FBBBBFFLRL",
    "FBFFFBBRLR",
    "BFBBBBFLRR",
    "BFFFFBBRRR",
    "BFBBFBFRLR",
    "BFFBFBBRRR",
    "BFFFBFFRLL",
    "FFFBBFBRLR",
    "BBFFFFBRRR",
    "FBBBBBBLRL",
    "FFFBBBFRRL",
    "FFBBFFFRRL",
    "BBFFFFFRRL",
    "FBBBFFFRLR",
    "FBBFBFBLLL",
    "FFFBFBBRRR",
    "FBBBBBBRLR",
    "FBFBFBBRLR",
    "FFBBBFBLRR",
    "FFBBFFBLLL",
    "FFFBFBBRRL",
    "FFBFBBBLRR",
    "FFBFBBBLRL",
    "FFBBFBFRLR",
    "FFBFBFBLLL",
    "FFFBBBFLLR",
    "FFFBBBBRRL",
    "FFBBFBBLLR",
    "FBBFBFBRLL",
    "FFBFBFFLLL",
    "FFBBBBFLRR",
    "FBFBFBFLLL",
    "FBFFFBFRRR",
    "FBBBBBFLRL",
    "FBFBFBBRLL",
    "FFBFFFBRRL",
    "FBBFBFBLRR",
    "FFBFFFBLRR",
    "FFBFFFFRRL",
    "BFBBFBBLRL",
    "FBBBBFFRLL",
    "BFBBFBBRLR",
    "BFFBFFFRLR",
    "FBBFFFBRLR",
    "FBFFFFFRRR",
    "FBFFFFFLRL",
    "BFFFFBFRRR",
    "BFFFFFFLRR",
    "BFFFBFFRRR",
    "FFBBFFBRRL",
    "FBFBBBBLLL",
    "FFBFFBFRLL",
    "FFBBBFFRRR",
    "FFBBBBBLRL",
    "FBBBBBFLRR",
    "FFFBFBFLLR",
    "BFFFFBBRLL",
    "FBFFBFBLRL",
    "FBFBFFFLRL",
    "FBFFBBFRLL",
    "FBFFBFBRLR",
    "FBBBFBFRLR",
    "BBFFFFBLRL",
    "FFBFFBFLRL",
    "BFFFBBFRRL",
    "BFBFFFFLLR",
    "BFFBBBFLLL",
    "BBFFFBFRRL",
    "FFBBFFFRRR",
    "BFFFFBFRLL",
    "FFBFBFFLRL",
    "FBFBFFBLLL",
    "BFFFFBFRRL",
    "FFFBFBBRLL",
    "FBFFBBBLRR",
    "BFBBBBBRLL",
    "BFBBFFFRRL",
    "BFBFFFBRRR",
    "FBBBBBBLLL",
    "BFFFFBFRLR",
    "BFBBFFBRRR",
    "FBBBFBBRRR",
    "FFBFFBBRLL",
    "FBFBFBBLRR",
    "FFFBBBBLLL",
    "FBFBBBFLLL",
    "BFFBFFBRLL",
    "BFBFBBFLRR",
    "FFFBFBBRLR",
    "BBFFBFFRLR",
    "FBFBFBFLLR",
    "BFBBBBFRRR",
    "FBFBFBFRLL",
    "BFBFFBBRLL",
    "FFBFFFBLRL",
    "FBBBFFFLLL",
    "BFFBBFFLRR",
    "FBBFFBBLLR",
    "FFFBBBFLLL",
    "FBBFBFFRRR",
    "FBBFFBBRRR",
    "FFBFBFBRRL",
    "FBBFFFBRLL",
    "FBFBFFBRRL",
    "BFBFBBFRRR",
    "BBFFBBBLLL",
    "FFBFFBBLLR",
    "BFBFBFBLLR",
    "FFBBFFFRLL",
    "FBBBFBFRRL",
    "FFBBBFFLLR",
    "FFFBFFBLRR",
    "FBBFFFBLLL",
    "BBFFFFFRLL",
    "BFFFBFFLRL",
    "FBFFBBFRRL",
    "FFBFBBFRLR",
    "BBFFFFBRLL",
    "BFBBFBFLRR",
    "BFBFBFBLLL",
    "FFBBBFBLRL",
    "FBBFBBBRRR",
    "FBBFFFFRLL",
    "BFBBBBBRRL",
    "FBBFBBFRRL",
    "FBFBBBFLLR",
    "BFBFBFBLRL",
    "BBFFBFFLLL",
    "BFFBFFBRLR",
    "BFBFFBFLRL",
    "BFBFBBFRLR",
    "FBBFFBBLRR",
    "BFBFFBBRRR",
    "BFFFBBBRRR",
    "FBBFFFFRRR",
    "FBBFFFFLRL",
    "BFBFFBFLRR",
    "FBBBBFFLRR",
    "FFFBFFFRRR",
    "BFBFBBBLRL",
    "FBFFFFFLRR",
    "BFBBBFFLRR",
    "FBFFBBFLLR",
    "BBFFFBFLRR",
    "BFFBFBFLLR",
    "BBFFBFFLLR",
    "BFBBFFFRLR",
    "BBFFFBFLLL",
    "FFBFFFFRLR",
    "BFFBFBBRLR",
    "FBBFBBBLRR",
    "FBFBFFFRRR",
    "FBFBBFFRRR",
    "BFBFBBBLRR",
    "FBBFFFFRLR",
    "BBFFBFBRLL",
    "FFFBBBBRLR",
    "FFBFBFBLLR",
    "FBFBBFBLRL",
    "FFBFBFBRRR",
    "BFBFBFFLRL",
    "BFBFBBBLLL",
    "FBBBBFFLLL",
    "FFBBFFBLRL",
    "BFBBFBBLRR",
    "FFFBBBBRLL",
    "BFFBFFFLLL",
    "FFBFFFFLLR",
    "BBFFFBFLRL",
    "FBBBBBFLLL",
    "FBBFBFBRRR",
    "BFFBFBBLLR",
    "FBFFBFFRLL",
    "FFFBBFBRRL",
    "FBFFFBBLRR",
    "FFFBFBFRLL",
    "FBFBBBBLRR",
    "FBFBFFBLRL",
    "FBBFBBFLRL",
    "BBFFBBBLLR",
    "FFBBBBBLLR",
    "BFFFFFFRLL",
    "FFBBFBBLRL",
    "BFFBFBBLRR",
    "BFFFFFFLRL",
    "FBFFBFBRRR",
    "BFBBBFFRRR",
    "FFBFBBBRLR",
    "FFBFFFBRRR",
    "FBFBFBFRRL",
    "FBFBFBBRRL",
    "BFFFFFFLLL",
    "FFBFBBFRRL",
    "BBFFFBFLLR",
    "FBFFBBBLLR",
    "FBFBFBFLRL",
    "BBFFBFBRRL",
    "FBFFFFBRRR",
    "BFBFFFBRLL",
    "BFBBFFBLLR",
    "BFFFBFBRLL",
    "FFBBBBFLLR",
    "BFBBBFBLLL",
    "FBBFBBFRRR",
    "BFFBBBBLLR",
    "FFBBBFBRRR",
    "FBBFFBBRLR",
    "FBFFFFFLLR",
    "FBFFFFBRLR",
    "FBBFFFFLRR",
    "FFBBFBFRLL",
    "BFBBBBBLLL",
    "BFBBBFBRLL",
    "FFBBFBFLRL",
    "FBBBBBBRRL",
    "BBFFBFBLLL",
    "BFFBBFFRLR",
    "FFFBBBFLRR",
    "BBFFFFBRLR",
    "BBFFBFBRRR",
    "BFBFFBFRRR",
    "BFBFFFFRRR",
    "FFBFBBFLRR",
    "BBFFBFFRLL",
    "BFBFFFFRLL",
    "BFBBBFBRLR",
    "FBFFFBBLLL",
    "FBFFFBBRRR",
    "BFBFFBBLLL",
    "FFBBBFFLLL",
    "FFBFFBBLLL",
    "FFFBBFBRRR",
    "FBFBFFBLLR",
    "FFBBBFFRRL",
    "FBBFFFFLLL",
    "BBFFFFFLRL",
    "BFBBBBFRRL",
    "FFBBBFFRLL",
    "FBBBBBFRRR",
    "FBFFBFFLLR",
    "BBFFBBFLRL",
    "FFFBBBFRRR",
    "BFFFBFBLRL",
    "BFBFBFFLLL",
    "FBFBFBBRRR",
    "FBBBBBFRLR",
    "BFFBBBBRRL",
    "FBFFBFBRRL",
    "BFFBBFBRRL",
    "BFBBFFBLRL",
    "FBBBFFFRRL",
    "BBFFFFFRLR",
    "FFBFFBFLLL",
    "FBBFBBFLRR",
    "FBBBFBFLLR",
    "BFFFFBBLLR",
    "FBBFFBBRLL",
    "FFFBBFBRLL",
    "FFFBBBBLRR",
    "FBBBBFBRLL",
    "FBFFFBBRLL",
    "FFBBBBFRRL",
    "FBFFFFFLLL",
    "FBBFFFFRRL",
    "BFFFBBBRRL",
    "FBFBFFFRLL",
    "FBBFBFBRRL",
    "FBBFFBFLLL",
    "FBBBFBFLRR",
    "FFBBBFFRLR",
    "FFFBFFBRLL",
    "FFFBBFFRRL",
    "FBFFBFBLLR",
    "FBFBBFFRLL",
    "FBFBBFFLRR",
    "BFBBFFFRRR",
    "FBBBFFBLLR",
    "FBFFFFBLRL",
    "FBBFBFFLLR",
    "FFBFFBFRRR",
    "FBFFBBBRRL",
    "BFBFFBBLRL",
    "BFFBBFBRRR",
    "FFFBBFBLRL",
    "BFBFBBBRRL",
    "FFFBBFBLRR",
    "BFFBBFFLRL",
    "BFBBFFFLRR",
    "FBFBFBBLLR",
    "BFFBFFFRRL",
    "FFBBFFFRLR",
    "BFFBBBBRLL",
    "BBFFBFFLRR",
    "BBFFBFBLRR",
    "FFBFFFFRLL",
    "FFBFBFFRLR",
    "BFFBBFBLLL",
    "FBBBFBBRLL",
    "FBFFFBFRRL",
    "FBFBBFFRLR",
    "FBFBBFBLRR",
    "BFFBFBFRRR",
    "BFBBBFFRLL",
    "BFBFFBFRLR",
    "BFFBFFFLRR",
    "BFFBBBFRLL",
    "BFFBFFFRLL"
];
}
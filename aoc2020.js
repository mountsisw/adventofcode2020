window.onload = init;

let info = new Map();
let solutions = new Map();
solutions.set("1", {part1: "Day1/Puzzle1.html", part2: "Day1/Puzzle2.html"})

function init()
{
    let firstDate = Date.UTC(2020, 10, 29, 5, 0, 0);
    let firstPuzzle = Date.UTC(2020, 11, 1, 5, 0, 0);
    let lastPuzzle = Date.UTC(2020, 11, 25, 5, 0, 0);
    let containerDiv = document.getElementById("days");
    for (let nLoop = 1; nLoop <= 35; nLoop++)
    {
        let cellDiv = document.createElement("div");
        cellDiv.className = "cells";
        let dateDiv = document.createElement("div");
        dateDiv.className = "dates";
        let thisDate = new Date(firstDate);
        let dateString = thisDate.toLocaleDateString('en-US', {timeZone: 'America/New_York', day: 'numeric'});
        dateDiv.innerText = dateString;
        if (firstDate >= firstPuzzle && firstDate <= lastPuzzle)
        {
            dateDiv.className += " puzzle";
            cellDiv.id = dateString;
            cellDiv.onmouseenter = showInfo;
            info.set(dateString, {unlockTime: firstDate, timer: 0, content: dateDiv});
        }
        cellDiv.append(dateDiv);
        containerDiv.append(cellDiv);
        firstDate += 24 * 60 * 60 * 1000;
    }
}

function showInfo(event)
{
    let dateInfo = info.get(event.target.id);
    console.log("Entered " + event.target.id + ": " + dateInfo.unlockTime);
    dateInfo.content.style.display = "none";
    let newDiv = document.createElement("div");
    event.target.append(newDiv);
    if (Date.now() < dateInfo.unlockTime)
    {
        if (dateInfo.timer == 0)
        {
            countdown(newDiv, dateInfo.unlockTime);
            dateInfo.timer = window.setInterval(countdown, 1000, newDiv, dateInfo.unlockTime);
            info.set(event.target.id, dateInfo);
        }
    }
    else
    {
        let anchor = document.createElement("a");
        newDiv.append(anchor);
        anchor.innerText = "Puzzles";
        anchor.href = "https://adventofcode.com/2020/day/" + event.target.id;
        if (solutions.has(event.target.id))
        {
            newDiv.append(document.createElement("br"));
            anchor = document.createElement("a");
            newDiv.append(anchor);
            anchor.innerText = "Part 1 Solution";
            anchor.href = solutions.get(event.target.id).part1;
            newDiv.append(document.createElement("br"));
            anchor = document.createElement("a");
            newDiv.append(anchor);
            anchor.innerText = "Part 2 Solution";
            anchor.href = solutions.get(event.target.id).part2;
        }
    }
    event.target.onmouseleave = function (event) {
        console.log("Left " + event.target.id);
        let dateInfo = info.get(event.target.id);
        if (dateInfo.timer > 0)
        {
            window.clearInterval(dateInfo.timer);
            dateInfo.timer = 0;
            info.set(event.target.id, dateInfo);
        }
        newDiv.remove();
        dateInfo.content.style.display = "";
    }
}

function countdown(target, unlockTime)
{
    let waitTime = unlockTime - Date.now();
    let denom = 24 * 60 * 60 * 1000;
    let days = Math.floor(waitTime / denom);
    let countdown = days > 0 ? String(days) + ":" : "";
    waitTime -= days * denom;
    denom /= 24;
    let hours = Math.floor(waitTime / denom);
    countdown += (hours > 9 ? "" : "0") + String(hours) + ":";
    waitTime -= hours * denom;
    denom /= 60;
    let minutes = Math.floor(waitTime / denom);
    countdown += (minutes > 9 ? "" : "0") + String(minutes) + ":";
    waitTime -= minutes * denom;
    denom /= 60;
    let seconds = Math.ceil(waitTime / denom);
    target.innerText = "Unlocks in " + countdown + (seconds > 9 ? "" : "0") + String(seconds);
}

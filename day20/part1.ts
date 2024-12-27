const inputText: string = await Deno.readTextFile("input.txt");

const map: string[][] = [];

inputText.split("\r\n").map(line => map.push(line.split("")));

const fairTrack: number[][] = [];

const minimumTimeSaving = 100;

let [currentRow, currentColumn] = getStartingPosition(map);
let picoseconds = 0;

while (map[currentRow][currentColumn] !== "E") {
    map[currentRow][currentColumn] = picoseconds.toString();
    picoseconds++;
    fairTrack.push([currentRow, currentColumn]);
    [currentRow, currentColumn] = getNextPosition(currentRow, currentColumn, map);
}

map[currentRow][currentColumn] = picoseconds.toString();
fairTrack.push([currentRow, currentColumn]);

let eligibleCheats = 0;
fairTrack.forEach(([row, column], picoseconds) => {
    // Up
    if (isEligible(picoseconds, row - 2, column, map, minimumTimeSaving)) {
        eligibleCheats++;
    }
    // Right
    if (isEligible(picoseconds, row, column + 2, map, minimumTimeSaving)) {
        eligibleCheats++;
    }
    // Down
    if (isEligible(picoseconds, row + 2, column, map, minimumTimeSaving)) {
        eligibleCheats++;
    }
    // Left
    if (isEligible(picoseconds, row, column - 2, map, minimumTimeSaving)) {
        eligibleCheats++;
    }
});

console.log(eligibleCheats);

function getStartingPosition(map: string[][]): number[] {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === "S") {
                return [i, j];
            }
        }
    }

    throw new Error("Starting position not found")
}

function getNextPosition(currentRow: number, currentColumn: number, map: string[][]): number[] {
    const allowedValues = [".", "E"];

    // Up
    if (allowedValues.includes(map[currentRow - 1][currentColumn])) {
        return [currentRow - 1, currentColumn];
    }
    // Right
    if (allowedValues.includes(map[currentRow][currentColumn + 1])) {
        return [currentRow, currentColumn + 1];
    }
    // Down
    if (allowedValues.includes(map[currentRow + 1][currentColumn])) {
        return [currentRow + 1, currentColumn];
    }
    // Left
    if (allowedValues.includes(map[currentRow][currentColumn - 1])) {
        return [currentRow, currentColumn - 1];
    }

    throw new Error("Next position not found")
}

function isEligible(picosecondsBefore: number, row: number, column: number, map: string[][], minimumTimeSaving: number): boolean {
    return (row > 0 &&
            row < map.length &&
            column > 0 &&
            column < map[0].length &&
            !isNaN(Number(map[row][column])) &&
            Number(map[row][column]) - picosecondsBefore >= (minimumTimeSaving + 1));
}

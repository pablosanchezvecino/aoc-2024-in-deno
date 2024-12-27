const inputText: string = await Deno.readTextFile("input.txt");

const map: string[][] = [];
const antinodes: number[][] = [];

inputText.split("\r\n").map(line => {
    map.push(line.split(""))
});

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length; j++) {
        const symbol = map[i][j];

        if (symbol !== ".") {
            processAntenna(i, j, symbol, map, antinodes);
        }
    }
}

console.log(antinodes.length);

function processAntenna(
    row: number,
    column: number,
    symbol: string,
    map: string[][],
    antinodes: number[][]): void {

    let i = row;
    let j = column + 1;

    if (j === map.length) {
        j = 0;
        i++;
    }

    while (i < map.length) {
        while (j < map[0].length) {
            if (map[i][j] === symbol) {
                processAntennaPair(row, column, i, j, map, antinodes);
            }
            j++;
        }
        j = 0;
        i++;
    }
}

function processAntennaPair(
    firstAntennaRow: number,
    firstAntennaColumn: number,
    secondAntennaRow: number,
    secondAntennaColumn: number,
    map: string[][],
    antinodes: number[][]): void {
        const [rowDelta, columnDelta] =
            [secondAntennaRow - firstAntennaRow, secondAntennaColumn - firstAntennaColumn];

        const [firstAntinodeRow, firstAntinodeColumn] =
            [firstAntennaRow - rowDelta, firstAntennaColumn - columnDelta];

        const [secondAntinodeRow, secondAntinodeColumn] =
            [secondAntennaRow + rowDelta, secondAntennaColumn + columnDelta];

        if (isValid(firstAntinodeRow, firstAntinodeColumn, map, antinodes)) {
            antinodes.push([firstAntinodeRow, firstAntinodeColumn]);
        }

        if (isValid(secondAntinodeRow, secondAntinodeColumn, map, antinodes)) {
            antinodes.push([secondAntinodeRow, secondAntinodeColumn]);
        }
    }

function isValid(candidateRow: number, candidateColumn: number, map:string[][], antinodes: number[][]): boolean {
    return (candidateRow >= 0 &&
            candidateRow < map.length &&
            candidateColumn >= 0 &&
            candidateColumn < map[0].length &&
            antinodes.find(([existingAntinodeRow, existingAntinodeColumn]) => existingAntinodeRow === candidateRow && existingAntinodeColumn === candidateColumn) === undefined);
}

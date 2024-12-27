enum Direction {
    Up,
    Down,
    Left,
    Right
}

const inputText: string = await Deno.readTextFile("input.txt");

const lines = inputText.split("\r\n");

const map: string[][] = [];

lines.forEach(line => {
    const row = line.split("");
    map.push(row);
});

let direction: Direction = Direction.Up;

let [currentRow, currentColumn] = getStartingPosition(map);
let [nextRow, nextColumn] = [currentRow, currentColumn]

const visitedPositions: number[][]= [];
visitedPositions.push([currentRow, currentColumn]);


while (!hasLeftArea(nextRow, nextColumn, map)) {
    switch (direction) {
        case Direction.Up:
            nextRow = currentRow - 1;
            nextColumn = currentColumn;
            break;
        case Direction.Right:
            nextRow = currentRow;
            nextColumn = currentColumn + 1;
            break;
        case Direction.Down:
            nextRow = currentRow + 1;
            nextColumn = currentColumn;
            break;
        case Direction.Left:
            nextRow = currentRow;
            nextColumn = currentColumn - 1;
            break;
        default:
            throw new Error("Unexpected direction");
    }

    if (!hasLeftArea(nextRow, nextColumn, map)) {
        if (map[nextRow][nextColumn] === "#") {
            direction = turnRight(direction);
        } else {
            [currentRow, currentColumn] = [nextRow, nextColumn];

            if (visitedPositions.find(x => x[0] === currentRow && x[1] === currentColumn) === undefined) {
                visitedPositions.push([currentRow, currentColumn]);
            }
        }
      }
}

console.log(visitedPositions.length);

function getStartingPosition(map: string[][]): [x: number, y: number] {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === "^") return [i, j]
        }
    }

    throw new Error("Starting position not found");
}

function turnRight(direction: Direction): Direction {
    switch (direction) {
        case Direction.Up:
            return Direction.Right;
        case Direction.Right:
            return Direction.Down;
        case Direction.Down:
            return Direction.Left;
        case Direction.Left:
          return Direction.Up;
        default:
            throw new Error("Unexpected direction");
      }
}

function hasLeftArea(currentRow: number, currentColumn: number, map: string[][]): boolean {
    return (currentRow < 0 ||
            currentRow >= map.length ||
            currentColumn < 0 ||
            currentColumn >= map[0].length);
}

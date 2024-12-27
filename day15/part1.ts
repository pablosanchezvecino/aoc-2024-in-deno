const inputText: string = await Deno.readTextFile("input.txt");

const [mapStr, movementsStr] = inputText.split("\r\n\r\n");

const map = mapStr.split("\r\n").map(line => line.split(""));
const movements = movementsStr.split("");

let [currentRow, currentColumn] = getRobotPosition(map);console.log([currentRow, currentColumn]);

movements.forEach(movement => {
    switch (movement) {
        case "^":
            [currentRow, currentColumn] = moveUp(currentRow, currentColumn, map);
            break;
        case ">":
            [currentRow, currentColumn] = moveRight(currentRow, currentColumn, map);
            break;
        case "v":
            [currentRow, currentColumn] = moveDown(currentRow, currentColumn, map);
            break;
        case "<":
            [currentRow, currentColumn] = moveLeft(currentRow, currentColumn, map);
            break;
    }
});

let res = 0;

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length; j++) {
        if (map[i][j] === "O") {
            res += 100 * i + j;
        }
    }
}

console.log(res);

function getRobotPosition(map: string[][]): number[] {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map.length; j++) {
            if (map[i][j] === "@") {
                return [i, j];
            }
        }
    }

    throw new Error("The robot was not found");
}

function moveUp(currentRow: number, currentColumn: number, map: string[][]): number[] {
    switch (map[currentRow - 1][currentColumn]) {
        case "#":
            return [currentRow, currentColumn];

        case ".":
            map[currentRow - 1][currentColumn] = "@";
            map[currentRow][currentColumn] = ".";
            return [currentRow - 1, currentColumn];

        case "O": {
            let auxRow = currentRow - 2;
            while (auxRow >= 0 && map[auxRow][currentColumn] === "O") {
                auxRow--;
            }
            if (map[auxRow][currentColumn] === "#") {
                return [currentRow, currentColumn];
            } else if (map[auxRow][currentColumn] === ".") {
                map[auxRow][currentColumn] = "O";
                map[currentRow - 1][currentColumn] = "@";
                map[currentRow][currentColumn] = ".";
                return [currentRow - 1, currentColumn];
            }
            break;
        }
    }

    throw new Error("Unexpected symbol");
}

function moveDown(currentRow: number, currentColumn: number, map: string[][]): number[] {
    switch (map[currentRow + 1][currentColumn]) {
        case "#":
            return [currentRow, currentColumn];

        case ".":
            map[currentRow + 1][currentColumn] = "@";
            map[currentRow][currentColumn] = ".";
            return [currentRow + 1, currentColumn];

        case "O": {
            let auxRow = currentRow + 2;
            while (auxRow < map.length && map[auxRow][currentColumn] === "O") {
                auxRow++;
            }
            if (map[auxRow][currentColumn] === "#") {
                return [currentRow, currentColumn];
            } else if (map[auxRow][currentColumn] === ".") {
                map[auxRow][currentColumn] = "O";
                map[currentRow + 1][currentColumn] = "@";
                map[currentRow][currentColumn] = ".";
                return [currentRow + 1, currentColumn];
            }
            break;
        }
        default:
            throw new Error("Unexpected symbol");
    }

    throw new Error("Unreachable code");
}

function moveRight(currentRow: number, currentColumn: number, map: string[][]): number[] {
    switch (map[currentRow][currentColumn + 1]) {
        case "#":
            return [currentRow, currentColumn];

        case ".":
            map[currentRow][currentColumn + 1] = "@";
            map[currentRow][currentColumn] = ".";
            return [currentRow, currentColumn + 1];

        case "O": {
            let auxColumn= currentColumn + 2;
            while (auxColumn < map[0].length && map[currentRow][auxColumn] === "O") {
                auxColumn++;
            }
            if (map[currentRow][auxColumn] === "#") {
                return [currentRow, currentColumn];
            } else if (map[currentRow][auxColumn] === ".") {
                map[currentRow][auxColumn] = "O";
                map[currentRow][currentColumn + 1] = "@";
                map[currentRow][currentColumn] = ".";
                return [currentRow, currentColumn + 1];
            }
            break;
        }
        default:
            throw new Error("Unexpected symbol");
    }

    throw new Error("Unreachable code");
}

function moveLeft(currentRow: number, currentColumn: number, map: string[][]): number[] {
    switch (map[currentRow][currentColumn - 1]) {
        case "#":
            return [currentRow, currentColumn];

        case ".":
            map[currentRow][currentColumn - 1] = "@";
            map[currentRow][currentColumn] = ".";
            return [currentRow, currentColumn - 1];

        case "O": {
            let auxColumn= currentColumn - 2;
            while (auxColumn >= 0 && map[currentRow][auxColumn] === "O") {
                auxColumn--;
            }
            if (map[currentRow][auxColumn] === "#") {
                return [currentRow, currentColumn];
            } else if (map[currentRow][auxColumn] === ".") {
                map[currentRow][auxColumn] = "O";
                map[currentRow][currentColumn - 1] = "@";
                map[currentRow][currentColumn] = ".";
                return [currentRow, currentColumn - 1];
            }
            break;
        }
        default:
            throw new Error("Unexpected symbol");
    }

    throw new Error("Unreachable code");
}

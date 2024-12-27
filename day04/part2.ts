const inputText: string = await Deno.readTextFile("input.txt");

const lines = inputText.split("\r\n");

const map: string[][] = [];

lines.forEach((line) => {
  const row = line.split("");
  map.push(row);
});

let finds = 0;

for (let i = 1; i < map.length - 1; i++) {
  for (let j = 1; j < map[i].length - 1; j++) {
    if (map[i][j] === "A") {
        // ↘ ↙
        if (map[i - 1][j - 1] === "M" && map[i + 1][j + 1] === "S" && map[i - 1][j + 1] === "M" && map[i + 1][j - 1] === "S") finds++
        // ↖ ↗
        if (map[i + 1][j + 1] === "M" && map[i - 1][j - 1] === "S" && map[i + 1][j - 1] === "M" && map[i - 1][j + 1] === "S") finds++
        // ↖ ↙
        if (map[i + 1][j + 1] === "M" && map[i - 1][j - 1] === "S" && map[i - 1][j + 1] === "M" && map[i + 1][j - 1] === "S") finds++
        // ↘ ↗
        if (map[i - 1][j - 1] === "M" && map[i + 1][j + 1] === "S" && map[i + 1][j - 1] === "M" && map[i - 1][j + 1] === "S") finds++
    }
  }
}

console.log(finds);

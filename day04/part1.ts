const inputText: string = await Deno.readTextFile("input.txt");

const lines = inputText.split("\r\n");

const map: string[][] = [];

lines.forEach((line) => {
  const row = line.split("");
  map.push(row);
});

let finds = 0;

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i][j] === "X") {
      // ↑
      if (
        (i - 3) >= 0 && map[i - 1][j] === "M" && map[i - 2][j] === "A" &&
        map[i - 3][j] === "S"
      ) finds++;
      // ↗
      if (
        (i - 3) >= 0 && (j + 3) < map[i].length && map[i - 1][j + 1] === "M" &&
        map[i - 2][j + 2] === "A" && map[i - 3][j + 3] === "S"
      ) finds++;
      // →
      if (
        (j + 3) < map[i].length && map[i][j + 1] === "M" &&
        map[i][j + 2] === "A" && map[i][j + 3] === "S"
      ) finds++;
      // ↘
      if (
        (i + 3) < map.length && (j + 3) < map[i].length &&
        map[i + 1][j + 1] === "M" && map[i + 2][j + 2] === "A" &&
        map[i + 3][j + 3] === "S"
      ) finds++;
      // ↓
      if (
        (i + 3) < map.length && map[i + 1][j] === "M" &&
        map[i + 2][j] === "A" && map[i + 3][j] === "S"
      ) finds++;
      // ↙
      if (
        (i + 3) < map.length && (j - 3) >= 0 && map[i + 1][j - 1] === "M" &&
        map[i + 2][j - 2] === "A" && map[i + 3][j - 3] === "S"
      ) finds++;
      // ←
      if (
        (j - 3) >= 0 && map[i][j - 1] === "M" && map[i][j - 2] === "A" &&
        map[i][j - 3] === "S"
      ) finds++;
      // ↖
      if (
        (i - 3) >= 0 && (j - 3) >= 0 && map[i - 1][j - 1] === "M" &&
        map[i - 2][j - 2] === "A" && map[i - 3][j - 3] === "S"
      ) finds++;
    }
  }
}

console.log(finds);

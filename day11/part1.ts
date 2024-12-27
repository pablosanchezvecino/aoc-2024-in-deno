const inputText: string = await Deno.readTextFile("input.txt");
const stones: number[] = inputText.split(" ").map(x => Number(x));

for (let i = 0; i < 25; i++) {
    blink(stones);
}

console.log(stones.length);

function blink(stones: number[]): void {
    let currentStoneIndex = 0;

    const initialStones = [...stones];

    initialStones.forEach(stone => {
        if (stone === 0) {
            stones[currentStoneIndex] = 1;
            currentStoneIndex++;
        } else if (stone.toString().length % 2 === 0) {
            const oldStone = Number(stone.toString().slice(0, stone.toString().length / 2));
            stones[currentStoneIndex] = oldStone;
            currentStoneIndex++;

            const newStone = Number(stone.toString().slice(stone.toString().length / 2, stone.toString().length));
            stones[currentStoneIndex] = newStone;
            currentStoneIndex++;
        } else {
            stones[currentStoneIndex] = stone * 2024;
            currentStoneIndex++;
        }
    });
}

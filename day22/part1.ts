const inputText: string = await Deno.readTextFile("input.txt");

const secretNumbers = inputText.split("\r\n").map(x => Number(x));

let acc = 0;

secretNumbers.forEach(secretNumber => {
    for (let i = 0; i < 2000; i++) {
        secretNumber = evolve(secretNumber);
    }

    acc += secretNumber;
});

console.log(acc);

function evolve(secretNumber: number): number {
    secretNumber = ((secretNumber ^ (secretNumber * 64)) >>> 0) % 16777216;
    secretNumber = ((secretNumber ^ Math.floor(secretNumber / 32)) >>> 0) % 16777216;
    secretNumber = ((secretNumber ^ Math.floor(secretNumber * 2048)) >>> 0) % 16777216;

    return secretNumber;
}

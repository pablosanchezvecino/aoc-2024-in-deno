const inputText: string = await Deno.readTextFile("input.txt");

const regex = /mul\((\d{1,3}),(\d{1,3})\)/g
const instructions = inputText.match(regex);

let acc = 0;

instructions!.forEach(instruction => {
    const operands = instruction.match(/\d{1,3}/g)?.map(numStr => Number(numStr));

    acc += operands![0] * operands![1];
})

console.log(acc);

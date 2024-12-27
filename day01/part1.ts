const inputText: string = await Deno.readTextFile("input.txt");

const lines = inputText.split("\r\n");

const list1: number[] = [];
const list2: number[] = [];

lines.forEach(line => {
    const [num1, num2] = line.split("   ");

    list1.push(Number(num1));
    list2.push(Number(num2));
})

list1.sort((a, b) => a - b);
list2.sort((a, b) => a - b);

let acc = 0;

for (let i = 0; i < list1.length; i++) {
    const diff = Math.abs(list1[i] - list2[i]);
    acc += diff;
}

console.log(acc);

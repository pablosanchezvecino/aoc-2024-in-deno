const inputText: string = await Deno.readTextFile("input.txt");

const lines = inputText.split("\r\n");

const list1: Array<number> = [];
const list2: Array<number> = [];

lines.forEach(line => {
    const [num1, num2] = line.split("   ");

    list1.push(Number(num1));
    list2.push(Number(num2));
})

let acc = 0;

list1.forEach(num1 => {
    let occurrences = 0;

    list2.forEach(num2 => {
        if (num2 == num1) {
            occurrences++;
        }
    })

    acc += num1 * occurrences;
});

console.log(acc);

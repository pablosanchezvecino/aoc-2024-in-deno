const inputText: string = await Deno.readTextFile("input.txt");

const [rulesString, updatesString] = inputText.split("\r\n\r\n");

const rules = rulesString.split("\r\n")
    .map(line => line.split("|").map(x => Number(x))
);

const updates = updatesString.split("\r\n")
    .map(line => line.split(",").map(x => Number(x)))

let acc = 0;

updates.forEach(update => {
    if (isValid(update, rules)) {
        acc += getMiddlePageNumber(update);
    }
})

console.log(acc);

function isValid(update: number[], rules: number[][]): boolean {
    let valid = true;

    for (let i = 0; i < update.length - 1; i++) {
        const pageNumber = update[i];

        for (let j = 0; j < rules.length; j++) {
            const rule = rules[j];

            if (rule[0] === pageNumber) {
                const idx = update.findIndex(x => x === rule[1]);
                if (idx !== -1 && idx < i) {
                    valid = false;
                    break;
                }
            } else if (rule[1] === pageNumber) {
                const idx = update.findIndex(x => x === rule[0]);
                if (idx !== -1 && idx > i) {
                    return false;
                }
            }
        }
    }

    return valid;
}

function getMiddlePageNumber(update: number[]): number {
    return update[Math.floor(update.length / 2)];
}

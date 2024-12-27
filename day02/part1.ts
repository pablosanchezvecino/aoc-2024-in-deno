const inputText: string = await Deno.readTextFile("input.txt");

const lines = inputText.split("\r\n");

const reports = lines.map(line => line.split(" ").map(numStr => Number(numStr)));

let acc = 0;

reports.forEach(report => {
    if (isSafe(report)) {
        acc++;
    }
});

console.log(acc);

function isSafe(report: Array<number>): boolean {
    if (report[0] == report[1]) {
        return false;
    }

    const startsWithIncrease = report[0] < report[1];

    for (let i = 0; i < reports.length - 1; i++) {
        if (startsWithIncrease && report[i + 1] < report[i]) {
            return false;
        }

        if (!startsWithIncrease && report[i + 1] > report[i]) {
            return false;
        }

        const diff = Math.abs(report[i + 1]- report[i]);
        if (diff < 1 || diff > 3) {
            return false;
        }
    }

    return true;
}

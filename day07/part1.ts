const inputText: string = await Deno.readTextFile("input.txt");

const equations: Array<[number, number[]]> =
    inputText
        .split("\r\n")
        .map(line => line.split(": "))
        .map(([resultStr, operandsStr]) => [Number(resultStr), operandsStr.split(" ").map(operand => Number(operand))]);

let totalCalibrationResult = 0;

equations.forEach(([result, operands]) => {

    const combinations = Math.pow(2, operands.length - 1);

    for (let i = 0; i < combinations; i++) {
        const bits = i.toString(2).padStart(operands.length - 1, '0').split('').map(bitStr => parseInt(bitStr, 10));

        let acc = operands[0];

        bits.forEach((bit, idx) => {
            acc = bit ? acc * operands[idx + 1] : acc + operands[idx + 1]
        });

        if (acc === result) {
            totalCalibrationResult += result;
            break;
        }
    }
});

console.log(totalCalibrationResult);

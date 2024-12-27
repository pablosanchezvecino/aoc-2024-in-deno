const inputText: string = await Deno.readTextFile("input.txt");

const equations: Array<[number, number[]]> = inputText
  .split("\r\n")
  .map((line) => line.split(": "))
  .map((
    [resultStr, operandsStr],
  ) => [
    Number(resultStr),
    operandsStr.split(" ").map((operand) => Number(operand)),
  ]);

let totalCalibrationResult = 0;

equations.forEach(([result, operands]) => {
  const combinations = Math.pow(3, operands.length - 1);

  for (let i = 0; i < combinations; i++) {
    const trits = i.toString(3).padStart(operands.length - 1, "0").split("")
      .map((bitStr) => parseInt(bitStr, 10));

      let acc = operands[0];

    trits.forEach((trit, idx) => {
      switch (trit) {
        case 0: // +
          acc += operands[idx + 1];
          break;
        case 1: // *
          acc *= operands[idx + 1];
          break;
        case 2: // ||
          acc = Number(`${acc}${operands[idx + 1]}`);
          break;
        default:
      }
    });

    if (acc === result) {
      totalCalibrationResult += result;
      break;
    }
  }
});

console.log(totalCalibrationResult);

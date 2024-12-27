const inputText: string = await Deno.readTextFile("input.txt");

const lines = inputText.split("\r\n");

const initialPositions: number[][] = [];
const velocities: number[][] = [];
const finalPositions: number[][] = [];

lines.forEach(line => {
    const [initialPositionStr, velocityStr] = line.split(" ").map(x => x.slice(2));

    const initialPosition = initialPositionStr.split(",").map(x => Number(x));
    const velocity = velocityStr.split(",").map(x => Number(x));
    
    initialPositions.push(initialPosition);
    velocities.push(velocity);
});

const width = 101;
const height = 103;
const seconds = 100;

for (let i = 0; i < initialPositions.length; i++) {
    const initialPosition = initialPositions[i];
    const velocity = velocities[i];

    const finalPosition = simulateMotion(
        initialPosition,
        velocity,
        height,
        width,
        seconds);

        finalPositions.push(finalPosition);
}

const firstQuadrantCount = finalPositions.filter(position =>
    position[0] < Math.floor(width / 2) &&
    position[1] < Math.floor(height / 2)).length;

const secondQuadrantCount = finalPositions.filter(position =>
    position[0] > Math.floor(width / 2) &&
    position[1] < Math.floor(height / 2)).length;

const thirdQuadrantCount = finalPositions.filter(position =>
    position[0] < Math.floor(width / 2) &&
    position[1] > Math.floor(height / 2)).length;

const fourthQuadrantCount = finalPositions.filter(position =>
    position[0] > Math.floor(width / 2) &&
    position[1] > Math.floor(height / 2)).length;

console.log(firstQuadrantCount * secondQuadrantCount * thirdQuadrantCount * fourthQuadrantCount);

function simulateMotion(
    initialPosition: number[],
    velocity: number[],
    height: number,
    width: number,
    seconds: number): number[] {
        let [currentX, currentY] = initialPosition;
        const [velocityX, velocityY] = velocity;

        for (let i = 0; i < seconds; i++) {
            currentX = (((currentX + velocityX) % width) + width) % width;
            currentY = (((currentY + velocityY) % height) + height) % height;
        }

        return [currentX, currentY];
}

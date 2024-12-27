const inputText: string = await Deno.readTextFile("input.txt");

const diskMap: number[] = inputText.split("").map(x => Number(x));

const diskContents: string[] = [];

let blockId: number = 0;
let compactedSize: number = 0;

diskMap.forEach((n, idx) => {
    const isFreeMemorySpace = idx % 2 === 1;

    for (let i = 0; i < n; i++) {
        if (isFreeMemorySpace) {
            diskContents.push(".");
        } else {
            diskContents.push(blockId.toString());
            compactedSize++;
        }
    }

    if (!isFreeMemorySpace) {
        blockId++;
    }
});

const compactedDiskContents: string[] = [];

let tailIdx = diskContents.length - 1;

for (let i = 0; i < compactedSize; i++) {
    if (diskContents[i] === ".") {
        while (diskContents[tailIdx] === ".") {
            tailIdx--;
        }
        compactedDiskContents[i] = diskContents[tailIdx];
        tailIdx--;
    } else {
        compactedDiskContents[i] = diskContents[i]
    }
}

let hash: number = 0;

compactedDiskContents.forEach((content, idx) => {
    hash += Number(content) * idx;
});

console.log(hash);

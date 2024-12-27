const inputText: string = await Deno.readTextFile("input.txt");

const [availablePatternsStr, desiredDesignsStr] = inputText.split("\r\n\r\n");

const availablePatterns = availablePatternsStr.split(", ");
const desiredDesigns = desiredDesignsStr.split("\r\n");

console.log(desiredDesigns.filter(design => isPossible(design, availablePatterns)).length);

function isPossible(design: string, availablePatterns: string[]): boolean {
    if (design === "") return true;

    const candidates = availablePatterns.filter(pattern => design.startsWith(pattern));

    for (let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i];
        if (isPossible(design.slice(candidate.length), availablePatterns)) {
            return true;
        }
    }

    return false;
}

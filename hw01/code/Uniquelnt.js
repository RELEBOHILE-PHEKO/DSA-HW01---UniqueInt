const fs = require('fs');
const path = require('path');

function readInputFile(filePath) {
    console.log(`Reading file: ${filePath}`); // Debugging
    const uniqueIntegers = new Set();
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');

    lines.forEach((line) => {
        line = line.trim();
        if (line && /^\s*-?\d+\s*$/.test(line)) {
            const integer = parseInt(line, 10);
            if (!isNaN(integer)) {
                uniqueIntegers.add(integer);
            }
        }
    });

    return Array.from(uniqueIntegers).sort((a, b) => a - b);
}

function writeOutputFile(filePath, uniqueIntegers) {
    console.log(`Writing to file: ${filePath}`); // Debugging
    const outputFileContent = uniqueIntegers.join('\n');
    fs.writeFileSync(filePath, outputFileContent);
}

function processInputFile(inputFilePath) {
    const fileName = path.basename(inputFilePath, '.txt');
    const outputDir = path.join(__dirname, '../sample_results');
    console.log(`Processing file: ${inputFilePath}`); // Debugging

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputFilePath = path.join(outputDir, `${fileName}_results.txt`);
    const uniqueIntegers = readInputFile(inputFilePath);
    writeOutputFile(outputFilePath, uniqueIntegers);
}

const inputFolder = path.join(__dirname, '../sample_inputs');
console.log(`Processing input folder: ${inputFolder}`); // Debugging

fs.readdirSync(inputFolder).forEach((file) => {
    if (file.endsWith('.txt')) {
        const inputFilePath = path.join(inputFolder, file);
        processInputFile(inputFilePath);
    }
});

console.log('Processing complete.');

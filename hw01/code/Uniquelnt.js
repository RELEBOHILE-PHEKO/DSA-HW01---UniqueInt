const fs = require('fs');
const path = require('path');

// Define the base directory paths
const baseDir = path.join(__dirname, '..');
const inputFolder = path.join(baseDir, 'sample_inputs');
const outputFolder = path.join(baseDir, 'sample_results');

function readInputFile(filePath) {
    /**
     * Reads an input file and returns a sorted list of unique integers.
     * Handles cases like multiple integers on a line, non-integer values, and empty lines.
     */
    const uniqueIntegers = new Set();
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');

    lines.forEach((line) => {
        line = line.trim(); // Remove leading and trailing whitespaces
        // Ensure that line is non-empty and contains exactly one valid integer
        if (line && /^\s*-?\d+\s*$/.test(line)) {
            const integer = parseInt(line, 10);
            if (!isNaN(integer)) {
                uniqueIntegers.add(integer);
            }
        }
    });

    return Array.from(uniqueIntegers).sort((a, b) => a - b); // Return sorted list of unique integers
}

function writeOutputFile(filePath, uniqueIntegers) {
    /**
     * Writes a list of unique integers to an output file.
     */
    const outputFileContent = uniqueIntegers.join('\n');
    fs.writeFileSync(filePath, outputFileContent);
}

function processInputFile(inputFilePath) {
    /**
     * Processes an input file and generates an output file.
     */
    const fileName = path.basename(inputFilePath, '.txt'); // Get file name without extension
    const outputFilePath = path.join(outputFolder, `${fileName}_result.txt`);
    const uniqueIntegers = readInputFile(inputFilePath);
    writeOutputFile(outputFilePath, uniqueIntegers);
}

// Ensure output folder exists
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
}

// Process all input files in the sample_inputs folder
fs.readdirSync(inputFolder).forEach((file) => {
    if (file.endsWith('.txt')) {
        const inputFilePath = path.join(inputFolder, file);
        processInputFile(inputFilePath);
    }
});

console.log('Processing complete.');

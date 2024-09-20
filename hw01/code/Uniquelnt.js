const fs = require('fs');
const path = require('path');

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
    const outputDir = path.join(__dirname, '../sample_results'); // Adjust path to your results directory
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    const outputFilePath = path.join(outputDir, `${fileName}_results.txt`);
    const uniqueIntegers = readInputFile(inputFilePath);
    writeOutputFile(outputFilePath, uniqueIntegers);
}

// Process all input files in the sample_inputs folder
const inputFolder = path.join(__dirname, '../sample_inputs'); // Adjust path to your input folder
fs.readdirSync(inputFolder).forEach((file) => {
    if (file.endsWith('.txt')) {
        const inputFilePath = path.join(inputFolder, file);
        processInputFile(inputFilePath);
    }
});

console.log('Processing complete.');

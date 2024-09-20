const fs = require('fs');
const path = require('path');

// Function to read an input file and return a sorted list of unique integers
function readInputFile(filePath) {
    console.log(`Reading file: ${filePath}`); // Debug log
    const uniqueIntegers = new Set();
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');

    lines.forEach((line) => {
        line = line.trim(); // Remove leading and trailing whitespaces
        if (line && /^\s*-?\d+\s*$/.test(line)) {
            const integer = parseInt(line, 10);
            if (!isNaN(integer)) {
                uniqueIntegers.add(integer);
            }
        }
    });

    console.log(`Unique integers from ${filePath}: ${Array.from(uniqueIntegers)}`); // Debug log
    return Array.from(uniqueIntegers).sort((a, b) => a - b); // Return sorted list of unique integers
}

// Function to write the sorted unique integers to an output file
function writeOutputFile(filePath, uniqueIntegers) {
    console.log(`Writing to file: ${filePath}`); // Debug log
    const outputFileContent = uniqueIntegers.join('\n');
    fs.writeFileSync(filePath, outputFileContent);
}

// Function to process a single input file
function processInputFile(inputFilePath) {
    const fileName = path.basename(inputFilePath, '.txt'); // Get file name without extension
    const outputDir = path.join(__dirname, '../sample_results'); // Path to results directory

    if (!fs.existsSync(outputDir)) {
        console.log(`Creating output directory: ${outputDir}`); // Debug log
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputFilePath = path.join(outputDir, `${fileName}_results.txt`); // Output file path
    console.log(`Processing file: ${inputFilePath}`); // Debug log
    const uniqueIntegers = readInputFile(inputFilePath);
    writeOutputFile(outputFilePath, uniqueIntegers);
}

// Process all input files in the sample_inputs folder
const inputFolder = path.join(__dirname, '../sample_inputs'); // Path to input folder
console.log(`Processing input folder: ${inputFolder}`); // Debug log
fs.readdirSync(inputFolder).forEach((file) => {
    console.log(`Found file: ${file}`); // Debug log
    if (file.endsWith('.txt')) {
        const inputFilePath = path.join(inputFolder, file);
        processInputFile(inputFilePath);
    }
});

console.log('Processing complete.');

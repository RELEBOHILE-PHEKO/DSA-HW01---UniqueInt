DSA HW01 - UniqueInt
Project Overview
The DSA HW01 - UniqueInt project is designed to process text files containing lists of integers. The goal is to read these files, extract unique integers, and output the results to new files. This project is implemented in JavaScript and uses Node.js for file operations.

Features
Reads input files containing integers (one per line).
Filters out non-integer values and handles empty lines.
Outputs a sorted list of unique integers to a result file.
Supports handling different input file formats and structures.
Project Structure
/hw01: Contains the main project files and directories.
/sample_inputs: Directory where input files are stored.
/sample_results: Directory where output files are saved.
Uniquelnt.js: The main JavaScript file containing the logic for reading input files, processing data, and writing output files.
File Descriptions
Uniquelnt.js: Contains the code for reading integers from input files, processing them to find unique values, and writing the sorted unique integers to output files.
Code Explanation
readInputFile(filePath): Reads an input file, processes the content to extract unique integers, and returns them as a sorted array.
writeOutputFile(filePath, uniqueIntegers): Writes the sorted list of unique integers to the specified output file.
processInputFile(inputFilePath): Manages the process of reading from an input file and writing to the corresponding output file.
fs.readdirSync(inputFolder): Iterates over all files in the input folder and processes them.
Usage
Prepare Directories: Ensure the following directories are in place:

/dsa/hw01/sample_inputs/: Place your input files here.
/dsa/hw01/sample_results/: This is where output files will be saved.

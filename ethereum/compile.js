const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
const sourceFile = path.resolve(__dirname, 'contracts', 'MessageInABottle.sol');
const outputFile = path.resolve(buildPath, 'MessageInABottle.json');

const source = fs.readFileSync(sourceFile, 'utf8');
const compiled = solc.compile(source, 1).contracts;

fs.removeSync(buildPath);
fs.ensureDir(buildPath);
fs.writeJSONSync(outputFile, compiled[':MessageInABottle']);


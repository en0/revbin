#!/usr/bin/env node

'use strict'

const pkg = require('../package.json');
const ArgumentParser = require('argparse').ArgumentParser;
const reverse = require("buffer-reverse/inplace")
const fs = require('fs');

function ReadStream(flags) {
    return function opener(path) {
        if(path === '-')
            return process.stdin;
        return fs.createReadStream(path, { flags: flags });
    }
}

function WriteStream(flags) {
    return function opener(path) {
        if(path === '-')
            return process.stdout;
        return fs.createWriteStream(path, { flags: flags });
    }
}

function getOpts() {
    var ap = new ArgumentParser({
        version: pkg.version,
        description: pkg.description
    });

    ap.addArgument( [ '--in-file' ], {
        help: "A path to the file to be reversed.",
        type: ReadStream('r'),
        defaultValue: process.stdin,
    });

    ap.addArgument( [ '--out-file' ], {
        help: "A path to write the reversed bytes.",
        type: WriteStream('w'),
        defaultValue: process.stdout,
    });

    return ap.parseArgs();
}

function main() {
    var opts = getOpts(),
        inChunks = [];

    opts.in_file.on('error', (e) => console.error(e));
    opts.in_file.on('data', (d) => inChunks.push(d));
    opts.in_file.on('close', () => {
        var outBuffer = Buffer.concat(inChunks);
        reverse(outBuffer);
        opts.out_file.write(outBuffer);
    });
}

(function(){main()})();

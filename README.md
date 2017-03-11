Like rev but for binary files!

## Install

```bash
npm install -g revbin
```

buffer-reverse and argparse will also be installed as depedencies.

## Usage

```bash
# Reverse a file.
revbin --in-file zipFile.zip --out-file backwardZip.bin

# Reverse stdin and write to stdout.
echo -n "hello, world" | revbin

# Show help
revbin -h
```

## Licence

GNU GENERAL PUBLIC LICENSE

Copyright (C) 2007 Free Software Foundation


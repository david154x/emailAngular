class StringBuilder {
  constructor() {
    this.strings = [];
  }

  append(string) {
    this.strings.push(string);
  }

  appendLine(string) {
    this.strings.push(string + "\n");
  }

  toString() {
    return this.str;
  }
}

module.exports = StringBuilder;

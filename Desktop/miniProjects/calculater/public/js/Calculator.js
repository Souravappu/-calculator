class Calculator {
    constructor() {
        this.currentValue = '0';
        this.previousValue = null;
        this.operation = null;
        this.memory = 0;
        this.history = [];
        this.isNewNumber = true;
    }

    // Basic operations
    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
    multiply(a, b) { return a * b; }
    divide(a, b) { return b !== 0 ? a / b : 'Error'; }

    squareRoot(x) { return Math.sqrt(x); }
    power(x, y) { return Math.pow(x, y); }
    sin(x) { return Math.sin(x * Math.PI / 180); }
    cos(x) { return Math.cos(x * Math.PI / 180); }
    tan(x) { return Math.tan(x * Math.PI / 180); }

    memoryAdd(value) { this.memory += parseFloat(value); }
    memorySubtract(value) { this.memory -= parseFloat(value); }
    memoryRecall() { return this.memory; }
    memoryClear() { this.memory = 0; }

    // History management
    addToHistory(calculation) {
        this.history.push(calculation);
        if (this.history.length > 10) {
            this.history.shift();
        }
    }

    // Input handling
    appendNumber(number) {
        if (this.isNewNumber) {
            this.currentValue = number;
            this.isNewNumber = false;
        } else {
            this.currentValue = this.currentValue === '0' ? number : this.currentValue + number;
        }
    }

    setOperation(operation) {
        if (this.previousValue === null) {
            this.previousValue = parseFloat(this.currentValue);
        } else if (!this.isNewNumber) {
            this.calculate();
        }
        this.operation = operation;
        this.isNewNumber = true;
    }

    calculate() {
        if (this.operation === null || this.isNewNumber) return;

        const current = parseFloat(this.currentValue);
        const previous = this.previousValue;
        let result;

        switch (this.operation) {
            case '+': result = this.add(previous, current); break;
            case '-': result = this.subtract(previous, current); break;
            case '*': result = this.multiply(previous, current); break;
            case '/': result = this.divide(previous, current); break;
            case '^': result = this.power(previous, current); break;
        }

        this.addToHistory(`${previous} ${this.operation} ${current} = ${result}`);
        this.currentValue = result.toString();
        this.previousValue = null;
        this.operation = null;
        this.isNewNumber = true;
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = null;
        this.operation = null;
        this.isNewNumber = true;
    }

    getCurrentValue() {
        return this.currentValue;
    }

    getHistory() {
        return this.history;
    }
} 
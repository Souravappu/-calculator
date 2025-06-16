document.addEventListener('DOMContentLoaded', () => {
    const calculator = new Calculator();
    const display = document.getElementById('display');
    const historyDisplay = document.getElementById('history');
    const themeToggle = document.getElementById('theme-toggle');

    themeToggle.addEventListener('change', () => {
        document.body.setAttribute('data-theme', 
            themeToggle.checked ? 'dark' : 'light'
        );
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        
        if (/[0-9]/.test(key)) {
            calculator.appendNumber(key);
        } else if (['+', '-', '*', '/', '^'].includes(key)) {
            calculator.setOperation(key);
        } else if (key === 'Enter' || key === '=') {
            calculator.calculate();
        } else if (key === 'Escape') {
            calculator.clear();
        } else if (key === 'Backspace') {
            const currentValue = calculator.getCurrentValue();
            calculator.currentValue = currentValue.slice(0, -1) || '0';
        } else if (key === '.') {
            if (!calculator.getCurrentValue().includes('.')) {
                calculator.appendNumber('.');
            }
        }

        updateDisplay();
    });

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            
            switch(action) {
                case 'clear':
                    calculator.clear();
                    break;
                case 'backspace':
                    const currentValue = calculator.getCurrentValue();
                    calculator.currentValue = currentValue.slice(0, -1) || '0';
                    break;
                case '=':
                    calculator.calculate();
                    break;
                case 'mc':
                    calculator.memoryClear();
                    break;
                case 'mr':
                    calculator.currentValue = calculator.memoryRecall().toString();
                    break;
                case 'm+':
                    calculator.memoryAdd(calculator.getCurrentValue());
                    break;
                case 'm-':
                    calculator.memorySubtract(calculator.getCurrentValue());
                    break;
                case 'sin':
                case 'cos':
                case 'tan':
                case 'sqrt':
                    const value = parseFloat(calculator.getCurrentValue());
                    let result;
                    switch(action) {
                        case 'sin': result = calculator.sin(value); break;
                        case 'cos': result = calculator.cos(value); break;
                        case 'tan': result = calculator.tan(value); break;
                        case 'sqrt': result = calculator.squareRoot(value); break;
                    }
                    calculator.currentValue = result.toString();
                    calculator.addToHistory(`${action}(${value}) = ${result}`);
                    break;
                default:
                    if (/[0-9.]/.test(action)) {
                        calculator.appendNumber(action);
                    } else if (['+', '-', '*', '/', '^', '%'].includes(action)) {
                        calculator.setOperation(action);
                    }
            }

            updateDisplay();
            animateButton(button);
        });
    });

    function updateDisplay() {
        display.textContent = calculator.getCurrentValue();
        historyDisplay.textContent = calculator.getHistory().join('\n');
    }

    function animateButton(button) {
        button.style.animation = 'none';
        button.offsetHeight; 
        button.style.animation = 'buttonPress 0.2s ease';
    }

    updateDisplay();
}); 
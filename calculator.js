let display = document.getElementById('display');
let currentInput = '0';
let shouldResetDisplay = false;

//função de atualizar a tela
function updateDisplay(){
    display.textContent = currentInput;
}

function appendToDisplay(value) { // CORREÇÃO: appendToDisplay (T maiúsculo)
    if (shouldResetDisplay){
        currentInput = '';
        shouldResetDisplay = false;
    }

    if (currentInput === '0' && value !== '.'){
        currentInput = value;
    }else{
        //Sem operadores consecutivos
        const lastChar = currentInput.slice(-1);
        const operators = ['+', '-', '*', '/'];
    
        // CORREÇÃO: operators.includes() (ponto em vez de vírgula, e "includes" completo)
        if (operators.includes(value) && operators.includes(lastChar)){
            currentInput = currentInput.slice(0, -1) + value;
        }else {
            currentInput += value;
        }
    }
    updateDisplay();
}

//limpar informações da calculadora
function clearDisplay(){
    currentInput = "0";
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function calculate(){
    try{
        //substitui x por *
        let expression = currentInput.replace(/x/g, '*');
        //verifica se é valida a expressão
        if(expression === '' || expression === '0') {
            return;
        }
    
        let result = Function('"use strict"; return (' + expression +')')();
        
        // CORREÇÃO: Removido parênteses extras
        if (isNaN(result) || !isFinite(result)) {
            currentInput = 'Erro';
        } else {
            currentInput = parseFloat(result.toFixed(10)).toString();
        }
        shouldResetDisplay = true;
        updateDisplay();
        
    } catch (error) {
        currentInput = 'Erro';
        shouldResetDisplay = true;
        updateDisplay();
    }
}

// Suporte para teclado
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendToDisplay(key); // CORREÇÃO: função com nome correto
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+') {
        appendToDisplay('+');
    } else if (key === '-') {
        appendToDisplay('-');
    } else if (key === '*') {
        appendToDisplay('*');
    } else if (key === '/') {
        event.preventDefault(); 
        appendToDisplay('/');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});
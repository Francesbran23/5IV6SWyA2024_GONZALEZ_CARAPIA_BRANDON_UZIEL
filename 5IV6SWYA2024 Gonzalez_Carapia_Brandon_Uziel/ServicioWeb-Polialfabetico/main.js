document.addEventListener("DOMContentLoaded", function () {
    const texto = document.getElementById("texto");
    const seleccionarCesar = document.getElementById("seleccionarCesar");
    const seleccionarVigenere = document.getElementById("seleccionarVigenere");
    const desplazamiento = document.getElementById("desplazamiento");
    const clave = document.getElementById("clave");
    const cifrado = document.getElementById("cifrado");
    const cifrarBtn = document.getElementById("cifrarBtn");
    const descifrarBtn = document.getElementById("descifrarBtn");
    const copiarBtn = document.getElementById("copiarBtn");
    const reiniciarBtn = document.getElementById("reiniciarBtn");
    const cesarOptions = document.getElementById("cesar-options");
    const vigenereOptions = document.getElementById("vigenere-options");


    seleccionarCesar.addEventListener("click", function () {
        cesarOptions.style.display = "block";
        vigenereOptions.style.display = "none";
    });

    seleccionarVigenere.addEventListener("click", function () {
        vigenereOptions.style.display = "block";
        cesarOptions.style.display = "none";
    });

    cifrarBtn.addEventListener("click", function () {
        const textoIngresado = texto.value;
        const valorDesplazamiento = parseInt(desplazamiento.value);
    
        if (textoIngresado === "") {
            alert("Por favor, ingresa un texto antes de cifrar.");
            return; // Evita que el código siga ejecutándose si el campo está vacío.
        }
    
        if (cesarOptions.style.display === "block") {
            if (isNaN(valorDesplazamiento) || valorDesplazamiento > 100) {
                alert("Por favor, ingresa un valor de desplazamiento válido (hasta 100).");
                return;
            }
            cifrado.value = cifrarCesar(textoIngresado, valorDesplazamiento);
        } else {
            const claveValor = clave.value;
    
            if (claveValor === "") {
                alert("Por favor, ingresa una clave antes de cifrar.");
                return;
            }
    
            cifrado.value = cifrarVigenere(textoIngresado, claveValor);
        }
    });
    
    descifrarBtn.addEventListener("click", function () {
        const textoIngresado = texto.value;
        const valorDesplazamiento = parseInt(desplazamiento.value);
    
        if (textoIngresado === "") {
            alert("Por favor, ingresa un texto antes de descifrar.");
            return;
        }
    
        if (cesarOptions.style.display === "block") {
            if (isNaN(valorDesplazamiento) || valorDesplazamiento > 100) {
                alert("Por favor, ingresa un valor de desplazamiento válido (hasta 100) para descifrar.");
                return;
            }
            cifrado.value = descifrarCesar(textoIngresado, valorDesplazamiento);
        } else {
            const claveValor = clave.value;
    
            if (claveValor === "") {
                alert("Por favor, ingresa una clave antes de descifrar.");
                return;
            }
    
            cifrado.value = descifrarVigenere(textoIngresado, claveValor);
        }
    });
    

    copiarBtn.addEventListener("click", function () {
        const textoCifradoValor = cifrado.value;
        if (textoCifradoValor.trim() === "") {
            alert("No hay texto cifrado para copiar.");
            return;
        }

        texto.value = textoCifradoValor;
    });

    reiniciarBtn.addEventListener("click", function () {
        // Restablecer los campos
        texto.value = "";
        desplazamiento.value = ""; // Restablece el campo de desplazamiento
        clave.value = ""; // Restablece el campo de clave
        cifrado.value = "";
    });
});

function cifrarCesar(texto, desplazamiento) {
    return texto.split('').map(char => {
        if (/[\x21-\x7E]/.test(char)) { // Rango ASCII del 33 al 126
            const asciiValue = char.charCodeAt(0);
            const nuevoAsciiValue = (asciiValue - 33 + desplazamiento) % 94 + 33; // Rango del 33 al 126
            return String.fromCharCode(nuevoAsciiValue);
        } else {
            return char;
        }
    }).join('');
}

function descifrarCesar(texto, desplazamiento) {
    return texto.split('').map(char => {
        if (/[\x21-\x7E]/.test(char)) { // Rango ASCII del 33 al 126
            const asciiValue = char.charCodeAt(0);
            const nuevoAsciiValue = (asciiValue - 33 - desplazamiento + 94) % 94 + 33; // Rango del 33 al 126
            return String.fromCharCode(nuevoAsciiValue);
        } else {
            return char;
        }
    }).join('');
}

function cifrarVigenere(texto, clave) {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const claveRepetida = clave.repeat(Math.ceil(texto.length / clave.length)).substring(0, texto.length);
    let resultado = '';

    for (let i = 0; i < texto.length; i++) {
        const textoChar = texto[i];
        if (/[A-Za-z]/.test(textoChar)) {
            const isUpperCase = textoChar === textoChar.toUpperCase();
            const textoIndex = letras.indexOf(textoChar.toUpperCase());
            const claveChar = claveRepetida[i].toUpperCase();
            const claveIndex = letras.indexOf(claveChar);
            const newIndex = (textoIndex + claveIndex) % 26;
            const newChar = letras.charAt(newIndex);
            resultado += isUpperCase ? newChar : newChar.toLowerCase();
        } else {
            resultado += textoChar;
        }
    }

    return resultado;
}

function descifrarVigenere(texto, clave) {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const claveRepetida = clave.repeat(Math.ceil(texto.length / clave.length)).substring(0, texto.length);
    let resultado = '';

    for (let i = 0; i < texto.length; i++) {
        const textoChar = texto[i];
        if (/[A-Za-z]/.test(textoChar)) {
            const isUpperCase = textoChar === textoChar.toUpperCase();
            const textoIndex = letras.indexOf(textoChar.toUpperCase());
            const claveChar = claveRepetida[i].toUpperCase();
            const claveIndex = letras.indexOf(claveChar);
            const newIndex = (textoIndex - claveIndex + 26) % 26;
            const newChar = letras.charAt(newIndex);
            resultado += isUpperCase ? newChar : newChar.toLowerCase();
        } else {
            resultado += textoChar;
        }
    }

    return resultado;
}










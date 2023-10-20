const desplazamiento = document.getElementById("desplazamiento");
const texto = document.getElementById("texto");
const textoCifrado = document.getElementById("cifrado");
const cifrarBtn = document.getElementById("cifrarBtn");
const descifrarBtn = document.getElementById("descifrarBtn");
const copiarBtn = document.getElementById("copiarBtn");

function cifrado(textoIngresado, valorDesplazamiento) {
    return textoIngresado.split('').map(c => {
        if (c.match(/[a-zA-Z]/)) {
            let mayus = (c === c.toUpperCase()) ? true : false;
            let valorEntero = c.toLowerCase().charCodeAt(0);

            valorEntero = ((valorEntero - 97 + valorDesplazamiento) % 26) + 97;

            let cifrado = String.fromCharCode(mayus ? valorEntero - 32 : valorEntero);
            return cifrado;
        } else {
            return c;
        }
    }).join('');
}

function descifrado(textoIngresado, valorDesplazamiento) {
    return textoIngresado.split('').map(c => {
        if (c.match(/[a-zA-Z]/)) {
            let mayus = (c === c.toUpperCase()) ? true : false;
            let valorEntero = c.toLowerCase().charCodeAt(0);

            valorEntero = ((valorEntero - 97 - valorDesplazamiento + 26) % 26) + 97;

            let descifrado = String.fromCharCode(mayus ? valorEntero - 32 : valorEntero);
            return descifrado;
        } else {
            return c;
        }
    }).join('');
}

function actualizarCifrado() {
    const textoIngresado = texto.value;
    const valorDesplazamiento = parseInt(desplazamiento.value);
    textoCifrado.value = cifrado(textoIngresado, valorDesplazamiento);
}

cifrarBtn.addEventListener("click", () => {
    actualizarCifrado();
});

descifrarBtn.addEventListener("click", () => {
    const textoIngresado = texto.value;
    const valorDesplazamiento = parseInt(desplazamiento.value);
    textoCifrado.value = descifrado(textoIngresado, valorDesplazamiento);
});

copiarBtn.addEventListener("click", () => {
    const textoCifradoValor = textoCifrado.value;
    texto.value = textoCifradoValor;
});

texto.addEventListener("keyup", actualizarCifrado);
desplazamiento.addEventListener("change", actualizarCifrado);


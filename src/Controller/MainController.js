window.addEventListener("DOMContentLoaded", () => {
    new MainController();
});

// Declare MainController class
class MainController {

    /**
     * Constructor
     */
    constructor () {
        // LLamada a eventos
        this.events();
        // Establecemos contraseña
        this.setRandom();
    }

    /**
     * Definición eventos
     */
    events() {
        // Evento modificar rango
        document.querySelector('#range').addEventListener('input', (event) => {
            // Modificar input lenght
            document.querySelector('#length').value = event.currentTarget.value;
        });
        // Evento click checkbox
        document.querySelectorAll('.form-check-input').forEach(checkbox => {
            checkbox.addEventListener('click', (event) => {
                this.checkOptions(event);
            });
        });
        // Evento botón generar
        document.querySelector('#generate').addEventListener('click', () => {
            // Set random password
            this.setRandom();
        });
        // Evento botón copiar
        document.querySelector('#copy').addEventListener('click', () => {
            this.copyToClipboard(document.querySelector('#password').value);
            // Mostramos alerta
            this.showToastCopied();
        });
        // Evento botón cerrar toast
        document.querySelector('.btn-close').addEventListener('click', (event) => {
            this.hideToastCopied(event.target);
        });
    }

    /**
     * Comprobar opciones marcadas
     */
    checkOptions(event) {
        let counter = 0;
        // Recorremos checkboxes marchados
        document.querySelectorAll('.form-check-input').forEach(checkbox => {
            if (checkbox.checked) {
                counter++;
            }
        });
        // Comprobamos si solo queda 1
        if (counter == 0) {
            event.target.checked = true;
        }
    }

    /**
     * Obtener longitud
     */
    getLenght() {
        return document.querySelector('#length').value;
    }

    /**
     * Función get random
     */
    getChars() {
        // Characters vars
        const mayusCharts = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const minusCharts = "abcdefghijklmnopqrstuvwxyz";
        const numbersCharts = "0123456789";
        const specialsCharts = "!@#$%^&*()";
        // Var for return charts
        let chars = '';

        // Obtenemos opciones
        let mayus = document.querySelector('#mayus');
        let minus = document.querySelector('#minus');
        let numbers = document.querySelector('#numbers');
        let symbols = document.querySelector('#symbols');

        // Si esta marcado mayus
        if (mayus.checked) {
            chars += mayusCharts;
        }
        // Si esta marcado minus
        if (minus.checked) {
            chars += minusCharts;
        }
        // Si esta marcado minus
        if (numbers.checked) {
            chars += numbersCharts;
        }
        // Si esta marcado symbols
        if (symbols.checked) {
            chars += specialsCharts;
        }

        return chars;
    }

    /**
     * Función get random
     */
    getRandom(chars, length) {
        let password = '';

        for (let i = 0; i < length; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }

        return password;
    }

    /**
     * Función set random
     */
    setRandom() {
        // Obtenemos password random
        let password = this.getRandom(
            this.getChars(),
            this.getLenght()
        );
        // Establecemos contraseña en campo
        document.querySelector('#password').value = password;
    }

    /**
     * Funciónes toast
     */
    showToastCopied() {
        document.querySelector('#toastCopied .toast').classList.add('show');
    }
    hideToastCopied(element) {
        element.parentNode.parentNode.classList.remove('show');
    }

    /**
     * Función copiar portapapeles
     */
     copyToClipboard(text) {
        let input = document.createElement('input');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
    }

}
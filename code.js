const patterns = {
    nombre: /^[A-Z][a-zA-ZáéíóúÁÉÍÓÚÑñ]+$/i, 
    apellidos: /^[A-Z][a-záéíóúÁÉÍÓÚÑñ]+$/i,
    dni: /^[A-Z0-9]{1,8}[A-Z]$/i,
    fechaNacimiento: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    codigoPostal: /^\d{5}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    telFijo: /^\d{9}$/,
    telMovil: /^(\+34|34)?\d{9}$/,
    iban: /^[A-Z]{2}\d{2}[A-Z0-9]{4,24}$/,
    tarjetaCredito: /^(?:\d{4}[- ]?){3}\d{4}$/,
    password: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{12,}$/,
    confirmarPassword: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{12,}$/
};


document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');
    const autoRellenarBtn = document.getElementById('AutoRellenar');
    const guardarBtn = document.getElementById('Guardar');
    const recuperarBtn = document.getElementById('Recuperar');

    // Función para auto-rellenar el formulario
    function autoRellenar() {
        const datosEjemplo = {
            'Nombre': 'Juan',
            'Apellidos': 'García Pérez',
            'DNI/NIE': '12345678Z',
            'Fecha nacimiento': '1990-01-01',
            'Código Postal': '28001',
            'Email': 'juan.garcia@example.com',
            'Teléfono fijo': '912345678',
            'Teléfono móvil': '612345678',
            'IBAN': 'ES9121000418450200051332',
            'Tarjeta de crédito': '4111111111111111',
            'Contraseña': 'Contraseña123!',
            'Confirmar contraseña': 'Contraseña123!'
        };

        form.querySelectorAll('input').forEach(input => {
            input.value = datosEjemplo[input.placeholder] || '';
        });
    }

    // Función para guardar los datos del formulario
    function guardarDatos() {
        const datos = {};
        form.querySelectorAll('input').forEach(input => {
            datos[input.placeholder] = input.value;
        });
        localStorage.setItem('formularioDatos', JSON.stringify(datos));
        alert('Datos guardados correctamente');
    }

    // Función para recuperar los datos guardados
    function recuperarDatos() {
        const datos = JSON.parse(localStorage.getItem('formularioDatos'));
        if (datos) {
            form.querySelectorAll('input').forEach(input => {
                input.value = datos[input.placeholder] || '';
            });
            alert('Datos recuperados correctamente');
        } else {
            alert('No hay datos guardados');
        }
    }

    // Eventos para los botones
    autoRellenarBtn.addEventListener('click', autoRellenar);
    guardarBtn.addEventListener('click', guardarDatos);
    recuperarBtn.addEventListener('click', recuperarDatos);

    // Validación de campos en tiempo real
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.classList.remove('invalid');
                this.classList.add('valid');
            } else {
                this.classList.remove('valid');
                this.classList.add('invalid');
            }
        });
    });
});

function validate(field, regex){

    if(regex.test(field.value)){
        field.className = 'valid';
    } else {
        field.className = 'invalid';
    }

}
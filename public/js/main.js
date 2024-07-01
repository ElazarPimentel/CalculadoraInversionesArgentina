document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    const inputAnios = document.getElementById('años');
    const inputMeses = document.getElementById('meses');
    const inputInversion = document.getElementById('inversion');
    const inputTasaTNA = document.getElementById('tasa-tna');
    const inputTasaTEA = document.getElementById('tasa-tea');
    const inputTasaAPY = document.getElementById('tasa-apy');
    const btnCalcular = document.getElementById('calcular');
    const errores = document.getElementById('errores');
    const resultadoTNA = document.getElementById('resultado-tna');
    const resultadoTEA = document.getElementById('resultado-tea');
    const resultadoAPY = document.getElementById('resultado-apy');

    inputAnios.addEventListener('input', () => {
        console.log('Años input changed');
        const anios = parseInt(inputAnios.value, 10);
        inputMeses.value = isNaN(anios) ? '' : anios * 12;
    });

    inputMeses.addEventListener('input', () => {
        console.log('Meses input changed');
        const meses = parseInt(inputMeses.value, 10);
        inputAnios.value = isNaN(meses) ? '' : Math.floor(meses / 12);
    });

    inputInversion.addEventListener('input', () => {
        console.log('Inversión Inicial input changed');
        formatInversionInput();
    });

    function formatInversionInput() {
        console.log('Formatting Inversión Inicial input');
        let value = inputInversion.value.replace(/\D/g, '');
        inputInversion.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    btnCalcular.addEventListener('click', () => {
        console.log('Calcular button clicked');
        const inversion = parseFloat(inputInversion.value.replace(/\./g, ''));
        const anios = parseFloat(inputAnios.value);
        const tasaTNA = parseFloat(inputTasaTNA.value) / 100;
        const tasaTEA = parseFloat(inputTasaTEA.value) / 100;
        const tasaAPY = parseFloat(inputTasaAPY.value) / 100;

        console.log('Input values:', { inversion, anios, tasaTNA, tasaTEA, tasaAPY });

        if (isValidInput(inversion, anios, tasaTNA, tasaTEA, tasaAPY)) {
            console.log('Valid input values');
            errores.style.display = 'none';
            const tna = Math.ceil(inversion * (1 + tasaTNA * anios));
            const tea = Math.ceil(inversion * Math.pow(1 + tasaTEA, anios));
            const apy = Math.ceil(inversion * Math.pow(1 + tasaAPY / 12, 12 * anios));

            console.log('Calculation results:', { tna, tea, apy });

            displayResults(tna, tea, apy);
        } else {
            console.log('Invalid input values');
            errores.style.display = 'block';
        }
    });

    const isValidInput = (...values) => {
        console.log('Validating input values:', values);
        return values.every(value => !isNaN(value) && value >= 0);
    };

    const displayResults = (tna, tea, apy) => {
        console.log('Displaying results:', { tna, tea, apy });
        resultadoTNA.textContent = tna.toLocaleString('es-AR');
        resultadoTEA.textContent = tea.toLocaleString('es-AR');
        resultadoAPY.textContent = apy.toLocaleString('es-AR');
    };
});

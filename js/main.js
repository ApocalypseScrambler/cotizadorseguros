const contenedor = document.querySelector('.contenedor');
const contenedor2 = document.querySelector('.contenedor2');
const contenedor3 = document.querySelector('.contenedor3');
const contenedorEspera = document.querySelector('.contenedorEspera');

class cobertura {
    constructor(valor) {
        this.valor = valor;
    }

    costo() {
        this.valor = Math.round(this.valor)
    }

    cuotas() {
        return (this.valor / 3).toFixed(2)
    }
}

// Se van a ofrecer 3 tipos de coberturas con una base de costo de 3500
// la cobertura standard se construira a partir del costo de la basica y cambiara dependiendo de la fabricacion del vehiculo
// la cobertura premium será un 50% mayor al costo calculado para standard
const coberturaBasica = new cobertura(3500);
const coberturaStandard = new cobertura(0);
const coberturaPremium = new cobertura(0);

const vehiculoCotizado = {
    fabricacion: document.querySelector('input[type=radio][name=fabricacion]:checked').value,
    auto: document.getElementById('seleccionAuto').value,
    anio: document.getElementById('seleccionAnio').value,
    provincia: document.getElementById('provinciaRiesgo').value
}

const provincias = [
    { nombre: "Buenos Aires", riesgo: "Alto" },
    { nombre: "Capital Federal", riesgo: "Muy Alto" },
    { nombre: "Entre Ríos", riesgo: "Medio" },
    { nombre: "Corrientes", riesgo: "Bajo" },
    { nombre: "Misiones", riesgo: "Alto" },
    { nombre: "Formosa", riesgo: "Alto" },
    { nombre: "Chaco", riesgo: "Bajo" },
    { nombre: "Salta", riesgo: "Medio" },
    { nombre: "Jujuy", riesgo: "Medio" },
    { nombre: "Tucumán", riesgo: "Bajo" },
    { nombre: "Catamarca", riesgo: "Medio" },
    { nombre: "San Juan", riesgo: "Medio" },
    { nombre: "La Rioja", riesgo: "Alto" },
    { nombre: "Mendoza", riesgo: "Alto" },
    { nombre: "Córdoba", riesgo: "Muy Alto" },
    { nombre: "San Luis", riesgo: "Medio" },
    { nombre: "La Pampa", riesgo: "Medio" },
    { nombre: "Santa Fe", riesgo: "Alto" },
    { nombre: "Neuquén", riesgo: "Medio" },
    { nombre: "Rio Negro", riesgo: "Alto" },
    { nombre: "Santa Cruz", riesgo: "Medio" },
    { nombre: "Chubut", riesgo: "Medio" },
    { nombre: "Tierra del Fuego", riesgo: "Bajo" },
    { nombre: "Santiago del Estero", riesgo: "Medio" },
]

function aplicarDescuentoAntiguedad(valorCobertura) {
    const cantidadAnios = new Date().getFullYear() - vehiculoCotizado.anio;
    let i = 0;
    while (cantidadAnios != i) {
        valorCobertura -= valorCobertura * 3 / 100;
        i += 1;
    }
    return valorCobertura;
}

function obtenerNroCotizacion() {
    const min = Math.ceil(new Date().getSeconds());
    const max = Math.floor(new Date().getMilliseconds() * new Date().getSeconds());
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function creoTarjetaCotizacion() {
    let cotizacionRecupero = JSON.parse(sessionStorage.getItem('cotizacion'));
    document.getElementById('autoYAnioCotizado').textContent = cotizacionRecupero.auto + " " + cotizacionRecupero.anio;
    document.getElementById('fabricacionCotizada').textContent = "Fabricación " + cotizacionRecupero.fabricacion;
    document.getElementById('provinciaCotizada').textContent = "Provincia de " + cotizacionRecupero.provincia;
}

document.getElementById('nroCotizacion').textContent = obtenerNroCotizacion();

document.getElementById('cotizar').onclick = function () {

    sessionStorage.clear();
    // Si el vehiculo es un auto subimos un 5% el costo, si es otro subimos un 15%
    const esUnAuto = ["Fiat Cronos", "Peugeot 208", "Toyota Etios", "Chevrolet Cruze", "Renault Kangoo", "Toyota Corolla", "Citroën C4 Cactus"]

    if (esUnAuto.includes(vehiculoCotizado.auto)) {
        coberturaBasica.valor *= 1.05
    } else {
        coberturaBasica.valor *= 1.15
    }

    // Aplicamos un 3% de descuento por cada año, sobre el saldo de cada año
    aplicarDescuentoAntiguedad(coberturaBasica.valor);

    // Si el vehiculo es nacional +15%, importado +30% para cobertura Standard
    switch (vehiculoCotizado.fabricacion) {
        case 'Nacional':
            coberturaStandard.valor = coberturaBasica.valor * 1.15
            break;
        case 'Importado':
            coberturaStandard.valor = coberturaBasica.valor * 1.30
            break;
    }

    const buscoProvincia = provincias.find((provincia) => provincia.nombre === vehiculoCotizado.provincia)

    switch (buscoProvincia.riesgo) {
        case 'Muy Alto':
            coberturaStandard.valor *= 1.45
            break;
        case 'Alto':
            coberturaStandard.valor *= 1.3
            break;
        case 'Medio':
            coberturaStandard.valor *= 1.15
            break;
        default:
            coberturaStandard.valor *= 1
            break;
    }

    // Cobertura Premium +50% que la Standard
    coberturaPremium.valor = coberturaStandard.valor * 1.5;

    coberturaBasica.costo();
    coberturaStandard.costo();
    coberturaPremium.costo();

    document.getElementById('autoMasAnioCotizado').textContent = "Auto Cotizado: " + vehiculoCotizado.auto + " - Año Cotizado: " + vehiculoCotizado.anio;
    
    if (vehiculoCotizado.fabricacion == 'nacional') {
        document.getElementById('fabricacionMasProvinciaCotizada').textContent = "Fabricación: " + vehiculoCotizado.fabricacion + " - Provincia: " + vehiculoCotizado.provincia;
    } else {
        document.getElementById('fabricacionMasProvinciaCotizada').textContent = "Fabricación: " + vehiculoCotizado.fabricacion + " - Provincia: " + vehiculoCotizado.provincia;
    }
    
    document.getElementById('costoBasica').textContent = "$ " + coberturaBasica.valor;
    document.getElementById('costoStandard').textContent = "$ " + coberturaStandard.valor;
    document.getElementById('costoPremium').textContent = "$ " + coberturaPremium.valor;

    document.getElementById('cuotasBasica').textContent = "3 cuotas de $ " + coberturaBasica.cuotas();
    document.getElementById('cuotasStandard').textContent = "3 cuotas de $ " + coberturaStandard.cuotas();
    document.getElementById('cuotasPremium').textContent = "3 cuotas de $ " + coberturaPremium.cuotas();
    
    contenedor.classList.add('ocultar');
    contenedorEspera.classList.remove('ocultar');
    setTimeout(function () {
        contenedorEspera.classList.add('ocultar');
        contenedor2.classList.remove('ocultar');
    }, 3000);

    const cotizacionGuardado = JSON.stringify(vehiculoCotizado);
    sessionStorage.setItem('cotizacion', cotizacionGuardado);
    sessionStorage.setItem('costoBasica', coberturaBasica.valor);
    sessionStorage.setItem('costoStandard', coberturaStandard.valor);
    sessionStorage.setItem('costoPremium', coberturaPremium.valor);
    sessionStorage.setItem('cuotasBasica', coberturaBasica.cuotas());
    sessionStorage.setItem('cuotasStandard', coberturaStandard.cuotas());
    sessionStorage.setItem('cuotasPremium', coberturaPremium.cuotas());
}

document.getElementById('volver').onclick = function () {

    contenedor.classList.remove('ocultar');
    contenedor2.classList.add('ocultar');

}

document.getElementById('volver3').onclick = function () {

    contenedor.classList.remove('ocultar');
    contenedor3.classList.add('ocultar');

}

document.getElementById('contratarPremium').onclick = function () {
    
    contenedor2.classList.add('ocultar');
    contenedor3.classList.remove('ocultar');
    creoTarjetaCotizacion();
    document.getElementById('cotizacionCobertura').textContent = "Cobertura Premium";
    document.getElementById('cotizacionValor').textContent = "$ " + sessionStorage.getItem('costoPremium') + " en 3 cuotas de " + sessionStorage.getItem('cuotasPremium');
    
}

document.getElementById('contratarStandard').onclick = function () {
    
    contenedor2.classList.add('ocultar');
    contenedor3.classList.remove('ocultar');
    creoTarjetaCotizacion();
    document.getElementById('cotizacionCobertura').textContent = "Cobertura Standard";
    document.getElementById('cotizacionValor').textContent = "$ " + sessionStorage.getItem('costoStandard') + " en 3 cuotas de " + sessionStorage.getItem('cuotasStandard');
    
}

document.getElementById('contratarBasica').onclick = function () {

    contenedor2.classList.add('ocultar');
    contenedor3.classList.remove('ocultar');
    creoTarjetaCotizacion();
    document.getElementById('cotizacionCobertura').textContent = "Cobertura Básica";
    document.getElementById('cotizacionValor').textContent = "$ " + sessionStorage.getItem('costoBasica') + " en 3 cuotas de " + sessionStorage.getItem('cuotasBasica');

}

document.getElementById('confirmar').onclick = function () {

    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  }
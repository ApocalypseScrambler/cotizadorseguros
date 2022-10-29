
document.getElementById('cotizar').onclick = function () {

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

    // Si el vehiculo es un auto subimos un 5% el costo, si es otro subimos un 15%
    const esUnAuto = ["Fiat Cronos", "Peugeot 208", "Toyota Etios", "Chevrolet Cruze", "Renault Kangoo", "Toyota Corolla", "Citroën C4 Cactus"]

    if (esUnAuto.includes(vehiculoCotizado.auto)) {
        coberturaBasica.valor *= 1.05
    } else {
        coberturaBasica.valor *= 1.15
    }

    let cantidadAnios = new Date().getFullYear() - vehiculoCotizado.anio;

    // Aplicamos un 3% de descuento por cada año, sobre el saldo de cada año
    let i = 0;
    while (cantidadAnios != i) {
        coberturaBasica.valor -= coberturaBasica.valor * 3 / 100;
        i += 1;
    }

    // Si el vehiculo es nacional +15%, importado +30% para cobertura Standard
    switch (vehiculoCotizado.fabricacion) {
        case 'nacional':
            coberturaStandard.valor = coberturaBasica.valor * 1.15
            break;
        case 'importado':
            coberturaStandard.valor = coberturaBasica.valor * 1.30
            break;
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
    // Para bajo, mantenemos el costo
    }

    // Cobertura Premium +50% que la Standard
    coberturaPremium.valor = coberturaStandard.valor * 1.5;

    coberturaBasica.costo();
    coberturaStandard.costo();
    coberturaPremium.costo();

    document.getElementById('autoMasAnioCotizado').textContent = "Auto Cotizado: " + vehiculoCotizado.auto + " - Año Cotizado: " + vehiculoCotizado.anio;
    
    if (vehiculoCotizado.fabricacion == 'nacional') {
        document.getElementById('fabricacionMasProvinciaCotizada').textContent = "Fabricación: Nacional" + " - Provincia: " + vehiculoCotizado.provincia;
    } else {
        document.getElementById('fabricacionMasProvinciaCotizada').textContent = "Fabricación: Importado" + " - Provincia: " + vehiculoCotizado.provincia;
    }
    
    document.getElementById('costoBasica').textContent = "$ " + coberturaBasica.valor;
    document.getElementById('costoStandard').textContent = "$ " + coberturaStandard.valor;
    document.getElementById('costoPremium').textContent = "$ " + coberturaPremium.valor;

    document.getElementById('cuotasBasica').textContent = "3 cuotas de $ " + coberturaBasica.cuotas();
    document.getElementById('cuotasStandard').textContent = "3 cuotas de $ " + coberturaStandard.cuotas();
    document.getElementById('cuotasPremium').textContent = "3 cuotas de $ " + coberturaPremium.cuotas();

    const contenedor = document.querySelector('.contenedor');
    contenedor.classList.add('ocultar');
    const contenedor2 = document.querySelector('.contenedor2');
    contenedor2.classList.remove('ocultar');
}

document.getElementById('volver').onclick = function () {

    const contenedor = document.querySelector('.contenedor');
    contenedor.classList.remove('ocultar');
    const contenedor2 = document.querySelector('.contenedor2');
    contenedor2.classList.add('ocultar');

}
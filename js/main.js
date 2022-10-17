
document.getElementById('cotizar').onclick = function () {

    // Se van a ofrecer 3 tipos de coberturas con una base de costo de 3500
    let coberturaBasica = 3500;

    // la cobertura standard se construira a partir del costo de la basica y cambiara dependiendo de la fabricacion del vehiculo
    let coberturaStandard = 0;

    // la cobertura premium será un 50% mayor al costo calculado para standard
    let coberturaPremium = 0;

    let fabricacion = document.querySelector('input[type=radio][name=fabricacion]:checked').value;
    let auto = document.getElementById('seleccionAuto').value;
    let anio = document.getElementById('seleccionAnio').value;

    // Si el vehiculo es un auto subimos un 5% el costo, si es otro subimos un 15%
    if (auto == 'cronos' || auto == '208' || auto == 'etios' || auto == 'cruze' || auto == 'kangoo' || auto == 'corolla' || auto == 'cactus') {
        coberturaBasica *= 1.05
    } else {
        coberturaBasica *= 1.15
    }

    let cantidadAnios = new Date().getFullYear() - anio;

    // Aplicamos un 3% de descuento por cada año, sobre el saldo de cada año
    let i = 0;
    while (cantidadAnios != i) {
        coberturaBasica -= coberturaBasica * 3 / 100;
        i += 1;
    }

    // Si el vehiculo es nacional +15%, importado +30% para cobertura Standard
    switch (fabricacion) {
        case 'nacional':
            coberturaStandard = coberturaBasica * 1.15
            break;
        case 'importado':
            coberturaStandard = coberturaBasica * 1.30
            break;
    }

    // Cobertura Premium +50% que la Standard
    coberturaPremium = coberturaStandard * 1.5;

    coberturaBasica = Math.round(coberturaBasica);
    coberturaStandard = Math.round(coberturaStandard);
    coberturaPremium = Math.round(coberturaPremium);

    switch (auto) {
        case 'cronos':
            auto = "Fiat Cronos"
            break;
        case '208':
            auto = "Peugeot 208"
            break;
        case 'hilux':
            auto = "Toyota Hilux"
            break;
        case 'amarok':
            auto = "Volkswagen Amarok"
            break;
        case 'etios':
            auto = "Toyota Etios"
            break;
        case 'cruze':
            auto = "Chevrolet Cruze"
            break;
        case 'kangoo':
            auto = "Renault Kangoo"
            break;
        case 'ranger':
            auto = "Ford Ranger"
            break;
        case 'corolla':
            auto = "Toyota Corolla"
            break;
        case 'cactus':
            auto = "Citroën C4 Cactus"
            break;
    }
    document.getElementById('autoCotizado').textContent = "Auto Cotizado: " + auto;
    document.getElementById('anioCotizado').textContent = "Año Cotizado: " + anio;
    if (fabricacion == 'nacional') {
        document.getElementById('fabricacionCotizada').textContent = "Fabricación: Nacional";
    } else {
        document.getElementById('fabricacionCotizada').textContent = "Fabricación: Importado";
    }

    document.getElementById('costoBasica').textContent = "$ " + coberturaBasica;
    document.getElementById('costoStandard').textContent = "$ " + coberturaStandard;
    document.getElementById('costoPremium').textContent = "$ " + coberturaPremium;

    document.getElementById('cuotasBasica').textContent = "3 cuotas de $ " + (coberturaBasica / 3).toFixed(2);
    document.getElementById('cuotasStandard').textContent = "3 cuotas de $ " + (coberturaStandard / 3).toFixed(2);
    document.getElementById('cuotasPremium').textContent = "3 cuotas de $ " + (coberturaPremium / 3).toFixed(2);

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

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
        anio: document.getElementById('seleccionAnio').value
    }
    
    // Si el vehiculo es un auto subimos un 5% el costo, si es otro subimos un 15%
    const esUnAuto = ["cronos","208","etios","cruze","kangoo","corolla","cactus"]

    if (esUnAuto.includes(vehiculoCotizado.auto))  {
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

    // Cobertura Premium +50% que la Standard
    coberturaPremium.valor = coberturaStandard.valor * 1.5;

    coberturaBasica.costo();
    coberturaStandard.costo();
    coberturaPremium.costo();

    switch (vehiculoCotizado.auto) {
        case 'cronos':
            vehiculoCotizado.auto = "Fiat Cronos"
            break;
        case '208':
            vehiculoCotizado.auto = "Peugeot 208"
            break;
        case 'hilux':
            vehiculoCotizado.auto = "Toyota Hilux"
            break;
        case 'amarok':
            vehiculoCotizado.auto = "Volkswagen Amarok"
            break;
        case 'etios':
            vehiculoCotizado.auto = "Toyota Etios"
            break;
        case 'cruze':
            vehiculoCotizado.auto = "Chevrolet Cruze"
            break;
        case 'kangoo':
            vehiculoCotizado.auto = "Renault Kangoo"
            break;
        case 'ranger':
            vehiculoCotizado.auto = "Ford Ranger"
            break;
        case 'corolla':
            vehiculoCotizado.auto = "Toyota Corolla"
            break;
        case 'cactus':
            vehiculoCotizado.auto = "Citroën C4 Cactus"
            break;
    }

    document.getElementById('autoCotizado').textContent = "Auto Cotizado: " + vehiculoCotizado.auto;
    document.getElementById('anioCotizado').textContent = "Año Cotizado: " + vehiculoCotizado.anio;
    
    if (vehiculoCotizado.fabricacion == 'nacional') {
        document.getElementById('fabricacionCotizada').textContent = "Fabricación: Nacional";
    } else {
        document.getElementById('fabricacionCotizada').textContent = "Fabricación: Importado";
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
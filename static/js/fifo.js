class Proceso {
    constructor(nombre, entrada, rafagas) {
        this.nombre = nombre;
        this.entrada = entrada;
        this.rafagas = rafagas;
        this.estado = 'No inicializado';
    }
}

var grafico = [];
var procesos = [];

var tiempo = 0; 

function dibujarGrafico(grafico)
{
    console.table(grafico);
    var grafhtml = document.getElementById("grafico");
    
    

    for (let i = 0; i < grafico.length; i++)
    {
        let row = document.createElement("tr");        
        
        for(let j = 0; j < 1; j++){
            let celda = document.createElement("td");
            let texto = document.createTextNode(i);
            celda.appendChild(texto);
            row.appendChild(celda);
        }
        for (let k = 0; k < 1 ; k++) {
            let celda = document.createElement("td");
            let textoProceso = document.createTextNode(grafico[i].proceso.nombre);
            celda.appendChild(textoProceso);
            row.appendChild(celda);
        }

        for (let w = 0; w < 1 ; w++) {
            let celda = document.createElement("td");
            let texto = document.createTextNode(grafico[i].estado);
            celda.appendChild(texto);
            row.appendChild(celda);
        }
            
        for (let l = 0; l < 1 ; l++) {
            let celda = document.createElement("td");
            let textoOS = document.createTextNode(grafico[i].os);
            celda.appendChild(textoOS);
           row.appendChild(celda);
        }
        //row.appendChild(celda);
        grafhtml.appendChild(row);
    }

}
    

function ejecutarListo(proceso) {
    if (proceso.rafagas.length != 0) {
        var rafagaActual = proceso.rafagas[0];

        if (rafagaActual > 0) {
            for (let i = 0; i < rafagaActual; i++) {
                tiempo++;
                grafico.push({
                    proceso: proceso,
                    estado: proceso.estado,
                    os: "ejecutando rafaga actual " + rafagaActual + " de " + proceso.nombre
                });
                console.log("ejecutando rafaga " + i + " de" + rafagaActual + " de " + proceso.nombre);
                proceso.estado = 'Ejecutando';

            } //for

            proceso.rafagas.shift();

            // Post ejecucion: manda a terminados o bloqueados
            if (proceso.rafagas.length === 0) {
                console.log('no existe la siguiente rafaga va a terminados');
                tiempo++;
                grafico.push({
                    proceso: proceso,
                    estado: proceso.estado,
                    os: "Cambiando estado a terminados"
                });
                proceso.estado = 'Terminado';
            } else {
                tiempo++;
                grafico.push({
                    proceso: proceso,
                    estado: proceso.estado,
                    os: "moviendo proceso a bloqueados"
                });
                console.log('existe la siguiente -  bloqueados');
                proceso.estado = 'Bloqueado';

            }
        }
    } //if
} //func




function inicializarProcesos(proceso) {
    var pActual = proceso;
    if (pActual.estado != 'Terminado') {

		console.log('Inicializando p actual: ' + pActual.nombre + ' estado: ' + pActual.estado);

        if (pActual.estado == 'Bloqueado') {
            if (pActual.entrada <= tiempo) {
                console.log("proceso a pasar a listos: " + pActual.nombre)

                grafico.push({
                    proceso: proceso,
                    estado: proceso.estado,
                    os: "Pasando " + pActual.nombre + " a listos"
                });

                pActual.estado = 'Listo'

            }
            else
            {
                 console.log("Proceso " + pActual.nombre + " esperando para entrar");
                grafico.push({
                    proceso: proceso,
                    estado: proceso.estado,
                    os: "Proceso " + pActual.nombre + " esperando para entrar"
                });
            }
            tiempo++;
        } else if (pActual.estado == 'No inicializado') {
					console.log('Inicializando proceso en bloqueados + ' + pActual.nombre)
            grafico.push({
                proceso: proceso,
                estado: proceso.estado,
                os: "Pasando " + pActual.nombre + " a bloqueados"
            });
            pActual.estado = 'Bloqueado'
        }
    }
	else
		{
			console.log('proceso terminado no se inicializa')
		}

} //func



function runFifo(procesos)
{
		let ultimo = 0;
		let terminado = 0;
		let pTerminados ;
    while ( terminado == 0 )
		{ //
			//este for se fija si todos los procesos se completaron
			pTerminados = 0;
			for (let i = 0; i < procesos.length; i++)
				{
					if (procesos[i].estado === 'Terminado')
					{
						console.log('Proceso terminado ' +  procesos[i].nombre);
						pTerminados++;
						console.log('pTerminados: ' + pTerminados);
					}
					if (pTerminados == procesos.length)
						{
							console.log('Se ejecutaron todos');
                            grafico.push({
                             proceso: procesos[ultimo],
                                  estado: procesos[ultimo].estado,
                                    os: "Finalizado"
                });
							terminado = 1;
						}

				}
			//--------------------------------------------

			// Inicializa todos los procesos cada vez que empieza
			for (let i = 0; i < procesos.length; i++)
			{
			 	inicializarProcesos(procesos[i]);
			}


console.log("ultimo " + ultimo);
        // ejecuta el primer listo
			if (procesos[ultimo].estado == 'Listo')
			{
				ejecutarListo(procesos[ultimo]);
                if (ultimo < procesos.length)
                {
                    ultimo++;
                }
			}

			if (ultimo == procesos.length)//para ejecutar secuencialmente
			{

				console.log('Proceso ultimo a 0 - ultimo == procesos.length')
				ultimo = 0;
			}
            
			console.log("ultimo " + ultimo + " despes de ev ejec");
		}
    console.log(procesos);

    dibujarGrafico(grafico);
}



/*
var p1 = new Proceso("pr1", 0, [3, 4 ]);
var p2 = new Proceso("pr2a", 0, [4, 3, 6]);
var p3 = new Proceso("pr3aasd", 9, [6, 6, 1]);
var p4 = new Proceso("pr4DALE", 16, [1, 1, 1, 1, 1, 1, 1]);



runFifo(procesos);
*/ 

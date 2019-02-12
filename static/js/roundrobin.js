/*class Proceso {
    constructor(nombre, entrada, rafagas) {
        this.nombre = nombre;
        this.entrada = entrada;
        this.rafagas = rafagas;
        this.estado = 'No inicializado';
    }
}
*/
var grafico = [];
var procesos = [];

var tiempo = 0; 


var quantum = 2; 

    

function ejecutarListo(proceso) {
     
    if (proceso.rafagas.length != 0) {
        var rafagaActual = proceso.rafagas[0];
        let tEjecutados = 0; 
        if (rafagaActual > 0) {
            for (let i = 0; i < rafagaActual; i++) {
                tiempo++;
                tEjecutados++;
                grafico.push({
                    proceso: proceso,
                    estado: proceso.estado,
                    os: "ejecutando rafaga actual " + rafagaActual + " de " + proceso.nombre
                });
                console.log("ejecutando rafaga " + i + " de" + rafagaActual + " de " + proceso.nombre);
                proceso.estado = 'Ejecutando';

                if (tEjecutados == quantum)
                {
                	console.log("se ejecuto hasta el quantum")
                	break;
                }

            } //for


//						discutible

            if (tEjecutados == rafagaActual)
            {
            	proceso.rafagas.shift();
            	console.log(" se elimina la rafaga");

			}
			else
			{
				//rafagaActual = rafagaActual;
				console.log(" rafaga despues de ejecucion interrumpida "+proceso.rafagas[0]);
			}


//                  discutible


            // Post ejecucion: manda a terminados o bloqueados
            if (proceso.rafagas.length === 0) {
                console.log('no existe la siguiente rafaga va a terminados');
                tiempo++;
                grafico.push({
                    proceso: proceso,
                    estado: proceso.estado,
                    os: "Cambiando estado a terminado"
                });
                proceso.estado = 'Terminado';
            } else {
                tiempo++;
                grafico.push({
                    proceso: proceso,
                    estado: proceso.estado,
                    os: "Cambiando estado a bloqueado"
                });
                console.log('existe la siguiente :a bloqueados');
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
            tiempo++;
        } else if (pActual.estado == 'No inicializado') {
					console.log('Inicializando proeso en bloqueados + ' + pActual.nombre)
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

function runRoundRobin(procesos)
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
							terminado = 1;
							 grafico.push({
                             proceso: procesos[ultimo],
                                  estado: procesos[ultimo].estado,
                                    os: "Finalizado"
                });
						}

				}
			//--------------------------------------------

			// Inicializa todos los procesos cada vez que empieza
			for (let i = 0; i < procesos.length; i++)
			{
			 	inicializarProcesos(procesos[i]);
			}



        // ejecuta el primer listo
			if (procesos[ultimo].estado == 'Listo')
				{
					ejecutarListo(procesos[ultimo]);
				}

			if (ultimo <= procesos.length)
			{
				ultimo++;
			}

					if (ultimo == procesos.length)//para ejecutar secuencialmente
					{
						console.log('Proceso ultimo a 0')
						ultimo = 0;
					}
			console.log("ultimo " + ultimo);
			}
    console.log(procesos);

    dibujarGrafico(grafico);
}
/*
let p1 = new Proceso("p1", 0, [1, 2]);
let p2= new Proceso("p2", 0, [1, 2]);
let p3= new Proceso("p3 ", 3, [2, 6]);
 

procesos = [p1, p2, p3];

runRoundRobin(procesos);*/
class Proceso {
    constructor(nombre, entrada, rafagas) {
        this.nombre = nombre;
        this.entrada = entrada;
        this.rafagas = rafagas;
        this.estado = 'No inicializado';
    }
}

$(document).ready(function() {

  var procesos = [];

  var max_fields = 10; //maximum input field allowed
  var rafagas = $(".rafagas"); //Rafagas
  var add_button = $(".add_field"); //Add button
  var agregar_proceso = $("#agregar_proceso");
  var x = 1; //initlal text box count
  $(add_button).click(function(e) { //on add input button click
    e.preventDefault(); //undo event
    if (x < max_fields) { //max input box allowed
      x++; //text box increment
      $(rafagas).append('<div class="col input_rafaga"><input class="form-control" min="1" type="number" name="longitud_rafaga[]" placeholder="Longitud de ráfaga "><a href="#" class="remove_field inline-block">remove</a></div>'); //add input box
    }
  });

  $(rafagas).on("click", ".remove_field", function(e) { //user click on remove text
    e.preventDefault();
    $(this).parent('div').remove();
    x--;
  })



  $(agregar_proceso).click(function(event) {
    //event.preventDefault(); //prevent default action
    let cargados = $('#cargados');

    let nombre = $('#nombre_proceso').val();

    let entrada = $('#entrada_proceso').val()
    
    let rafagas = $('input[name="longitud_rafaga[]"]').map(function() {
      return this.value; // $(this).val()
    }).get();

    
    procesos.push(new Proceso(nombre, entrada, rafagas));

    cargados.append("<div class='card m-3'><div class='card-header'><b>Nombre proceso:</b>" +
      nombre + "</div> <div class='card-body'><b>Rafagas: " + rafagas +
      "</b> <div class='card-footer'>Entrada: " + entrada + "</div>")

    $('.input_rafaga').remove();
  });

  $('#procesar').click(function(){

      if (procesos.length != 0)
      {
		  $("#tableGrafico > tr").remove();
        if (document.getElementById("politica_procesador").selectedIndex == 0)
           {
              //alert("running fifo");
               runFifo(procesos);
            }
          else if (document.getElementById("politica_procesador").selectedIndex == 3)
            {
              alert("running rr"); 
                runRoundRobin(procesos);
            }
          else 
          {
            alert("nto running fifo")
          }
      }
      else
       {
        alert("no hay procesos");
      }

        
  });

});

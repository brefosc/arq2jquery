$(document).ready(function () {
    var max_fields = 10; //maximum input field allowed
    var rafagas = $(".rafagas"); //Rafagas
    var add_button = $(".add_field"); //Add button
    var agregar_proceso = $("#agregar_proceso");
    var x = 1; //initlal text box count
    $(add_button).click(function (e) { //on add input button click
        e.preventDefault(); //undo event
        if (x < max_fields) { //max input box allowed
            x++; //text box increment
            $(rafagas).append('<div class="col"><input class="form-control" min="1" type="number" name="longitud_rafaga[]" placeholder="Longitud de ráfaga "><a href="#" class="remove_field">remove x</a></div>'); //add input box
        }
    });

    $(rafagas).on("click", ".remove_field", function (e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    })
});


$(agregar_proceso).click(function (event) {
    //event.preventDefault(); //prevent default action

    let nombre = $('#nombre_proceso').val();
    let entrada = $('#entrada_proceso').val()
    let cargados = $('#cargados');
    let rafagas = $('input[name="longitud_rafaga[]"]').map(function () {
        return this.value; // $(this).val()
    }).get();

    cargados.append("<div class='card'> <div class='card-header'><b>Nombre: </b>" + nombre + "</div> " + " <div class='card-body'>Rafagas: " + rafagas + "</div> <div class='card-footer'>Tiempo de entrada " + entrada + "</div> </div>");
    $('#procesar').trigger('reset');




});

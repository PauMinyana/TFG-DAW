$(document).ready(function() {
    // Realizar la solicitud AJAX
    $.ajax({
        url: 'conexion.php', 
        method: 'GET', 
        dataType: 'json', // Tipo de datos esperados en la respuesta (en este caso, JSON)
        success: function(response) { 
            //  tabla
            var table = $('<table>').addClass('table');

            // Agregar la cabecera de la tabla
            table.append('<tr><th>Nombre</th><th>Tiempo (minutos)</th></tr>');

            // Iterar sobre los datos recibidos 
            $.each(response, function(index, jugador) {
                table.append('<tr><td>' + jugador.nombre + '</td><td>' + jugador.tiempo + '</td></tr>');
            });
            $('#resultado').append(table);
        },
        error: function(xhr, status, error) { 
            //if error
            console.error('Error en la solicitud AJAX:', error);
        }
    });
});
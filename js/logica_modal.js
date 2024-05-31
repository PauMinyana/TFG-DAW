document.addEventListener('DOMContentLoaded', function() {
    // Agregar evento al botón para abrir el modal
    document.getElementById('openModalBtn').addEventListener('click', function() {
        abrirModal();
    });
    

    document.getElementById('closeModalBtn').addEventListener('click', function() {
        cerrarModal();
    });

    
    document.getElementById('reiniciarBtn').addEventListener('click', function() {
        cerrarModal();
        //no es nota res, refrescar la pagina i ja estaaa.
        location.reload();
    });

    if (typeof gameover !== 'undefined' && gameover === true) {
        document.getElementById('openModalBtn').click();
       
    }
    
    
    // Función para abrir el modal
    function abrirModal() {
        $("#myModal").show();
        cargarDatos();
        
    
    }
    // Función para cerrar el modal
    function cerrarModal() {
        $("#myModal").hide();
    }

    // Función para cargar los datos en la tabla
    function cargarDatos() {
        $.ajax({
            url: 'select.php',
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                var tabla = $("#tablaDatos");
                var tbody = tabla.find("tbody");
                tbody.empty();
                response.forEach(function(jugador) {
                    var fila = $("<tr>");
                    fila.append($("<td>").text(jugador.nombre));
                    fila.append($("<td>").text(jugador.tiempo));
                    tbody.append(fila);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud AJAX:', error);
            }
        });
    }


        // Función para guardar los datos en la base de datos
        document.getElementById('guardarBtn').addEventListener('click', function() {
            var nombre = $("#nombre").val(); 
        
            // Verificar si el campo nombre tiene algo
            if (nombre.trim() === "") {
                alert("El nombre no puede estar vacío"); 
            } else {
                guardarDatos(); 
                limpiarCampos();
            }
        });
    
    function guardarDatos() {
        var nombre = $("#nombre").val();
        var tiempo = $("#tiempo").val();
        $.ajax({
            url: 'insert.php',
            method: 'POST',
            data: { nombre: nombre, tiempo: tiempo },
            success: function(response) {
                if (response.success) {
                    cargarDatos(); 
                } else {
                    alert("Error al guardar los datos");
                }
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud AJAX:', error);
            }
        });
    }

    function limpiarCampos() {
        $("#nombre").val(""); 
        $("#tiempo").val("");
        $("#nombre").prop("disabled", true);
       
    }
});

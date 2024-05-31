<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/boton_inicio.css">
    <script>
        function mostrarTiempoEnModal(tiempo) {
    const tiempoInput = document.getElementById('tiempo');
    if (tiempoInput) {
        tiempoInput.value = tiempo + ' s'; // Mostrar el tiempo en el input
    } 
}

        
    </script>
</head>
<body>
    <audio id="modalMusica" autoplay loop>
        <source src="./music/gameOver.mp3" type="audio/mpeg">
        Tu navegador no soporta el elemento de audio.
    </audio>


<div id="myModal" class="modal">
  <div class="modal-content">
  <h1>Game Over</h1>
    
    <input type="text" id="nombre" class="modal-input" placeholder="Nombre"><br>
    <input type="text" id="tiempo" class="modal-input" placeholder="Tiempo (minutos)" readonly><br>
    <button id="guardarBtn" class="retro-btn">Guardar</button>

    

    <!-- TABLA  -->
    <table id="tablaDatos">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Tiempo (minutos)</th>d
            </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>
    <!-- Botón de cierre del modal -->
    <span class="close" id="closeModalBtn" style="display: none;">&times;</span>

    <button id="reiniciarBtn" class="retro-btn-inverse">Reiniciar</button>

  
  </div>
</div>


</body>
</html>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Juego</title>
    <link rel="stylesheet" href="css/inicio.css"> 
    
</head>
<body>
<!-- 
    <audio loop autoplay>
        <source src="inicio.mp3" type="audio/mpeg">
        Tu navegador no soporta el elemento de audio.
    </audio> -->

    <audio controls loop>
        <source src="inicio.mp3" type="audio/mpeg">
        Tu navegador no soporta el elemento de audio.
    </audio>

<div id="pantallaInicio" class="mostrar">
    <h1>¡Bienvenido a esta pequeña historia!</h1>
    <div id="bienvenida">
        <h3>¡Prepárate para la aventura!</h3>
        <p>Nevesitarás:</p>
        <p><strong>Movimiento:</strong> A / W / D </p>
        <p><strong>Agua:</strong> Click Izquierdo</p>
    </div>
    <button id="jugarBtn">Historia</button>
</div>

<div id="historia">
    <h1>En alguna ciudad, dentro de alguna casa...</h1>
    <p><strong>Hijo:</strong>Mira papá, me acabo de comprar estos patines para los pies, ¡¡son roboticos!!</p>
    <p><strong>Padre:</strong>Que bien, Hijo, enseñamelos luego, que tengo que comer.</p>
    <p><strong>Hijo:</strong>Claro, tienes la comida en la mesa, también esta tu salsa preferida.</p>
    <p><strong>Padre:</strong>Ah, que bien, por que hoy vengo con hambre.</p>
    <p><strong>Hijo:</strong>Voy a probar los patines...agh...casi...no me entran...</p>
    <p><strong>Padre:</strong>Hijo, que salsa me has dado???</p>
    <p><strong>Hijo:</strong>...</p>
    <p><strong>Padre:</strong>¡¡ahhhhhhh, me quemaaaaaaaaa!!</p>
    <p><strong>Hijo:</strong>Papá, donde vas?!?!?!</p>
    <button id="jugarDesdeHistoriaBtn">Jugar</button>
</div>

<script src="js/inicio.js"></script> 
</html>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>a.php</title>
    <link rel="stylesheet" href="css/boton_inicio.css">
    <script src="https://unpkg.com/brain.js"></script>
    <script src="https://cdn.rawgit.com/BrainJS/brain.js/45ce6ffc/browser.js"></script>

    
    <style>
        
        body {
            background-image: url('./imagenes/mapa1.png');
            background-repeat: no-repeat;
            background-size: 1024px 576px;
            background-position-x: 50%; 
        }
        :root{
            background: rgb(36,8,0);
            background: linear-gradient(90deg, rgba(36,8,0,1) 0%, rgba(195,166,65,1) 51%, rgba(255,75,0,1) 100%);
        }

        #myCanvas {
            position: relative;
            left: 50%; 
            transform: translateX(-50%); 
            width: 1024px; 
            max-width: 1024px;
            border: 1px solid #000;
            max-height: 576px;
        }   
        
        
    
    </style>
</head>
<body>
    <audio id="fondoMusica" loop autoplay>
        <source src="./music/mapas.mp3" type="audio/mpeg">
        Tu navegador no soporta el elemento de audio.
    </audio>

    
    <?php include 'modal.php'; ?>
    <canvas id="myCanvas" width="1024" height="576"></canvas>
    <button id="openModalBtn" hidden>Abrir Modal</button>
  
<!-- Script para manejar el modal -->
<script>
    //si esta true abre el modal, si esta en false el modal permanece escondido
    var gameover = false;
</script>
<script type="module" src="js/juego/app.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="js/logica_modal.js"></script>
<script type="module" src="js/juego/js/clases/enemy.js"></script>
<script type="module" src="js/juego/js/clases/Player.js"></script>



</body>
</html>

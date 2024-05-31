document.addEventListener('DOMContentLoaded', function() {
    const pantallaInicio = document.getElementById('pantallaInicio');
    const historia = document.getElementById('historia');
    const historiaParrafos = document.querySelectorAll('#historia p');
    const jugarBtn = document.getElementById('jugarBtn');
    const jugarDesdeHistoriaBtn = document.getElementById('jugarDesdeHistoriaBtn');

   

    // Función para mostrar la historia de forma animada
    function mostrarHistoria() {
        historia.style.display = 'block'; 
        pantallaInicio.style.display = 'none'; 
        jugarDesdeHistoriaBtn.style.display = 'block'; 
    
        let index = 0;
        const interval = setInterval(() => {
            historiaParrafos[index].classList.add('mostrar');
            index++;
            if (index >= historiaParrafos.length) {
                clearInterval(interval);
            }
        }, 5000); // Intervalo de 5 segundos entre cada párrafo
    }
    
    jugarBtn.addEventListener('click', function() {
        mostrarHistoria(); 
        var audio = document.getElementById('audioPlayer');
        audio.play();
    });

    
    jugarDesdeHistoriaBtn.addEventListener('click', function() {
        // Redirigir a inicio_juego.php
        window.location.href = 'inicio_juego.php';
    });
});



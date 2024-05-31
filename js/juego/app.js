 
import Enemy from './js/clases/enemy.js';
import Player from './js/clases/Player.js';
import CollisionDetector from './js/colisiones/colisiones.js';
import net from './js/red_neuronal.js';

const canvas = document.getElementById('myCanvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

let contador = 0; // Variable global para almacenar el tiempo del contador
let contadorInterval; // Variable para almacenar el intervalo del contador

function startContador() {
    stopContador(); // Detener cualquier intervalo de contador existente
    contadorInterval = setInterval(() => {
        contador++;
        // Dibujar el contador en el canvas
        drawContador();
    }, 1000); // Intervalo de 1 segundo (1000 milisegundos)
}

function stopContador() {
    clearInterval(contadorInterval);
}

function drawContador() {
    c.font = '20px Arial'; // Establecer el tamaño y el tipo de fuente
    c.fillStyle = 'black'; // Establecer el color de relleno
    c.fillText(`${contador} segundos`, canvas.width - 200, 30); // Dibujar el contador en la parte derecha del canvas
}

// Llamar a la función para iniciar el contador cuando se cargue el canvas
startContador();
const mapNames = ['mapa1.png', 'mapa2.png', 'mapa3.png'];

function createEntities(mapNames) {
    // Limpiar el arreglo de enemigos
    const enemies = [];
    const player = new Player(c);
    const enemyY = canvas.height - 80; // Posición inicial Y del enemigo

    // Generar un random de 2 a 4 enemigos en diferentes posiciones x
    const numEnemies = Math.floor(Math.random() * 3) + 2; // Random de 2 a 4 enemigos
    for (let i = 0; i < numEnemies; i++) {
        // Generar una posición x aleatoria para el enemigo
        const enemyX = Math.random() * (canvas.width - 50); // Rango de posición x entre 0 y el ancho del canvas menos el ancho del enemigo
        // Crear el enemigo en la posición x generada y y=0
        const newEnemy = new Enemy(c, enemyX, enemyY, 25, './imagenes/llama.png', { x: 0, y: 0 }, 3);
        
        // Si no es el mapa actual, establecer la velocidad del enemigo en cero
        if (mapNames !== mapNames[currentMapIndex]) {
            newEnemy.velocity = { x: 0, y: 0 };
        }

        enemies.push(newEnemy);
    }
    
    return { enemies, player };
}


const currentMapIndex = mapNames.findIndex(name => $('body').css('background-image').includes(name));
const nextMapName = mapNames[currentMapIndex + 1];

// Llamar a la función y obtener los enemigos y el jugador
const { enemies , player } = createEntities(mapNames[currentMapIndex]);

enemies.push(...enemies);
startContador();

let gameover = false;

let balls = []; // Arreglo para almacenar las bolas disparadas por el jugador


const keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
};

// Función para dibujar las bolas disparadas por el jugador
function drawBalls() {
    balls.forEach(function (ball) {
        c.fillStyle = ball.color;
        c.beginPath();
        c.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        c.fill();
    });
}

// Función para actualizar las bolas disparadas por el jugador
function updateBalls() {
    balls.forEach(function (ball, index) {
        ball.x += ball.velocity.x;
        ball.y += ball.velocity.y;

        // Verificar colisión del disparo con cualquier enemigo vivo
        enemies.forEach((enemy) => {
            if (enemy.isAlive() && CollisionDetector.checkCircleCollision(ball, enemy)) {
                // Realizar acciones cuando hay colisión entre la bola y el enemigo
                enemy.checkHit(); // Verificar impacto y reducir vida del enemigo
                // Eliminar la bola del arreglo de bolas
                balls.splice(index, 1);
            }
        });
    });
}



function checkEnemiesInCanvas() {
    const anyAlive = enemies.some(enemy => enemy.isAlive());
    console.log('¿Hay enemigos en el canvas?', anyAlive);
}

//verificar si el jugador se sale del canvas por el lado derecho


let modalOpened = false; // Bandera para rastrear si el modal ya se ha abierto
let gameRunning = true; // Bandera para rastrear si el juego está en ejecución


function animate() {
    if (!gameRunning) return; // Si el juego no está en ejecución, sal de la función de animación

    window.requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    // Verificar si el jugador ha pasado el extremo derecho del canvas y restablecer posiciones si es necesario
    checkCanvasBounds();

    // Actualizar la posición del jugador
    player.velocity.x = 0;
    if (keys.d.pressed) {
        player.velocity.x = 5;
    } else if (keys.a.pressed && player.position.x > 0) { // Verificar si el jugador está dentro del límite izquierdo
        player.velocity.x = -5;
    }
    player.draw();
    player.update();

    // Dibujar y actualizar enemigos
    enemies.forEach((enemy) => {
        if (enemy.isAlive()) {
            // Obtener la posición actual del jugador
            const playerX = player.position.x;
            const playerY = player.position.y;

            // Utilizar la red neuronal para predecir la velocidad en función de la poss. del jugadoir
            const { speedX, speedY } = net.run({ x: playerX, y: playerY });

            // Actualizar la posición del enemigo en función de las velocidades predichas
            enemy.x += speedX;
            enemy.y += speedY;

            enemy.draw();
            enemy.update();

            // Verificar colisión del jugador con el enemigo
            const maxDistanceSquared = 1000; // Si quieres una distancia máxima de 100 unidades, el cuadrado sería 10000
            if (CollisionDetector.checkCircleRectangleCollision(
                { x: player.position.x + player.width / 2, y: player.position.y + player.height / 2, radius: player.width / 2 }, // Jugador
                { x: enemy.x, y: enemy.y, width: enemy.radius * 2, height: enemy.radius * 2 }, // Enemigo
                maxDistanceSquared
            )) {
                // Realizar acciones cuando hay colisión entre el jugador y el enemigo
                let estadoDelJugador;
                const tiempo = contador; // Obtener el valor actual del contador
                estadoDelJugador = player.checkHit(); // Verificar impacto y reducir vida del jugador
                estadoDelJugador == 1 ? (mostrarTiempoEnModal(tiempo), document.getElementById('openModalBtn').click()) : false;
                estadoDelJugador == 1 ? stopGame() : false;
            }

            CollisionDetector.predictEnemyMovement(player, enemy, maxDistanceSquared);
        }
    });

    player.drawHearts(); // Dibujar los corazones
    drawContador(); // Actualizar el contador en cada fotograma

    drawBalls(); // Dibujar las bolas disparadas por el jugador
    updateBalls(); // Actualizar las bolas disparadas por el jugador

    // Verificar si el juego ha finalizado y detener el contador si es necesario
    if (gameover && !modalOpened) {
        stopContador(); // Detener el contador
        const tiempo = contador; // Obtener el valor actual del contador
        
        modalOpened = true; // Establecer la bandera modalOpened a true para evitar abrir el modal varias veces
        
        
        stopGame(); // Detener el juego
        
        
    }
    
    // Verificar si el juego sigue en ejecución
    if (!gameRunning) {
        return; // Salir del bucle de animación si el juego ya no está en ejecución
    }
}


function checkCanvasBounds() {
    // Verificar si el jugador ha pasado el extremo derecho del canvas y el modal no se ha abierto
    if (player.position.x > canvas.width && !modalOpened && currentMapIndex !== mapNames.length - 1) {
        // Verificar si quedan enemigos vivos en el mapa actual
        const anyAlive = enemies.some(enemy => enemy.isAlive());
        
        // Si quedan enemigos vivos, eliminarlos
        if (anyAlive) {
            enemies.length = 0; // Limpiar el arreglo de enemigos
        }

        // Obtener el índice actual del mapa
        const currentMapIndex = mapNames.findIndex(name => $('body').css('background-image').includes(name));

        // Verificar si el mapa actual es el último
        if (currentMapIndex === mapNames.length - 1) {
            // Cambiar el valor de gameover a true
            gameover = true;
            modalOpened = true; // Establecer la bandera a true para evitar abrir el modal repetidamente

            // Mostrar el modal si gameover es true
            if (gameover) {
                const tiempo = contador;
                // Simular clic en el botón para abrir el modal
                document.getElementById('openModalBtn').click();
                mostrarTiempoEnModal(tiempo);
                stopGame(); // Detener el juego
                gameRunning = false;
                stopContador(); // Detener el contador solo si el modal no se ha abierto
                clearInterval(contadorInterval); // Detener el intervalo del contador
            }
            
            // si hace falta la logica del ultima mapa, va quí
            
            return;
        }

        // Obtener el nombre del próximo mapa
        const nextMapName = mapNames[currentMapIndex + 1];

        // Cambiar el fondo del cuerpo del documento HTML al siguiente mapa
        $('body').css('background-image', `url("./imagenes/${nextMapName}")`);

        // Restablecer las posiciones del jugador y del enemigo
        player.position.x = 0;
        player.position.y = 0;

        // Generar nuevos enemigos para el siguiente mapa
        const { enemies: newEnemies, player: newPlayer } = createEntities(nextMapName);
        enemies.length = 0; // Limpiar el arreglo de enemigos existente
        enemies.push(...newEnemies); // Agregar nuevos enemigos al arreglo de enemigos
        
        // si falta, fes el mateix en els enemics
    }
}


function stopGame() {
    if (!modalOpened) { // Verificar si el modal aún no se ha abierto
        stopContador(); // Detener el contador solo si el modal no se ha abierto
        clearInterval(contadorInterval); // Detener el intervalo del contador

        const fondoMusica = document.getElementById('fondoMusica');
    if (fondoMusica) {
        fondoMusica.pause();
        fondoMusica.currentTime = 0; 
    }



// Reproducir la música del modal
    const modalMusica = document.getElementById('modalMusica');
    if (modalMusica) {
        modalMusica.play();
        setTimeout(() => {
            modalMusica.pause();
            modalMusica.currentTime = 0; 
        }, 2000);
    }

    gameRunning = false; // Establecer la bandera gameRunning a false para detener el bucle
    }
}






animate(); // Iniciar la animación del juego

// Event listeners para el movimiento del jugador
window.addEventListener('keydown', (ev) => {
    switch (ev.key) {
        case 'w':
            if (player.velocity.y === 0) player.velocity.y = -20;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
    }
});

window.addEventListener('keyup', (ev) => {
    switch (ev.key) {
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
});

// Event listener para el disparo del jugador
canvas.addEventListener('click', function (event) {
    // Obtener las coordenadas del clic del ratón
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;

    // Obtener la dirección y posición inicial del disparo
    const { x, y, startX } = player.getShootDirection(mouseX);

    // Ajustar la posición inicial del disparo 5 píxeles más abajo
    const newBall = {
        x: startX, // Utilizar la posición inicial del disparo
        y: player.position.y + player.height / 2 + 5, 
        radius: 10,
        color: 'blue',
        velocity: { x: x * 5, y: y * 5 } // Velocidad de la bola en la dirección obtenida
    };

    // Agregar la nueva bola al arreglo de bolas
    balls.push(newBall);
});



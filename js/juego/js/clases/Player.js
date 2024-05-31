
const canvas = document.getElementById('myCanvas');
const cb = canvas.getContext('2d');
//me crec que este contexte esta manejat raro, si el lleve peta
//Este contexto no hace daño a nadie, no tocar, gracias jejeje.

class Player {
    constructor(canvasContext) {
        this.position = { x: 100, y: 100 };
        this.velocity = { x: 0, y: 0 };
        this.width = 100;
        this.height = 110;
        this.sides = { bottom: this.position.y + this.height };
        this.gravity = 1;
        this.opacity = 1.0;
        this.hitOpacity = 0.5;
        this.hitDuration = 1000;
        this.isHit = false;
        this.hitTimer = null;
        this.lives = 5;
        this.image = new Image();
        this.imageLoaded = false;
        this.laimagenEstaCargada = false;
        this.direccionDisparo = 1; // 1 para derecha, -1 para izquierda
        this.canvasContext = canvasContext; // Almacenar el contexto del lienzo

        this.image.onload = () => {
            // La imagen se ha cargado correctamente, puedes dibujarla ahora
            this.draw();
        };
        this.image.src = './imagenes/Captura_personaje.png'; 
        //Manejo de las vidas en forma de corazones en el canvas
        this.hearts = []; // array para almacenar los corazones 
        this.heartImage = new Image();
        this.heartImage.src = './imagenes/corazon.png';
        this.heartImage.onload = () => {
            this.laimagenEstaCargada = true; // Indicar que la imagen del corazón ha sido cargada
            this.draw(); // Dibujar el jugador ahora que la imagen del corazón está cargada
        };
    }

    // Método para dibujar los corazones que representan las vidas del jugador
    drawHearts() {
        const heartWidth = 60; 
        const heartHeight = 60; 
        const heartsSpacing = 1; // Espacio entre los corazones

        for (let i = 0; i < this.lives; i++) {
            const heartX = 10 + (heartWidth + heartsSpacing) * i; // Calcular la posición X del corazón
            const heartY = 10; // Posición Y fija para los corazones en la parte superior del canvas

            // Dibujar el corazón en el contexto del lienzo proporcionado
            this.canvasContext.drawImage(this.heartImage, heartX, heartY, heartWidth, heartHeight);
        }
    }

    draw() {
        cb.clearRect(0, 0, canvas.width, canvas.height);
        cb.globalAlpha = this.isHit ? this.hitOpacity : this.opacity;

        // Escalar la imagen para que se ajuste al tamaño del cuadrado del jugador
        const imageWidth = this.width;
        const imageHeight = (this.image.height / this.image.width) * this.width;

        cb.save(); // important guardar el estat abans de res

        if (this.direccionDisparo === -1) {
            // Voltear horizontalmente si la dirección de disparo es hacia la izquierda
            cb.translate(this.position.x + imageWidth, this.position.y);
            cb.scale(-1, 1);
            cb.drawImage(this.image, 0, 0, imageWidth, imageHeight);
        } else {
            // Dibujar normalmente si la dirección de disparo es hacia la derecha
            cb.translate(this.position.x, this.position.y);
            cb.drawImage(this.image, 0, 0, imageWidth, imageHeight);
        }

        cb.restore(); // Restaurar el estado del contexto

        cb.globalAlpha = 1.0;
    }



    //Función para actualizar el jugador
    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.sides.bottom = this.position.y + this.height;

        if (this.isHit && !this.hitTimer) {
            this.hitTimer = setTimeout(() => {
                this.isHit = false;
                this.hitTimer = null;
            }, this.hitDuration);
        }

        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
        }

        if (this.sides.bottom + this.velocity.y < canvas.height) {
            this.velocity.y += this.gravity;
        } else {
            this.velocity.y = 0;
        }

        if (this.laimagenEstaCargada) {this.draw();} // todo
    }

    reduceLife() {
        this.lives--;
        if (this.lives <= 0) {
            console.log('¡Te has quedado sin vidas!');
            // to do tener un retorno o callback de la cantidad de vidas restantes?
            return(1);
        }else{
            return(0);
        }
    }

    checkHit() {
        if (!this.isHit) {
            let estado = this.reduceLife();
            this.isHit = true;
             // to do tener un retorno o callback del reduceLife?
            return(estado);
        }
    }

    getShootDirection(mouseX) {
        if (mouseX > this.position.x + this.width / 2) {
           // cb.scale(-1,1); intenta modificar pero a veces la imagen no se ha cargado ..
           this.direccionDisparo = 1; // Disparo hacia la derecha
            return { x: 1, y: 0, startX: this.position.x + this.width };
        } else {
           // cb.scale(1,1);
           this.direccionDisparo = -1; // Disparo hacia la izquierda
            return { x: -1, y: 0, startX: this.position.x };
        }
    }
    //todo mirar que pasa que dona to lo rato mal en la consola.
    //ESTAVA MAL ESCRIT!!!!:(
}

export default Player;

//ufffff, ara crec que si que esta be de una vegada.

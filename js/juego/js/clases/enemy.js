
export default class Enemy {
   constructor(context, x, y, radius, imageSrc, width, height, velocity, lives = 3) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.image = new Image();
        this.image.src = imageSrc;
        this.width = 100; // Ancho de la imagen
        this.height = 100; // Altura de la imagen
        this.velocity = velocity;
        this.lives = lives;
        this.hitOpacity = 0.5;
        this.hitDuration = 1000;
        this.isHit = false;
        this.hitTimer = null;
        this.combos = [
            // Combo 1: Movimiento hacia la izquierda
            { movements: [{ x: -10, y: 0 }, { x: -20, y: 0 }, { x: -30, y: 0 }]},
            
            // Combo 2: Movimiento hacia la derecha
            { movements: [{ x: 10, y: 0 }, { x: 20, y: 0 }, { x: 30, y: 0 }]},
            
            // Combo 3: Movimiento diagonal hacia arriba y a la izquierda con regreso al suelo
            { movements: [{ x: -10, y: -10 }, { x: -20, y: -20 }, { x: -30, y: -30 }, { x: 0, y: 30 }]},
            
            // Combo 5: Movimiento hacia abajo
            { movements: [{ x: 0, y: 10 }, { x: 0, y: 20 }, { x: 0, y: 30 }]},
            
            // Combo 6: Salto y retorno al suelo
            { movements: [{ x: 0, y: -10 }, { x: 0, y: -20 }, { x: 0, y: -30 }, { x: 0, y: 30 }]}, 
        ];
        this.currentComboIndex = 0;
        this.currentMovementIndex = 0;
        this.waitTime = 2000; // 2 segundos de espera entre combos
        this.isPerformingCombo = true; // Inicializar isPerformingCombo a true
    }

    draw() {
        if (this.lives > 0) {
            if (this.isHit) {
                this.context.globalAlpha = this.hitOpacity;
            }
    
            // Dibujar el círculo invisible para detección de colisiones
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            this.context.closePath();
            this.context.fillStyle = 'transparent';
            this.context.fill();
    
            // Dibujar la imagen del enemigo dentro del círculo
            this.context.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.width, this.height); // Modificado
    
            // Restaurar la opacidad
            this.context.globalAlpha = 1.0;
        }
    }

    update() {
        if (this.lives > 0) {
            if (this.isHit && !this.hitTimer) {
                this.hitTimer = setTimeout(() => {
                    this.isHit = false;
                    this.hitTimer = null;
                }, this.hitDuration);
            }
    
            if (this.isPerformingCombo) {
                this.performCombo();
            }
        }
    }

    performCombo() {
        const currentCombo = this.combos[this.currentComboIndex];
        if (this.currentMovementIndex < currentCombo.movements.length) {
            const movement = currentCombo.movements[this.currentMovementIndex];
            this.x += movement.x;
            this.y += movement.y;
            this.currentMovementIndex++;
        } else {
            this.completeCombo();
            this.waitAndStartNextCombo();
        }
    }
    //jo crec que aixina esta be...

    completeCombo() {
        this.isPerformingCombo = false;
        this.currentMovementIndex = 0;
    }

    waitAndStartNextCombo() {
        setTimeout(() => {
            this.startNextCombo();
        }, this.waitTime);
    }

    startNextCombo() {
        this.currentComboIndex = (this.currentComboIndex + 1) % this.combos.length;
        this.isPerformingCombo = true;
    }

    reduceLife() {
        this.lives--;
        if (this.lives <= 0) {
            console.log('El enemigo ha sido derrotado');
           //mirar si es aci on tinc que posar mes logica o k
        }
    }

    checkHit() {
        if (!this.isHit) {
            this.reduceLife();
            this.isHit = true;
        }
    }
    //metodo que verifica si el enemigo esta vivo
    isAlive() {
        return this.lives > 0;
    }
}


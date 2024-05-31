//asi hi ha un remix de tot un poc que no se ni com funciona....
import net from './../red_neuronal.js';
//import { calculateDistance } from './js/red_neuronal.js';
//mirar a vore perque no agafa be este import.

export default class CollisionDetector {
    // Método para verificar la colisión entre dos círculos
    static checkCircleCollision(circle1, circle2) {
        const dx = circle1.x - circle2.x;
        const dy = circle1.y - circle2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance < circle1.radius + circle2.radius;
    }





    // Método para verificar la colisión entre un círculo y un rectángulo
    static checkCircleRectangleCollision(circle, rect, maxDistanceSquared) {
        //mirar el punt que estiga mes prop en el cuadrat contra el centre del cercle
        let closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
        let closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
    
        // Calcular la distancia que nia entre el punto más prop y el centre del cercle
        let distanceX = circle.x - closestX;
        let distanceY = circle.y - closestY;
        let distanceSquared = distanceX * distanceX + distanceY * distanceY;
    
        // Verificar si la distancia al cuadrat es menor que el radi al cuadrado del cercle
        if (distanceSquared > maxDistanceSquared) {
            return false; // no hi han colisions si la distancia es major que el limit
        }
    
        return distanceSquared < (circle.radius * circle.radius);
    }


    // Método para utilizar la red neuronal y predecir el movimiento del enemigo después de una colisión
    static predictEnemyMovement(player, enemy, maxDistanceSquared) {
        if (this.checkCircleRectangleCollision(
            { x: player.position.x + player.width / 2, y: player.position.y + player.height / 2, radius: player.width / 2 }, // Jugador
            { x: enemy.x, y: enemy.y, width: enemy.radius * 2, height: enemy.radius * 2 }, // Enemigo
            maxDistanceSquared
        )) {
            // Predecir el siguiente movimiento del enemigo utilizando la red neuronal
            const prediction = net.run({ x: enemy.x, y: enemy.y });
            const speedX = prediction.speedX;
            const speedY = prediction.speedY;

            // Ajustar la posición del enemigo según las predicciones de la red neuronal
            enemy.x += speedX;
            enemy.y += speedY;
        }
    }


}
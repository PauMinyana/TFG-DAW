

// Definir la estructura de la red neuronal
const config = {
    // Definir la cantidad de capas y neuronas en cada capa
    layers: [
        { type: 'input', size: 2 }, // Capa de entrada con 2 neuronas ( para las coordenadas X e Y del jugador)
        { type: 'hidden', size: 8 }, // Capa oculta con 8 neuronas 
        { type: 'output', size: 2 } // Capa de salida con 2 neuronas ( para las velocidades X e Y del enemigo)
    ]
};

// Crear una nueva instancia de la red neuronal
const net = new brain.NeuralNetwork();

// Exportar la red neuronal
export default net;

// Función para entrenar la red neuronal
function trainNeuralNetwork() {
    const trainingData = [
        // Combo 1: izquierda
        { input: { x: 100, y: 200 }, output: { speedX: -0.5, speedY: 0 } },
        { input: { x: 200, y: 200 }, output: { speedX: -0.5, speedY: 0 } },
        { input: { x: 300, y: 200 }, output: { speedX: -0.5, speedY: 0 } },
    
        // Combo 2: derecha
        { input: { x: 100, y: 200 }, output: { speedX: 0.5, speedY: 0 } },
        { input: { x: 200, y: 200 }, output: { speedX: 0.5, speedY: 0 } },
        { input: { x: 300, y: 200 }, output: { speedX: 0.5, speedY: 0 } },
    
        // Combo 3:  diagonal 
        { input: { x: 100, y: 200 }, output: { speedX: -0.5, speedY: -0.5 } },
        { input: { x: 200, y: 210 }, output: { speedX: -0.5, speedY: -0.5 } },
        { input: { x: 300, y: 220 }, output: { speedX: -0.5, speedY: -0.5 } },
    
        // Combo 5:  abajo
        { input: { x: 150, y: 200 }, output: { speedX: 0, speedY: 0.5 } },
        { input: { x: 150, y: 250 }, output: { speedX: 0, speedY: 0.5 } },
        { input: { x: 150, y: 300 }, output: { speedX: 0, speedY: 0.5 } },
    
        // Combo 6: Salto 
        { input: { x: 200, y: 200 }, output: { speedX: 0, speedY: -0.5 } },
        { input: { x: 200, y: 150 }, output: { speedX: 0, speedY: -0.5 } },
        { input: { x: 200, y: 100 }, output: { speedX: 0, speedY: 0.5 } },
        
    ];

    // Entrenar la red neuronal con el conjunto de datos de entrenamiento
    net.train(trainingData);
}

// Llamar a la función para entrenar la red neuronal
trainNeuralNetwork();

// Función para calcular la distancia entre dos puntos 
export function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

<?php
require_once 'crud/class.php';

// Recibir los datos del formulario
$nombre = $_POST['nombre'];
$tiempo = $_POST['tiempo'];

// Conexión a la base de datos
$host = '*****************';
$username = '*************';
$password = '*************';
$database = '*************';

try {
    // Establecer conexión
    $pdo = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Preparar la sentencia SQL 
    $stmt = $pdo->prepare("INSERT INTO canvas (jugador_nombre, jugador_tiempo) VALUES (:nombre, :tiempo)");

    // Bind de parámetros
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':tiempo', $tiempo);

    // Ejecutar la sentencia
    $stmt->execute();

    // Respuesta JSON
    header('Content-Type: application/json');
    echo json_encode(array('success' => true)); 
} catch(PDOException $e) {
    // if error, mandar json
    header('Content-Type: application/json');
    echo json_encode(array('success' => false, 'error' => $e->getMessage()));
}
?>

<?php

require_once 'crud/class.php';

// Uso de la clase MySQLDatabase
$host = '*****************';
$username = '*************';
$password = '*************';
$database = '*************';



$databaseConnection = new mysql($host, $username, $password, $database);
$databaseConnection->connect();

// Cambiamos la consulta SQL para seleccionar todos los registros
$sql = "SELECT * FROM canvas ORDER BY jugador_id ASC";
$results = $databaseConnection->query($sql);

// Crear un array con los datos
$data = array();
foreach ($results as $result) {
    $data[] = array(
        'nombre' => $result['jugador_nombre'],
        'tiempo' => $result['jugador_tiempo']
    );
}

// Devolver los datos como json
header('Content-Type: application/json');
echo json_encode($data);

$databaseConnection->disconnect();


?>

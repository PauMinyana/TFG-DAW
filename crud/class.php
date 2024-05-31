<?php

class mysql {
    private $host;
    private $username;
    private $password;
    private $database;
    private $connection;

    public function __construct($host, $username, $password, $database) {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;
    }

    public function connect() {
        try {
            // Crear una nueva conexión PDO
            $this->connection = new PDO("mysql:host=$this->host;dbname=$this->database", $this->username, $this->password);
            // Configurar PDO para que lance excepciones en caso de errores
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //echo "Conexión exitosa";
        } catch(PDOException $e) {
            // En caso de error, mostrar el mensaje de error
            echo "Error de conexión: " . $e->getMessage();
        }
    }

    public function query($sql) {
        try {
            // Preparar y ejecutar la consulta SQL
            $statement = $this->connection->prepare($sql);
            $statement->execute();
            // Retornar los resultados
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch(PDOException $e) {
            // En caso de error, mostrar el mensaje de error
            echo "Error al ejecutar la consulta: " . $e->getMessage();
        }
    }

    public function disconnect() {
        // Cerrar la conexión PDO
        $this->connection = null;
    }
}


?>



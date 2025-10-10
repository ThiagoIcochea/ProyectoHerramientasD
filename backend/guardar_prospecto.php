<?php
include("conexion.php");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $id_prospecto = $_POST['id_prospecto'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $correo = $_POST['correo'];
    $celular = $_POST['celular'];

   
    $sql = "INSERT INTO prospectos (id_prospecto, nombre, apellido, correo, celular)
            VALUES (?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $id_prospecto, $nombre, $apellido, $correo, $celular);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Registro guardado correctamente"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al guardar: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
?>

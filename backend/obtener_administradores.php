<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=utf-8");
include("conexion.php"); 


$sql = "SELECT id_admin, nombre_admin, email_admin, password , fecha_creacion FROM administradores";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode([
        "status" => "error",
        "message" => "Error al ejecutar la consulta: " . $conn->error
    ]);
    exit;
}

if ($result->num_rows > 0) {
    $administradores = [];
    while ($row = $result->fetch_assoc()) {
        $administradores[] = $row;
    }

    echo json_encode([
        "status" => "success",
        "data" => $administradores
    ], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode([
        "status" => "empty",
        "message" => "No hay administradores registrados."
    ]);
}

$conn->close();
?>

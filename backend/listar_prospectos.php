<?php
include("conexion.php");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$sql = "SELECT id_prospecto, nombre, apellido, correo, celular FROM prospectos";
$result = $conn->query($sql);

$prospectos = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $prospectos[] = $row;
    }
}

echo json_encode($prospectos);

$conn->close();
?>

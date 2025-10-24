<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

include("conexion.php");

try {
   
    $id_prospecto = $_POST['id_prospecto'] ?? null;
    $nombre      = $_POST['nombre'] ?? null;
    $apellido    = $_POST['apellido'] ?? '';
    $correo      = $_POST['correo'] ?? null;
    $celular     = $_POST['celular'] ?? null;

    if (!$id_prospecto || !$nombre || !$correo || !$celular) {
        throw new Exception("Faltan datos requeridos.");
    }

    
    $stmt = $conn->prepare("
        INSERT INTO prospectos (id_prospecto, nombre, apellido, correo, celular, fecha_registro)
        VALUES (?, ?, ?, ?, ?, NOW())
    ");
    $stmt->bind_param("sssss", $id_prospecto, $nombre, $apellido, $correo, $celular);
    $stmt->execute();

    echo json_encode([
        'success' => true,
        'message' => 'Prospecto guardado correctamente'
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

$conn->close();
?>


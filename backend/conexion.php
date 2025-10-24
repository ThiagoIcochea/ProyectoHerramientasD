<?php

$config = include(__DIR__ . '/env.php');

$host = $config['DB_HOST'];
$user = $config['DB_USER'];
$pass = $config['DB_PASS'];
$dbname = $config['DB_NAME'];
$port = $config['DB_PORT'];




$conn = mysqli_init();

mysqli_ssl_set($conn, NULL, NULL, NULL, NULL, NULL);

if (!mysqli_real_connect(
    $conn,
    $host,
    $user,
    $pass,
    $dbname,
    $port,
    NULL,
    MYSQLI_CLIENT_SSL
)) {
    die("Error de conexión SSL: " . mysqli_connect_error());
}

$conn->set_charset("utf8mb4");

?>

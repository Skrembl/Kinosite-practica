<?php
session_start();
if (!isset($_SESSION['akim333'])) {
    die("Доступ запрещён");
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $file = $_POST['file'] ?? '';
    $content = $_POST['content'] ?? '';

    $realBase = realpath("../reviews");
    $realUserPath = realpath($file);
    if (!$realUserPath || strpos($realUserPath, $realBase) !== 0) {
        die("Неверный файл.");
    }

    if (is_writable($file)) {
        file_put_contents($file, $content);
        header("Location: panel.php");
        exit;
    } else {
        echo "Файл недоступен для записи.";
    }
}

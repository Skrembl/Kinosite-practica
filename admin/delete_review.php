<?php
session_start();
if (!isset($_SESSION['akim333'])) {
    http_response_code(403);
    echo "❌ Доступ запрещён.";
    exit;
}

$filename = $_POST['file'] ?? '';

if ($filename && file_exists($filename)) {
    unlink($filename);
    echo "✅ Файл удалён.";
    echo '<br><a href="panel.php">Назад</a>';
} else {
    echo "❌ Файл не найден.";
}

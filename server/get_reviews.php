<?php
// $id = $_GET['id'] ?? '0';
// $filename = "../reviews/reviews_" . $id . ".json";

// if (file_exists($filename)) {
//     $json = file_get_contents($filename);
//     echo $json;
// } else {
//     echo json_encode([]);
// }
$id = $_GET['id'] ?? '0';
$filename = "../reviews/reviews_" . $id . ".json"; // Путь к файлу

// Проверяем, существует ли файл
if (file_exists($filename)) {
    // Читаем содержимое файла
    $json = file_get_contents($filename);

    // Выводим содержимое в браузер
    echo "<h1>Отзывы для фильма с ID: $id</h1>";
    echo "<pre>" . htmlspecialchars($json) . "</pre>";
} else {
    echo "<h1>Отзывы не найдены для этого фильма.</h1>";
}

<?php
$id = $_GET['id'] ?? '0';
$filename = "../reviews/reviews_" . $id . ".json";

if (file_exists($filename)) {
    $json = file_get_contents($filename);
    echo $json;
} else {
    echo json_encode([]); // Возвращаем пустой массив, если отзывов нет
}

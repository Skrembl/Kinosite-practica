<?php
$id = $_POST['movie_id'] ?? '0';
$name = $_POST['name'] ?? '';
$review = $_POST['review'] ?? '';
$filename = "../reviews/reviews_" . $id . ".json";

if ($name && $review) {
    $newReview = [
        "name" => htmlspecialchars($name),
        "review" => htmlspecialchars($review),
        "date" => date("Y-m-d")
    ];

    $reviews = [];

    if (file_exists($filename)) {
        $fileContents = file_get_contents($filename);
        $reviews = json_decode($fileContents, true);

        // если вдруг файл повреждён
        if (!is_array($reviews)) {
            $reviews = [];
        }
    }

    // Проверяем на дубли
    foreach ($reviews as $existingReview) {
        if (
            $existingReview['name'] === $newReview['name'] &&
            $existingReview['review'] === $newReview['review']
        ) {
            echo json_encode(['error' => 'Этот отзыв уже существует.']);
            exit;
        }
    }

    // Добавляем новый отзыв в конец
    $reviews[] = $newReview;

    file_put_contents($filename, json_encode($reviews, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo json_encode(['success' => true]);
}

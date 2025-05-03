<?php
session_start();

$id = $_POST['movie_id'] ?? '0';
$name = $_POST['name'] ?? '';
$review = $_POST['review'] ?? '';
$filename = "../reviews/reviews_" . $id . ".json";

$oneMinute = 60;
$currentTime = time();

if (isset($_SESSION['lastReviewTime'])) {
    $lastReviewTime = $_SESSION['lastReviewTime'];
    $timeDifference = $currentTime - $lastReviewTime;

    if ($timeDifference < $oneMinute) {
        $remainingTime = $oneMinute - $timeDifference;
        echo json_encode(['error' => "Вы можете отправить следующий отзыв через $remainingTime секунд."]);
        exit;
    }
}

if (strlen($name) < 2) {
    echo json_encode(['error' => 'Имя должно быть не меньше 2 символов.']);
    exit;
}

if (strlen($review) < 3) {
    echo json_encode(['error' => 'Сообщение должно быть не меньше 3 символов.']);
    exit;
}

$newReview = [
    "name" => htmlspecialchars($name),
    "review" => htmlspecialchars($review),
    "date" => date("Y-m-d")
];

$reviews = [];

if (file_exists($filename)) {
    $fileContents = file_get_contents($filename);
    $reviews = json_decode($fileContents, true);

    if (!is_array($reviews)) {
        $reviews = [];
    }
}

foreach ($reviews as $existingReview) {
    if (
        $existingReview['name'] === $newReview['name'] &&
        $existingReview['review'] === $newReview['review']
    ) {
        echo json_encode(['error' => 'Этот отзыв уже существует.']);
        exit;
    }
}

$reviews[] = $newReview;

file_put_contents($filename, json_encode($reviews, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

$_SESSION['lastReviewTime'] = $currentTime;

echo json_encode(['success' => true]);

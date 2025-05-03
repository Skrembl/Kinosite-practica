<?php
<<<<<<< HEAD
=======
session_start(); // Чтобы использовать сессии для хранения времени последней отправки отзыва

>>>>>>> 9486dec (Initial commit)
$id = $_POST['movie_id'] ?? '0';
$name = $_POST['name'] ?? '';
$review = $_POST['review'] ?? '';
$filename = "../reviews/reviews_" . $id . ".json";

<<<<<<< HEAD
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
=======
// 1. Проверка времени последней отправки отзыва
$oneMinute = 60; // 1 минута в секундах
$currentTime = time(); // текущее время в секундах

// Если в сессии уже есть время последней отправки отзыва
if (isset($_SESSION['lastReviewTime'])) {
    $lastReviewTime = $_SESSION['lastReviewTime'];
    $timeDifference = $currentTime - $lastReviewTime;

    // Если с последней отправки прошло меньше 1 минуты, показываем сообщение и прерываем выполнение
    if ($timeDifference < $oneMinute) {
        $remainingTime = $oneMinute - $timeDifference;
        echo json_encode(['error' => "Вы можете отправить следующий отзыв через $remainingTime секунд."]);
        exit; // Прерываем выполнение, чтобы не отправлять отзыв
    }
}

// 2. Проверка на минимальную длину имени и сообщения
if (strlen($name) < 2) {
    echo json_encode(['error' => 'Имя должно быть не меньше 2 символов.']);
    exit;
}

if (strlen($review) < 3) {
    echo json_encode(['error' => 'Сообщение должно быть не меньше 3 символов.']);
    exit;
}

// 3. Создание нового отзыва
$newReview = [
    "name" => htmlspecialchars($name),
    "review" => htmlspecialchars($review),
    "date" => date("Y-m-d")
];

$reviews = [];

// 4. Если файл с отзывами существует, загружаем его
if (file_exists($filename)) {
    $fileContents = file_get_contents($filename);
    $reviews = json_decode($fileContents, true);

    // если файл поврежден или пуст, инициализируем как пустой массив
    if (!is_array($reviews)) {
        $reviews = [];
    }
}

// 5. Проверка на дубли
foreach ($reviews as $existingReview) {
    if (
        $existingReview['name'] === $newReview['name'] &&
        $existingReview['review'] === $newReview['review']
    ) {
        echo json_encode(['error' => 'Этот отзыв уже существует.']);
        exit;
    }
}

// 6. Добавляем новый отзыв в конец
$reviews[] = $newReview;

// 7. Сохраняем отзывы в файл
file_put_contents($filename, json_encode($reviews, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// 8. Обновляем время последней отправки отзыва в сессии
$_SESSION['lastReviewTime'] = $currentTime;

echo json_encode(['success' => true]);
>>>>>>> 9486dec (Initial commit)

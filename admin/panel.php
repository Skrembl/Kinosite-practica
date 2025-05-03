<?php
session_start();
if (!isset($_SESSION['akim333'])) {
    header("Location: login.html");
    exit;
}

$files = glob("../reviews/reviews_*.json");
?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <title>Админ-панель</title>
</head>

<body>
    <h2>Управление отзывами</h2>
    <a href="logout.php">Выйти</a>

    <?php foreach ($files as $file): ?>
        <div style="margin-bottom: 20px; border: 1px solid #ccc; padding: 10px;">
            <h3><?= htmlspecialchars(basename($file)) ?></h3>

            <form action="edit_review.php" method="POST">
                <input type="hidden" name="file" value="<?= htmlspecialchars($file) ?>">
                <textarea name="content" rows="10" style="width:100%;"><?= htmlspecialchars(file_get_contents($file)) ?></textarea><br>
                <button type="submit" onclick="return confirm('Сохранить изменения?')">Сохранить</button>
            </form>

            <form action="delete_review.php" method="POST" style="margin-top: 10px;">
                <input type="hidden" name="file" value="<?= htmlspecialchars($file) ?>">
                <button type="submit" onclick="return confirm('Удалить этот файл с отзывами?')">Удалить</button>
            </form>
        </div>
    <?php endforeach; ?>

</body>

</html>
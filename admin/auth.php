<?php
session_start();

$login = $_POST['login'] ?? '';
$password = $_POST['password'] ?? '';

$correctLogin = 'akim333';
$correctPassword = '135003';

if ($login === $correctLogin && $password === $correctPassword) {
    $_SESSION['akim333'] = true;
    header("Location: panel.php");
} else {
    echo "❌ Неверный логин или пароль.";
}

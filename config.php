<?php
$host = 'localhost'; // Adresa servera
$dbname = 'zadanie4'; // Názov databázy
$username = 'xbolibruch'; // Užívateľské meno
$password = 'heslo123456789'; // Heslo

// Vytvorenie spojenia s databázou pomocou MySQLi
$conn = new mysqli($host, $username, $password, $dbname);

// Kontrola spojenia
if ($conn->connect_error) {
    die("Chyba pri pripájaní k databáze: " . $conn->connect_error);
}


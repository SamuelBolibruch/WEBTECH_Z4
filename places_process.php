<?php

require_once 'config.php';

// Overí, či požiadavka prišla metódou GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $place = $_GET['place'];

    $sql = "SELECT num_of_searches FROM searched_destinations WHERE town = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $place);
    $stmt->execute();
    $stmt->bind_result($numOfSearches);
    $stmt->fetch();
    $stmt->close();

    // Nastaviť hodnotu na 0, ak je null
    if ($numOfSearches === null) {
        $numOfSearches = 0;
    }

    // Vytvoriť asociatívne pole s počtom vyhľadávaní
    $response = array(
        "numOfSearches" => $numOfSearches
    );

    // Prevést asociatívne pole na JSON
    echo json_encode($response);
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Spracovanie POST požiadavky
    $place = $_GET['place'];
    $country = $_GET['country'];

    // Vytvorenie nového záznamu v tabuľke
    $sql = "INSERT INTO searched_destinations (town, country, num_of_searches) VALUES (?, ?, 1)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $place, $country);
    $stmt->execute();
    $stmt->close();
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Spracovanie PUT požiadavky
    $place = $_GET['place']; // Alebo načítanie údajov, ktoré sú súčasťou tela požiadavky

    // Aktualizácia existujúceho záznamu v tabuľke
    $sql = "UPDATE searched_destinations SET num_of_searches = num_of_searches + 1 WHERE town = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $place);
    $stmt->execute();
    $stmt->close();
}

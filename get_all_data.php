<?php

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Získanie informácií z troch rôznych tabuliek v databáze
    $sql1 = "SELECT num_of_connections FROM connections WHERE id = 1";
    $result1 = $conn->query($sql1);
    $data1 = $result1->fetch_assoc();

    $sql2 = "SELECT * FROM time_connections";
    $result2 = $conn->query($sql2);
    $data2 = $result2->fetch_assoc();


    $sql3 = "SELECT * FROM searched_destinations";
    $result3 = $conn->query($sql3);
    $data3 = $result3->fetch_all(MYSQLI_ASSOC);

    // Spojenie informácií do jedného asociatívneho poľa
    $response = array(
        "connections" => $data1,
        "time_connections" => $data2,
        "searched_destinations" => $data3
    );

    // Prevod asociatívneho poľa na JSON a výstup klientovi
    echo json_encode($response);

}
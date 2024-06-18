<?php

require_once 'config.php';

// Kontrola, či bol požiadavka odoslaná pomocou POST metódy
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Overenie, či bol správne zaslaný kľúč "ip_address"
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['ip_address'])) {
        // Priradenie odoslanej IP adresy do premennej
        $ip_address = $data['ip_address'];

        $ipInfo = file_get_contents('http://ip-api.com/json/' . $ip_address);
        $ipInfoJson = json_decode($ipInfo);
        $timezone = $ipInfoJson->timezone ?? "UTC";
        date_default_timezone_set($timezone);
        $current_time = date("H:i");

        // echo $current_time;

        
        // Nastavenie session pre danú IP adresu
        session_start();
        
        // Ak session neexistuje alebo expirácia uplynula, nastavíme novú session
        if (!isset($_SESSION['expire_time']) || $_SESSION['expire_time'] < time()) {
            $id = 1; // ID, ktoré hľadáte
            $sql = "UPDATE connections SET num_of_connections = num_of_connections + 1 WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $id);
            $stmt->execute();
        
            // Overenie, či bola aktualizácia úspešná
            if ($stmt->affected_rows > 0) {
                $time_range = null;
                if ($current_time >= "06:00" && $current_time < "15:00") {
                    $time_range = "time_range_1";
                } elseif ($current_time >= "15:00" && $current_time < "21:00") {
                    $time_range = "time_range_2";
                } elseif ($current_time >= "21:00" && $current_time < "24:00") {
                    $time_range = "time_range_3";
                } else {
                    $time_range = "time_range_4";
                }

                // Ak máme časový rozsah, aktualizujeme príslušný stĺpec v tabuľke `time_connections`
                if ($time_range !== null) {
                    $sql_update_time = "UPDATE time_connections SET $time_range = $time_range + 1";
                    $stmt_update_time = $conn->prepare($sql_update_time);
                    $stmt_update_time->execute();

                    if ($stmt_update_time->affected_rows > 0) {
                        echo "Časový rozsah $time_range bol úspešne aktualizovaný.";
                    } else {
                        echo "Chyba pri aktualizácii časového rozsahu $time_range.";
                    }
                } else {
                    echo "Neplatný časový rozsah.";
                }
            }


        
            // Nastavenie nových hodnôt v session
            $_SESSION['ip_address'] = $ip_address;
            $_SESSION['expire_time'] = time() + (60*10); // 10 sekúnd odteraz
        }
        
    
    } else {
        // Ak kľúč "ip_address" nebol zaslaný, vypíšeme chybu
        echo "Chyba: Kľúč 'ip_address' nebol zaslaný.";
    }
} else {
    // Ak nebola použitá POST metóda, vypíšeme chybu
    echo "Chyba: Požiadavka musí byť odoslaná pomocou POST metódy.";
}
?>

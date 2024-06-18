<?php
session_start();

// Odstráni všetky premenné z aktuálnej session
session_unset();

// Voliteľne môžeš aj zrušiť session
session_destroy();

echo "Session bola vymazaná.";
?>

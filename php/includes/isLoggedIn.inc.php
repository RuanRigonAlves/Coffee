<?php
session_start();

if (isset($_SESSION["username"])) {
    $loggedIn = true;
} else {
    $loggedIn = false;
}

echo $loggedIn ? 'true' : 'false';
?>

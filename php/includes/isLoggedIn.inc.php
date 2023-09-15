<?php
session_start();

$responseData = array();

if (isset($_SESSION["username"])) {
    $loggedIn = true;
    $responseData['isLoggedIn'] = true;
    $responseData['username'] = $_SESSION['username'];
} else {
    $loggedIn = false;
    $responseData['isLoggedIn'] = false;

}

echo json_encode($responseData)
?>

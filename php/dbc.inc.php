<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "coffee";

$connect = new mysqli($servername, $username, $password, $dbname);

if($connect->connect_error){
    echo "Not connected";
    die("Connection failed: " . $connect->connect_error);
}
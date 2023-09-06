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
    echo "Connected";

     $sql = "SELECT * FROM products";
     $result = $connect->query($sql);

     if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            echo " {$row['ID']}, {$row['Name']} ";
        }
     }else {
        echo "0 Results";
     }

$connect->close();
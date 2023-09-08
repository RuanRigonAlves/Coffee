<?php
require_once 'php/includes/dbc.inc.php';

$sql = "SELECT * FROM products";
$result = $connect->query($sql);

if($result->num_rows > 0){
    $coffee = ['productsCategories'=>['drink'=>[],'food'=>[],'dessert'=>[]]];
    while($row = $result->fetch_assoc()){
        $coffee['products'][] = $row;
        $category = $row['category'];

        
        if ($category === 'drink') {
            $coffee['productsCategories']['drink'][] = $row;
        } elseif ($category === 'food') {
            $coffee['productsCategories']['food'][] = $row;
        } elseif ($category === 'dessert') {
            $coffee['productsCategories']['dessert'][] = $row;
        }
   }
}else {
    echo json_encode(["message" => "0 Results"]);
}

$connect->close();

   header('Content-Type: application/json');
   
   echo json_encode($coffee);


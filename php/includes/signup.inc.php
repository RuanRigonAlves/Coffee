<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require('./dbc.inc.php');

    $username = mysqli_real_escape_string($connect, stripslashes($_REQUEST['username']));
    $email = mysqli_real_escape_string($connect, stripslashes($_REQUEST['email']));
    $password = mysqli_real_escape_string($connect, stripslashes($_REQUEST['password']));
    $create_datetime = date("Y-m-d H:i:s");

    // Check if any of the input fields are empty
    if (empty($username) || empty($email) || empty($password)) {
        echo "Please fill in all fields.";
    } else {
        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            echo "Invalid email format.";
        }else{
        // Check if the email is already in the database
        $check_query = "SELECT * FROM `users` WHERE email = '$email'";
        $check_result = mysqli_query($connect, $check_query);

        if (mysqli_num_rows($check_result) > 0) {
            echo "Email is already in use.";
        } else {
            // Insert the user into the database
            $hashed_password = md5($password);
            $insert_query = "INSERT INTO `users` (username, email, password, create_datetime) 
                            VALUES ('$username', '$email', '$hashed_password', '$create_datetime')";
            $insert_result = mysqli_query($connect, $insert_query);

            if ($insert_result) {
                $_SESSION["username"] = $user['username'];

                echo "Success";
            } else {
                echo "Registration failed. Please try again later.";
            }
        }
    }
    }
} else {
    die();
}

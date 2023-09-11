<?php
    session_start();

if(!isset($_SESSION["username"])){

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        require('./dbc.inc.php');

        $email = mysqli_real_escape_string($connect, $_POST['email']);
        $password = mysqli_real_escape_string($connect, $_POST['password']);

        // Check if the email and password are not empty
        if (!empty($email) && !empty($password)) {
            // Retrieve the user with the given email from the database
            $query = "SELECT * FROM `users` WHERE email = '$email'";
            $result = mysqli_query($connect, $query);

            if (mysqli_num_rows($result) == 1) {
                $user = mysqli_fetch_assoc($result);
                $hashed_password = md5($password);
                // Check if the provided password matches the stored password
                if ($hashed_password == $user['password']) {
                    // You can add session handling or redirect the user to a dashboard here.
                    $_SESSION["username"] = $user['username'];

                    echo "Success";
                } else {
                    echo "Incorrect password.";
                }
            } else {
                echo "User not found.";
            }
        } else {
            echo "Please fill in all fields.";
        }
    } else {
        // If not a POST request, redirect or display an error message.
        die();
    }
}else{
    echo "You are already logged in as " . $_SESSION["username"];
}



?>

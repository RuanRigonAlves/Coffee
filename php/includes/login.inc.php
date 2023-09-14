<?php
    session_start();

if(!isset($_SESSION["username"])){

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        require('./dbc.inc.php');

        $email = mysqli_real_escape_string($connect, $_POST['email']);
        $password = mysqli_real_escape_string($connect, $_POST['password']);

        if (!empty($email) && !empty($password)) {
            $query = "SELECT * FROM `users` WHERE email = '$email'";
            $result = mysqli_query($connect, $query);

            if (mysqli_num_rows($result) == 1) {
                $user = mysqli_fetch_assoc($result);
                $hashed_password = md5($password);
                if ($hashed_password == $user['password']) {
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
        die();
    }
}else{
    echo "You are already logged in as " . $_SESSION["username"];
}

?>

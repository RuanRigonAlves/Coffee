<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Coffee</title>
    <link rel="stylesheet" href="./css/style.css" />
    <script type="module" src="./js/controller.js"></script>
  </head>
  <body>
    <header class="header-container">
      <ul class="header-ul">
        <ul class="header-logo-ul">
          <li class="header-logo">Start</li>
        </ul>
        <ul class="header-selection">
          <li class="header-products">Products</li>
          <li class="header-cart">Cart</li>
        </ul>
        <ul class="header-account-ul">
          <?php 
              session_start();
              if(isset($_SESSION["username"])){
                echo '<li class="header-account">' . $_SESSION["username"] . '</li>';
              }else{
                echo '<li class="header-signup">Login</li>';
              }
              ?>
        </ul>
      </ul>
    </header>

    <section class="main-section">
    
      <div class="cart-container">
        <ul class="cart-products">
          <li>
            <!-- <div class="cart-product-holder"> -->

              <div class="cart-image">
                <img src="./images/product-images/ginger ale (1).jpg" alt="">
              </div>
              <input type="number" value="1" min="1" max="50">
              <p>R$2.5</p>
            <!-- </div> -->
          </li>
          <li>
            <!-- <div class="cart-product-holder"> -->

              <div class="cart-image">
                <img src="./images/product-images/ginger ale (1).jpg" alt="">
              </div>
              <input type="number" value="1" min="1" max="50">
              <p>R$2.5</p>
            <!-- </div> -->
          </li>

        </ul>
      </div>

    </section>
  </body>
</html>

<?php

    /**
     * Creates a new product in the products database table
     */

    require_once("functions.php");
    require_once("init.php");

    // Read data from post request
    $name          = mysqli_real_escape_string($con, $_POST['name']);
    $amount        = mysqli_real_escape_string($con, $_POST['amount']);
    $category_id   = mysqli_real_escape_string($con, $_POST['category']);
    $origin        = mysqli_real_escape_string($con, $_POST['origin']);
    $bbd           = mysqli_real_escape_string($con, $_POST['bbd']);
    $producer_id   = mysqli_real_escape_string($con, $_POST['producer']);
    $supplier_id   = mysqli_real_escape_string($con, $_POST['supplier']);
    $selling_price = mysqli_real_escape_string($con, $_POST['selling']);
    $buying_price  = mysqli_real_escape_string($con, $_POST['buying']);

    // Insert data into database
    $result = mysqli_query(
        $con, "INSERT INTO  products (name, producer_id, supplier_id, category_id, amount, selling_price, buying_price, origin, bbd)
               VALUES       ('$name', '$producer_id', '$supplier_id', '$category_id', '$amount', '$selling_price', '$buying_price', '$origin', '$bbd')
    ");

    // Send back process result
    if ($result) {
        $status = 200; // Ok
        echo json_encode(array(
            'description' => 'product created'
        ));
    } else {
        $status = 500; // Internal Server Error
        echo json_encode(array(
            'name' => 'SQL Error',
            'code' => '0002',
            'description' => 'product could not be created'
        ));
    }

?>

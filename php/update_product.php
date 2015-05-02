<?php

    require_once("functions.php");
    require_once("init.php");

    // Read data from post request
    $id            = mysqli_real_escape_string($con, $_POST['id']);
    $name          = mysqli_real_escape_string($con, $_POST['name']);
    $amount        = mysqli_real_escape_string($con, $_POST['amount']);
    $category_id   = mysqli_real_escape_string($con, $_POST['category']);
    $origin        = mysqli_real_escape_string($con, $_POST['origin']);
    $bbd           = mysqli_real_escape_string($con, $_POST['bbd']);
    $producer_id   = mysqli_real_escape_string($con, $_POST['producer']);
    $supplier_id   = mysqli_real_escape_string($con, $_POST['supplier']);
    $selling_price = mysqli_real_escape_string($con, $_POST['selling']);
    $buying_price  = mysqli_real_escape_string($con, $_POST['buying']);

    // Update data in database where id = $id
    $result = mysqli_query(
        $con, "UPDATE   products
               SET      name='$name',
                        amount='$amount',
                        category_id='$category_id',
                        origin='$origin',
                        bbd='$bbd',
                        producer_id='$producer_id',
                        supplier_id='$supplier_id',
                        selling_price='$selling_price',
                        buying_price='$buying_price'
               WHERE    id='$id'
    ");

    // Send back process result
    if ($result) {
        $status = 200; // Ok
        echo json_encode(array(
            'description' => 'product changed'
        ));
    } else {
        $status = 500; // Internal Server Error
        echo json_encode(array(
            'name' => 'SQL Error',
            'code' => '0003',
            'description' => 'product could not be changed'
        ));
    }

?>

<?php

    /**
     * Creates a new supplier in the suppliers database table
     */

    require_once("functions.php");
    require_once("init.php");

    // Read data from post request
    $name     = mysqli_real_escape_string($con, $_POST['name']);
    $street   = mysqli_real_escape_string($con, $_POST['street']);
    $zip_code = mysqli_real_escape_string($con, $_POST['zip']);
    $town     = mysqli_real_escape_string($con, $_POST['town']);
    $country  = mysqli_real_escape_string($con, $_POST['country']);

    // Insert data into database
    $result = mysqli_query(
        $con, "INSERT INTO  suppliers (name, street, zip_code, town, country)
               VALUES       ('$name', '$street', '$zip_code', '$town', '$country')
    ");

    // Send back process result
    if ($result) {
        $status = 200; // Ok
        echo json_encode(array(
            'description' => 'supplier created'
        ));
    } else {
        $status = 500; // Internal Server Error
        echo json_encode(array(
            'name' => 'SQL Error',
            'code' => '0002',
            'description' => 'supplier could not be created'
        ));
    }

?>

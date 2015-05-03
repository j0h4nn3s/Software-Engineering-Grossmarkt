<?php

    /**
     * Updates a producer selected by id in the producers database table
     */

    require_once("functions.php");
    require_once("init.php");

    // Read data from post request
    $id       = mysqli_real_escape_string($con, $_POST['id']);
    $name     = mysqli_real_escape_string($con, $_POST['name']);
    $street   = mysqli_real_escape_string($con, $_POST['street']);
    $zip_code = mysqli_real_escape_string($con, $_POST['zip']);
    $town     = mysqli_real_escape_string($con, $_POST['town']);
    $country  = mysqli_real_escape_string($con, $_POST['country']);

    // Update data in database where id = $id
    $result = mysqli_query(
        $con, "UPDATE   producers
               SET      name='$name',
                        street='$street',
                        zip_code='$zip_code',
                        town='$town',
                        country='$country'
               WHERE    id='$id'
    ");

    // Send back process result
    if ($result) {
        $status = 200; // OK
        echo json_encode(array(
            'description' => 'producer changed'
        ));
    } else {
        $status = 500; // Internal Server Error
        echo json_encode(array(
            'name' => 'SQL Error',
            'code' => '0003',
            'description' => 'producer could not be changed'
        ));
    }

?>

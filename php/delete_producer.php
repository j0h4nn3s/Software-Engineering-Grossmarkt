<?php

    require_once("functions.php");
    require_once("init.php");

    // Read data from post request
    $id = mysqli_real_escape_string($con, $_POST['id']);

    // Delete data where id = $id
    $result = mysqli_query(
        $con, "DELETE FROM  producers
               WHERE        id='$id'
    ");

    // Send back process result
    if ($result) {
        $status = 200; // Ok
        echo json_encode(array(
            'description' => 'producer deleted'
        ));
    } else {
        $status = 500; // Internal Server Error
        echo json_encode(array(
            'name' => 'SQL Error',
            'code' => '0002',
            'description' => 'producer could not be deleted'
        ));
    }

?>

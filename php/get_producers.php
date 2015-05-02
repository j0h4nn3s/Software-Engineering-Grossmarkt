<?php

    require_once("functions.php");
    require_once("init.php");

    // Select all producers
    $sql = mysqli_query(
        $con, "SELECT *
               FROM producers
    ");

    // Create result array
    $producers = array();
    if ($sql) {
        while ($row = mysqli_fetch_assoc($sql)) {
            array_push($producers, $row);
        }
    }

    // Send back data with status code
    if (count($producers) > 0) {
        $status = 200; // Ok
        echo json_encode($producers);
    } else {
        $status = 500; // Internal Server Error
        echo json_encode(array(
            'name' => 'SQL Error',
            'code' => '0001',
            'description' => 'No data found'
        ));
    }

?>

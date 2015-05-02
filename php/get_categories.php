<?php

    require_once("functions.php");
    require_once("init.php");

    // Select all categories
    $sql = mysqli_query(
        $con, "SELECT *
               FROM categories
    ");

    // Create result array
    $categories = array();
    if ($sql) {
        while ($row = mysqli_fetch_assoc($sql)) {
            array_push($categories, $row);
        }
    }

    // Send back data with status code
    if (count($categories) > 0) {
        $status = 200; // Ok
        echo json_encode($categories);
    } else {
        $status = 500; // Internal Server Error
        echo json_encode(array(
            'name' => 'SQL Error',
            'code' => '0001',
            'description' => 'No data found'
        ));
    }

?>

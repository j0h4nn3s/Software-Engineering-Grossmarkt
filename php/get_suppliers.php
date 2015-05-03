<?php

    /**
     * Returns all suppliers from the supplier database table
     */

    require_once("functions.php");
    require_once("init.php");

    // Select all suppliers
    $sql = mysqli_query(
        $con, "SELECT *
               FROM suppliers
    ");

    // Create result array
    $suppliers = array();
    if ($sql) {
        while ($row = mysqli_fetch_assoc($sql)) {
            array_push($suppliers, $row);
        }
    }

    // Send back data with status code
    if (count($suppliers) > 0) {
        $status = 200; // Ok
        echo json_encode($suppliers);
    } else {
        $status = 500; // Internal Server Error
        echo json_encode(array(
            'name' => 'SQL Error',
            'code' => '0001',
            'description' => 'No data found'
        ));
    }

?>

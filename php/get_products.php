<?php

    /**
     * Returns all products from the products database table
     */

    require_once("functions.php");
    require_once("init.php");

    // Select all prodcuts and additionally join with producers, suppliers and categories
    $sql = mysqli_query(
        $con, "SELECT       products.id,
                            products.name,
                            products.amount,
                            products.category_id,
                            t3.name AS category_name,
                            products.origin,
                            products.bbd,
                            products.producer_id,
                            t1.name AS producer_name,
                            products.supplier_id,
                            t2.name AS supplier_name,
                            products.buying_price,
                            products.selling_price
               FROM         products
               LEFT JOIN    producers t1    ON t1.id = products.producer_id
               LEFT JOIN    suppliers t2    ON t2.id = products.supplier_id
               LEFT JOIN    categories t3   ON t3.id = products.category_id
    ");

    // Create result array
    $products = array();
    if ($sql) {
        while ($row = mysqli_fetch_assoc($sql)) {
            array_push($products, $row);
        }
    }

    // Send back data with status code
    if (count($products) > 0) {
        $status = 200; // Ok
        echo json_encode($products);
    } else {
        $status = 500; // Internal Server Error
        echo json_encode(array(
            'name' => 'SQL Error',
            'code' => '0001',
            'description' => 'No data found'
        ));
    }

?>

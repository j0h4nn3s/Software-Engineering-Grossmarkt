<?php
require_once("functions.php");
require_once("init.php");
    
//create array for all products
$products = array();
//select all prodcuts and join with producers, suppliers and categories
$sql = mysqli_query($con, "SELECT products.id, products.name, products.selling_price, products.buying_price, products.amount, t2.name AS supplier_name, t1.name AS producer_name, t3.name AS category_name  FROM products products
LEFT JOIN producers t1 ON t1.id = products.producer_id
LEFT JOIN suppliers t2 ON t2.id = products.supplier_id
LEFT JOIN categories t3 ON t3.id = products.category_id");
if ($sql) {
    while ($row = mysqli_fetch_assoc($sql)) {
        //add result from row to products array
        array_push($products, $row);
    }
}
if (count($products)>0)
{
    $status = 200; // OK
    //return the array
    echo json_encode($products);
} else {
    $status = 500; // Internal Server Error
    //return error
    echo json_encode(array(
        'name' => 'SQL Error',
        'code' => '0001',
        'description' => 'No data found'
    ));
}

?>
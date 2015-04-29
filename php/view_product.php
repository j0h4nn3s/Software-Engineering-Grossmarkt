<?php
require_once("functions.php");
require_once("init.php");
    
//read data from post request
$id=mysqli_real_escape_string($con, $_POST['id']);

//create array for product
$product = array();
//Select product where id = $id
$sql = mysqli_query($con, "SELECT products.id, products.name, products.selling_price, products.buying_price, products.order_number, products.amount, products.bbd, products.origin, t2.name AS supplier_name, t1.name AS producer_name, t3.name AS category_name  FROM products products
LEFT JOIN producers t1 ON t1.id = products.producer_id
LEFT JOIN suppliers t2 ON t2.id = products.supplier_id
LEFT JOIN categories t3 ON t3.id = products.category_id
WHERE id='$id'");
    if ($row = mysqli_fetch_assoc($sql)) {
        //safe result into array
        $product=$row;
    }
//is there a result?
if (count($product)>0)
{
    $status = 200; // OK
    //return the product
    echo json_encode($product);
} else {
    $status = 500; // Internal Server Error
    //return error code
    echo json_encode(array(
        'name' => 'SQL Error',
        'code' => '0001',
        'description' => 'No data found'
    ));
}

?>
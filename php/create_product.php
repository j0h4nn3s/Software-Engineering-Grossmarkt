<?php
require_once("functions.php");
require_once("init.php");

//read data from post request
$name=mysqli_real_escape_string($con, $_POST['name']);
$producer_id=mysqli_real_escape_string($con, $_POST['producer_id']);
$supplier_id=mysqli_real_escape_string($con, $_POST['supplier_id']);
$category_id=mysqli_real_escape_string($con, $_POST['category_id']);
$amount=mysqli_real_escape_string($con, $_POST['amount']);
$selling_price=mysqli_real_escape_string($con, $_POST['selling_price']);
$buying_price=mysqli_real_escape_string($con, $_POST['buying_price']);
$origin=mysqli_real_escape_string($con, $_POST['origin']);
$bbd=mysqli_real_escape_string($con, $_POST['bbd']);

//insert data into database
$result = mysqli_query($con, "INSERT INTO 'products' ('name', 'producer_id', 'supplier_id', 'category_id', 'amount', 'selling_price', 'buying_price', 'origin', 'bbf') VALUES ($name, $producer_id, $supplier_id, $category_id, $amount, $selling_price, $buying_price, $origin, $bbd)");

if ($result) {
            $status = 200; // OK
            //return success information
            echo json_encode(array(
                'description' => 'product created'
            ));
        }
        else {
            $status = 500; // Internal Server Error
            //return error
            echo json_encode(array(
                'name' => 'SQL Error',
                'code' => '0002',
                'description' => 'product could not be created'
            ));
        }

?>
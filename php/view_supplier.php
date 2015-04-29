<?php
require_once("functions.php");
require_once("init.php");
    
//read data from post request
$id=mysqli_real_escape_string($con, $_POST['id']);

//create array for supplier
$supplier = array();
//Select supplier where id = $id
$sql = mysqli_query($con, "SELECT * FROM 'supplier' WHERE id='$id'");
    if ($row = mysqli_fetch_assoc($sql)) {
        //safe result into array
        $supplier=$row;
    }
//is there a result?
if (count($supplier)>0)
{
    $status = 200; // OK
    //return the supplier
    echo json_encode($supplier);
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
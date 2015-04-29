<?php
require_once("functions.php");
require_once("init.php");
    
//create array for all suppliers
$suppliers = array();
//select all suppliers
$sql = mysqli_query($con, "SELECT * FROM suppliers");
if ($sql) {
    while ($row = mysqli_fetch_assoc($sql)) {
        //add result from row to supplier array
        array_push($suppliers, $row);
    }
}
if (count($suppliers)>0)
{
    $status = 200; // OK
    //return the array
    echo json_encode($suppliers);
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
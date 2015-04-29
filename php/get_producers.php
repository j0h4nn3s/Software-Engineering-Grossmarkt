<?php
require_once("functions.php");
require_once("init.php");
    
//create array for all producers
$producers = array();
//select all producers
$sql = mysqli_query($con, "SELECT * FROM producers");
if ($sql) {
    while ($row = mysqli_fetch_assoc($sql)) {
        //add result from row to producers array
        array_push($producers, $row);
    }
}
if (count($producers)>0)
{
    $status = 200; // OK
    //return the array
    echo json_encode($producers);
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
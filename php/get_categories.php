<?php
require_once("functions.php");
require_once("init.php");
    
//create array for all categories
$categories = array();
//select all categories
$sql = mysqli_query($con, "SELECT (name) FROM categories");
if ($sql) {
    while ($row = mysqli_fetch_assoc($sql)) {
        //add result from row to categories array
        array_push($categories, $row);
    }
}
if (count($categories)>0)
{
    $status = 200; // OK
    //return the array
    echo json_encode($categories);
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
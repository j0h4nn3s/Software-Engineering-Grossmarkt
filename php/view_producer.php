<?php
require_once("functions.php");
require_once("init.php");
    
//read data from post request
$id=mysqli_real_escape_string($con, $_POST['id']);

//create array for producer
$producer = array();
//Select producer where id = $id
$sql = mysqli_query($con, "SELECT * FROM 'producers' WHERE id='$id'");
    if ($row = mysqli_fetch_assoc($sql)) {
        //safe result into array
        $producer=$row;
    }
//is there a result?
if (count($producer)>0)
{
    $status = 200; // OK
    //return the producer
    echo json_encode($producer);
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
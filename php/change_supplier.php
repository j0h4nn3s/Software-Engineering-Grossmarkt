<?php
require_once("functions.php");
require_once("init.php");

//read data from post request
$id=mysqli_real_escape_string($con, $_POST['id']);
$name=mysqli_real_escape_string($con, $_POST['name']);
$street=mysqli_real_escape_string($con, $_POST['street']);
$zip_code=mysqli_real_escape_string($con, $_POST['zip_code']);
$town=mysqli_real_escape_string($con, $_POST['town']);
$country=mysqli_real_escape_string($con, $_POST['country']);


//update data in database where id = §id
$result = mysqli_query($con, "UPDATE 'supplier' SET name='$name', street='$street', zip_code='$zip_code', town='$town', country='$country' WHERE id='$id'");

if ($result) {
            $status = 200; // OK
            //return success information
            echo json_encode(array(
                'description' => 'supplier changed'
            ));
        }
        else {
            $status = 500; // Internal Server Error
            //return error
            echo json_encode(array(
                'name' => 'SQL Error',
                'code' => '0003',
                'description' => 'supplier could not be changed'
            ));
        }
?>
<?php
require_once("functions.php");
require_once("init.php");

//read data from post request
$name=mysqli_real_escape_string($con, $_POST['name']);
$street=mysqli_real_escape_string($con, $_POST['street']);
$zip_code=mysqli_real_escape_string($con, $_POST['zip_code']);
$town=mysqli_real_escape_string($con, $_POST['town']);
$country=mysqli_real_escape_string($con, $_POST['country']);

//insert data into database
$result = mysqli_query($con, "INSERT INTO 'supplier' ('name', 'street', 'zip_code', 'town', 'country') VALUES ($name, $street, $zip_code, $town, $country)");

if ($result) {
            $status = 200; // OK
            //return success information
            echo json_encode(array(
                'description' => 'supplier created'
            ));
        }
        else {
            $status = 500; // Internal Server Error
            //return error
            echo json_encode(array(
                'name' => 'SQL Error',
                'code' => '0002',
                'description' => 'supplier could not be created'
            ));
        }

?>
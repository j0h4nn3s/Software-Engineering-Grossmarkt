<?php

    require_once('config.php');

    // Connect to database
    function open_database_connection() {

        // Open connection to database
        if ($con = @mysqli_connect(SQL_HOST, SQL_USER, SQL_PASS, SQL_DB)) {
            mysqli_query($con, 'SET NAMES `utf8`');
            return $con;
        } else {
            // Return error if connecting to database failed
            $GLOBALS['status'] = 500; //Internal Server Error
            die(json_encode(array(
                'description' => 'Keine Verbindung zur Datenbank möglich'
            )));
        }
    }

    // Close connection to databse
    function close_database_connection($con) {
        return mysqli_close($con);
    }

    function teardown() {

        // Echo bufferd output
        global $status;

        $output = ob_get_contents();
        ob_end_clean();

        // Return header with given status
        header("X-PHP-Response-Code: $status", true, $status);
        header('Content-Type: text/json');
        header('Content-Length: '.strlen($output));

        echo $output;

    }

?>

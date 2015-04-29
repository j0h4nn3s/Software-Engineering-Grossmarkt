<?php
    require_once('config.php');

    function open_database_connection() {
        //open the connections to database
        if ($con = @mysqli_connect(SQL_HOST, SQL_USER, SQL_PASS, SQL_DB)) {
            mysqli_query($con, 'SET NAMES `utf8`');
            return $con;
        }
        else {
            //set status to "Internal Server Error"
            $GLOBALS['status'] = 500; //Internal Server Error
            //show error
            die(json_encode(array(
                'discription' => 'Keine Verbindung zur Datenbank möglich'
            )));
        }
    }

    function close_database_connection($con) {
        //close connection to database
        return mysqli_close($con);
    }

    function teardown() {
        //echo bufferd output
        global $status;

        $output = ob_get_contents();
        ob_end_clean();

        //return header with given status
        header("X-PHP-Response-Code: $status", true, $status);
        header('Content-Type: text/json');
        header('Content-Length: '.strlen($output));

        echo $output;
    }
?>

<?php
    //write output to buffer
    ob_start('mb_output_handler');
    //add 'teardown' to shutdown functions
    register_shutdown_function('teardown');

    //status for information
    $status = 200; //OK

    //open connection to database
    $con = open_database_connection();
    //add "close_database_connection" to shutdown functions
    register_shutdown_function('close_database_connection', $con);
?>
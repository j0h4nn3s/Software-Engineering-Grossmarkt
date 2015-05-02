<?php

    // Write output to buffer
    ob_start('mb_output_handler');

    // Add 'teardown' to shutdown functions
    register_shutdown_function('teardown');

    // Set status code to inform client about request response
    $status = 200; // Ok

    // Open connection to database
    $con = open_database_connection();

    // Add "close_database_connection" to shutdown functions
    register_shutdown_function('close_database_connection', $con);

?>

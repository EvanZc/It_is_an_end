<?php
	//use it before anything was sent.
	session_start();
	session_destroy();
	header("Location: ../login/login.php");
?>
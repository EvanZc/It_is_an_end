<?php
	require_once("../../lib/php/allkinds.php");
	$LOGIN_FLAG = 'login_flag';

	$DATABASE_SERVER = 'localhost';
	$DATABASE_ACCOUNT = 'root';
	$DATABASE_PWD = 'superman29';
	$DATABASE_BASENAME = 'myweb';
?>

<?php
	session_start();
	//session exists, go straight.
	if (isset($_SESSION[$LOGIN_FLAG]) && ($_SESSION[$LOGIN_FLAG] == true))
	{
		jsPrintSingleQuote("checkaccount jump to index.php");
		header("Location: ../../index.php");
		exit();
	}
?>

<?php
	//get the form check if the account and pwd is right.
	if (!isset($_POST['text_account']) || !isset($_POST['password_pwd']))
	{
		header("Location: ../login.php?erraccountorpwd");
		exit();
	}

	jsPrintSingleQuote("account is:", $_POST['text_account'], "pwd is:", $_POST['password_pwd']);
	//connect the database to validate the data.
	$conn = mysqli_connect($DATABASE_SERVER, $DATABASE_ACCOUNT, $DATABASE_PWD, $DATABASE_BASENAME);
	if (!$conn)
	{
		mysqli_close($conn);
		header("Location: ../login.php?unknownerror");
		exit();
	}

	$query = "SELECT * FROM user_info WHERE user_account='" . $_POST['text_account'] . "' and user_pwd='" . $_POST['password_pwd'] ."'";
	echo $query . "<br />";
	$res = mysqli_query($conn, $query);
	if ($res->num_rows < 1)
	{
		mysqli_close($conn);
		header("Location: ../login.php?erraccountorpwd");
		exit();
	}

	mysqli_close($conn);

	//if go to here , means ok, set the login flag and head to index.php;
	$_SESSION[$LOGIN_FLAG] = true;
	header("Location: ../../index.php");

?>
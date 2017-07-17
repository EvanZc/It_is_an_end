<?php
	require_once('../databaseset/databaseconfig.php');
	$USER_ACCOUNT = 'usr_account';
	$USER_AUTH    = 'usr_auth';
	session_start();

	$account = $_SESSION[$USER_ACCOUNT];

	$AUTH_MEMBER        = 1;
	$AUTH_SUPER         = 9999;
?>

<?php
	$conn = mysqli_connect($DATABASE_SERVER, $DATABASE_ACCOUNT, $DATABASE_PWD, $DATABASE_BASENAME) or die("Connect to db failed.");
	$query = "SELECT * FROM user_info WHERE user_account='" . $account . "'";
	echo $query;
	$res = mysqli_query($conn, $query);
	if (!$res || ($res->num_rows != 1))
	{
		mysqli_close($conn);
		exit();
	}
	else
	{	
		$res = mysqli_fetch_array($res);
		if (!isset($res[$USER_AUTH]))
		{
			echo 'I am not exists';
		}
		else if ($res[$USER_AUTH] === $AUTH_MEMBER)
		{
			echo 'I am one';
		}
		else if ($res[$USER_AUTH] === $AUTH_SUPER)
		{
			echo 'I am super';
		}
		else
		{
			echo 'I am illigal';
		}
	}
	mysqli_close($conn);
	//if super admin, show super admin page
	//if normal, show normal, later we can save picture.
	//eles hint the user and back to login.
?>

<html>
<head>
	<title>Set your account</title>
</head>
<body>
	<p>You can linger for a while, but never lost.</p>
</body>
</html>
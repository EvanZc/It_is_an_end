<?php
    require_once("../lib/php/allkinds.php");
	$LOGIN_FLAG = 'login_flag';

	session_start();

	//session exists, go straight.
	if (isset($_SESSION[$LOGIN_FLAG]) && ($_SESSION[$LOGIN_FLAG] == true))
	{
		jsPrintSingleQuote("checkaccount jump to index.php");
		header("Location: ../index.php");
		exit();
	}
?>

<?php
	if (isset($_GET['unknownerror']))
	{
		echo $_SERVER['PHP_SELF'];
		echo "<script type='text/javascript'> alert('Unknown error, try later.');</script>";
		//unset($_GET['unknownerror']); the unknownerror still exists on the url.
		echo "<script type='text/javascript'> window.location.href = '". $_SERVER['PHP_SELF'] ."'; </script>";
		
	}
	if (isset($_GET['erraccountorpwd']))
	{
		echo "<script type='text/javascript'> alert('Account or password wrong.');</script>";
		echo "<script type='text/javascript'> window.location.href = '". $_SERVER['PHP_SELF'] ."'; </script>";
		//unset($_GET['erraccountorpwd']); the erraccountorpwd still exists on the url.
		//same get info still exists echo "<script type='text/javascript'> window.location.href = location.href; </script>";
	}
	//get the user name and show

?>

<!DOCTYPE html>
<html>
<head>
	<title>The Road Of King</title>
	<link rel="stylesheet" type="text/css" href="login.css">
</head>
<body>
	<section id="section_master">
		<header>
			<img src="/img/login/login_header.png">
		</header>
		<section id="section_login">
			<form action="check/checkaccount.php" method="post" id="form_login">
				<div class="form_row">
					<label>Account:</label>
					<input type="text" id="text_account" name="text_account"/>
				</div>
				<div class="form_row">
					<label>Password:</label>
					<input type="password" id="password_pwd" name="password_pwd"/>
				</div>
				<!-- value必须是"" 否则看得到字-->
				<input type="submit" value="" id="button_login_active" class="login">
				<!-- button的type默认 ie为button 其他为submit 还可以为reset-->
				<button id="button_reg_active" class="login" onclick="location.href='../register/register.php';" type="button"></button>
			</form>
		</section>
		<footer>
			<p>Author: Evan Zeng</p>
		</footer>
	</section>
</body>
</html>
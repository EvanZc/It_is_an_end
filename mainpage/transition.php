<!DOCTYPE html>
<html>
<head>
	<title>Please wait...</title>
</head>
<body>
	<?php 
		//请不要在这一段加上 ** 符号，谢谢
		//tested
		function checkUserAccount($usr_account)
		{
			$acc_len = strlen($usr_account);
			if (($acc_len < 6) or ($acc_len > 16))
			{
				echo "length wrong, the account " . $usr_account . " len is " .  $acc_len . "<br />";
				return false;
			}

			//if any word is not in a-zA-Z0-9 return false
			if (!preg_match("/^[0-9a-zA-Z]+$/", $usr_account))
			{
				echo "Not match, the account is " . $usr_account . "<br />";
				return false;
			}

			echo "str ok . account is " . $usr_account . "<br />";
			return true;
		}

		function checkUserPwd($usr_pwd)
		{
			$pwd_len = strlen($usr_pwd);
			if (($pwd_len < 6) or ($pwd_len > 16))
			{
				echo "length wrong, the pwd " . $usr_pwd . " len is " .  $pwd_len . "<br />";
				return false;
			}

			//if any word is not in a-zA-Z0-9 return false
			if (!preg_match("/^[0-9a-zA-Z]+$/", $usr_pwd))
			{
				echo "Not match, the pwd is " . $usr_pwd . "<br />";
				return false;
			}

			echo "str ok . pwd is " . $usr_pwd . "<br />";
			return true;
		}

		function checkUserPwdAndRepwd($usr_pwd, $usr_repwd)
		{
			if ($usr_pwd !== $usr_repwd)
			{
				return false;
			}

			return true;
		}

		//tested
		function showLinktoRegisterPage()
		{
			echo "Sorry , the server detects an error, click here 
			<a href='../register/register.php'>to the register page.</a><br />";
		}

		//tested
		function jsPrint()
		{
			$start = "<script type='text/javascript'> console.log('";
			$arg_list = func_get_args();
			foreach ($arg_list as $s)
			{
				$start .= $s . " ";
			}
			$start .= "'); </script>";
			echo $start;
		}
	?>

	<?php
		$usr_account = $_POST['input_account'];

		if (!checkUserAccount($usr_account))
		{
			echo 'usr_account is ' . $usr_account . '<br />';
			showLinktoRegisterPage();
			return;
		}

		$usr_pwd = $_POST['input_password'];

		if (!checkUserPwd($usr_pwd))
		{
			echo 'usr_pwd is ' . $usr_pwd . '<br />';
			showLinktoRegisterPage();
			return;
		}

		$usr_repwd = $_POST['input_repassword'];

		//if two not equal
		if (!checkUserPwdAndRepwd($usr_pwd, $usr_repwd))
		{
			echo 'usr_pwd is ' . $usr_pwd . ', usr_repwd is ' . $usr_repwd . '<br />';
			showLinktoRegisterPage();
			return;
		}

		$usr_province = $_POST['select_province'];

		jsPrint('usr_account is', $usr_account);
		jsPrint('usr_province is', $usr_province);
		jsPrint('usr_pwd is' , $usr_pwd);
		jsPrint('usr_repwd is' , $usr_repwd);

		//connect the sql to register, if any sql sentence, return and back to register page.

		//login... with cookie?
	?>


	<script type="text/javascript" src="transition.js"></script>
</body>
</html>
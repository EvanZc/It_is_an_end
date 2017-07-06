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
				jsPrintSingleQuote('length wrong, the account ', $usr_account, '<br />');
				return false;
			}

			//if any word is not in a-zA-Z0-9 return false
			if (!preg_match("/^[0-9a-zA-Z]+$/", $usr_account))
			{
				jsPrintSingleQuote('Not match, the account is ', $usr_account, '<br />');
				return false;
			}

			jsPrintSingleQuote('str ok . account is ', $usr_account, '<br />');
			return true;
		}

		function checkUserPwd($usr_pwd)
		{
			$pwd_len = strlen($usr_pwd);
			if (($pwd_len < 6) or ($pwd_len > 16))
			{
				jsPrintSingleQuote('length wrong, the pwd ', $usr_pwd, '<br />');
				return false;
			}

			//if any word is not in a-zA-Z0-9 return false
			if (!preg_match("/^[0-9a-zA-Z]+$/", $usr_pwd))
			{
				jsPrintSingleQuote('Not match, the pwd is ', $usr_pwd, '<br />');
				return false;
			}

			jsPrintSingleQuote('str ok . pwd is ', $usr_pwd, '<br />');
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
		function jsPrintSingleQuote()
		{
			$start = "<script type='text/javascript'> console.log(\"";
			$arg_list = func_get_args();
			foreach ($arg_list as $s)
			{
				$start .= $s . " ";
			}
			$start .= "\"); </script>";
			echo $start;
		}
	?>

	<?php
		$usr_account = $_POST['input_account'];

		if (!checkUserAccount($usr_account))
		{
			jsPrintSingleQuote('usr_account is', $usr_account, '<br />');
			showLinktoRegisterPage();
			return;
		}

		$usr_pwd = $_POST['input_password'];

		if (!checkUserPwd($usr_pwd))
		{
			jsPrintSingleQuote('usr_pwd is ', $usr_pwd, '<br />');
			showLinktoRegisterPage();
			return;
		}

		$usr_repwd = $_POST['input_repassword'];

		//if two not equal
		if (!checkUserPwdAndRepwd($usr_pwd, $usr_repwd))
		{
			jsPrintSingleQuote('usr_pwd is ', $usr_pwd, ', usr_repwd is ', $usr_repwd, '<br />');
			showLinktoRegisterPage();
			return;
		}

		$usr_province = $_POST['select_province'];

		jsPrintSingleQuote('usr_account is', $usr_account);
		jsPrintSingleQuote('usr_province is', $usr_province);
		jsPrintSingleQuote('usr_pwd is' , $usr_pwd);
		jsPrintSingleQuote('usr_repwd is' , $usr_repwd);

		//connect the sql to register, if any sql sentence, return and back to register page.
		$conn = mysqli_connect('localhost', 'root', 'superman29', 'myweb') or die('Sorry we enconter a problem.');
		if (!$conn)
		{
			jsPrintSingleQuote('mysqli_connect failed.');
			showLinktoRegisterPage();
			return;
		}

		$query = "INSERT INTO user_info (user_account, user_pwd, user_province) VALUES ('" . $usr_account .
			"', '" . $usr_pwd . "', '" . $usr_province . "');";

		jsPrintSingleQuote('query is ', $query);
		$res = mysqli_query($conn, $query);
		if (!$res)
		{
			jsPrintSingleQuote('mysqli_query failed.');
			showLinktoRegisterPage();
			return;
		}

		mysqli_close($conn);

		//login... with cookie?
	?>


	<script type="text/javascript" src="transition.js"></script>
</body>
</html>
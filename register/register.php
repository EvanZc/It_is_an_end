<!DOCTYPE html>
<html>
<head>
	<title>New Account</title>
	<link rel="stylesheet" type="text/css" href="register.css">
</head>
<body>
	<div id="allcontent">
		<header>

		</header>
		<div id="main_div">
			<!-- 表单数据可以作为 URL 变量（method="get"）或者 HTTP post （method="post"）的方式来发送。-->
			<form method="POST" action="test.php">
				<input type="submit" name="submit" id="button_register" value="register" />
				<!-- 
					onclick中 可以"javascript:history.back(-1);" 也可以直接"history.back(-1);"
					input的属性也可以是button， button应该不会传表单了吧？
				-->
				<input type="button" name="submit" id="button_back"  value="back" onclick="history.back(-1);"/>
			</form>
		</div>
		<footer>
				<div id="div_tbl_cell">
					<span id="span_footer">Zeng Cheng. All rights reserved.</span>
				</div>
		</footer>
	</div>
</body>
</html>
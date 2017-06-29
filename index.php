<!DOCTYPE html>
<html>
<head>
	<title>The Road Of King</title>
	<link rel="stylesheet" type="text/css" href="index.css">
</head>
<body>
	<section id="section_master">
		<header>
			<img src="login_header.png">
		</header>
		<section id="section_login">
			<form action="" method="post">
				<div class="form_row">
					<label>Account:</label>
					<input type="text" />
				</div>
				<div class="form_row">
					<label>Password:</label>
					<input type="password" />
				</div>
				<!-- value必须是"" 否则看得到字-->
				<input type="submit" value="" id="button_login_active" class="login">
				<!-- button的type默认 ie为button 其他为submit 还可以为reset-->
				<button id="button_reg_active" class="login" onclick="location.href='register/register.php';" type="button"></button>
			</form>
		</section>
		<footer>
			<p>Author: Evan Zeng</p>
		</footer>
	</section>
	
</body>
</html>
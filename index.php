<?php
	//use it before anything was sent.
	session_start();
	if (!isset($_SESSION['login_flag']))
	{
		header("Location: /login/login.php");
	}
?>

<!DOCTYPE html>
<html>
<head>
	<title>Time is clicking</title>
	<link rel="stylesheet" type="text/css" href="index.css">
</head>
<body>
	<div id="div_allcontent">
		<header id="header">
			<span><a href="/login/logout.php">exit</a></span>
		</header>
		<nav>
			<a href="https://www.baidu.com">baidu</a>
			<a href="https://www.tencent.com">tencent</a>
			<a href="https://www.taobao.com">taobao</a>
		</nav>

		<aside>
			<ul>
				<li><a href="lipage1.html" target="mainiframe">dota2</a></li>
				<li><a href="lipage2.html" target="mainiframe">github</a></li>
				<li><a href="lipage3.html" target="mainiframe">stackoverflow</a></li>
			</ul>
		</aside>

		<div id="div_iframe">
		<iframe name="mainiframe" src="lipage1.html">
		</iframe>
		</div>

		<footer>
			<img src="/img/index/header_bkg.png">
		</footer>
	</div>

	<script type="text/javascript" scr="index.js"></script>
</body>
</html>
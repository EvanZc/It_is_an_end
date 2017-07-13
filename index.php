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
		<div id="div_header">
			<header id="header"><!--设置ul会把header撑大-->
				<ul id="ul_header">
					<li id="header_li_exit"><a class="a_in_ul_header_li" href="/login/logout.php">exit</a></li>
					<li id="header_li_set"><a class="a_in_ul_header_li" href="/userset/setuserinfo.php">set</a></li>
				</ul>
			</header>
		</div>
		<nav>
			<ul id="ul_nav">
				<li class="li_ul_nav"><a href="https://www.baidu.com">baidu</a></li>
				<li class="li_ul_nav"><a href="https://www.tencent.com">tencent</a></li>
				<li class="li_ul_nav"><a href="https://www.taobao.com">taobao</a></li>
			</ul>
		</nav>
		<div id="div_main_three">
			<aside>
				<div class="div_aside_block"><a href="lipage1.html" target="mainiframe">dota2</a></div>
				<div class="div_aside_block"><a href="lipage2.html" target="mainiframe">github</a></div>
				<div class="div_aside_block"><a href="lipage3.html" target="mainiframe">stackoverflow</a></div>
			</aside>

			<div id="div_iframe">
				<iframe name="mainiframe" src="lipage1.html"></iframe>
			</div>
		</div>
		<footer>
			<img src="/img/index/header_bkg.png"/>
		</footer>

	</div>

	<script type="text/javascript" scr="index.js"></script>
</body>
</html>
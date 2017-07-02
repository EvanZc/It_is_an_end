<!DOCTYPE html>
<html>
<head>
	<title>New Account</title>
	<link rel="stylesheet" type="text/css" href="register.css">
	<script type="text/javascript" defer="defer" src="register.js"></script>
</head>
<body>
	<div id="allcontent">
		<header>

		</header>
		<div id="main_div">
			<!-- 表单数据可以作为 URL 变量（method="get"）或者 HTTP post （method="post"）的方式来发送。-->
			<!-- 用onsubmit在提交的时候check各个textbox的合法性 -->
			<!-- input 有 required属性-->
			<!-- for有隐式和显式的, 用来联系控件（点到label就会自动focus到联系的控件上）-->
			<form method="POST" action="test.php" id="form_register">
				<div class="form_div_row">
					<label class="label_describe" for="text_account">Account:</label>
    				<input class="form_right_choice" type="text" name="input_account" id="text_account"/>
    			</div>
    			<div class="form_div_hint_info_row">
    				<div class="form_div_take_place"></div>
    				<p id="p_account_hint_info"></p>
    			</div>
    			<div class="form_div_row">
    				<label class="label_describe">City:</label>
    				<select class="form_right_choice">
    					<option value="Chengdu">Chengdu</option>
    					<option value="Shanghai">Shanghai</option>
    					<option value="Guangzhou">Guangzhou</option>
    				</select>
    			</div>
    			<div class="form_div_hint_info_row">
    				<div class="form_div_take_place"></div>
    				<p id="p_account_hint_info"></p>
    			</div>
    			<div class="form_div_row">
    				<label class="label_describe">Password:</label>
    				<input class="form_right_choice" type="password" name="input_password" id="input_password" />
    			</div>
    			<div class="form_div_hint_info_row">
    				<div class="form_div_take_place"></div>
    				<p id="p_account_hint_info"></p>
    			</div>
    			<div class="form_div_row">
    				<label class="label_describe">Password again:</label>
    				<input class="form_right_choice" type="password" name="input_repassword" id="input_repassword" />
    			</div>
    			<div class="form_div_hint_info_row">
    				<div class="form_div_take_place"></div>
    				<p id="p_account_hint_info"></p>
    			</div>
    			<div class="form_last_row">
					<!-- 
						onclick中 可以"javascript:history.back(-1);" 也可以直接"history.back(-1);"
						input的属性也可以是button， button应该不会传表单了吧？

						p属性中有align
					-->
					<p class="p_table_cell">
					<input class="input_button_left" type="submit" name="submit" id="button_register" value="register" />
					</p>
					<p class="p_table_cell">
					<input class="input_button_right" type="button" name="submit" id="button_back"  value="back" onclick="history.back(-1);"/>
				</p>
				</div>
			</form>
		</div>
		<footer>
				<div id="div_tbl_cell">
					<span id="span_footer">Zeng Cheng. Good luck.</span>
				</div>
		</footer>
	</div>
</body>
</html>
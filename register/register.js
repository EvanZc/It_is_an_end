/*---------ID---------*/
const ID_TEXT_ACCOUNT = "text_account";
const ID_IMG_ACCOUNT_HINT = "id_img_account_hint";

const ID_INPUT_PASSWORD = "input_password"
const ID_IMG_PASSWORD_HINT = "id_img_password_hint";

const ID_P_ACCOUNT_HINT = "p_account_hint_info";
const ID_P_PASSWORD_HINT = "p_password_hint_info";
const ID_P_REPASSWORD_HINT = "p_repassword_hint_info";

const ID_INPUT_REPASSWORD = "input_repassword";
const ID_IMG_REPASSWORD_HINT = "id_img_repassword_hint";
/*-------SRC------*/
const SRC_WRONG_IMG = "wrong.png";
const SRC_RIGHT_IMG = "check.png";

/*----INPUT LEN---*/
const MIN_ACCOUNT_LEN = 6;
const MAX_ACCOUNT_LEN = 16;
const MIN_PWD_LEN = 6;
const MAX_PWD_LEN = 16;

/*--------HINT-----------*/
const HINT_OK = 1;

/*------ACCOUNT HINT-----*/
const HINT_ACCOUNT_LENGTH_WRONG = 2;
const HINT_ACCOUNT_TAKEN = 3;
const HINT_ACCOUNT_HAS_INVALID_CHAR = 4;

/*------PASSWORD HINT-----*/
const HINT_PASSWORD_LENGTH_WRONG = 2;
const HINT_PASSWORD_INVALID_CHAR = 3;

/*------REPASSWORD HINT----*/
const HINT_REPASSWORD_ERROR = 2;

/*------SUBMITCHECK-------*/
const SUBMIT_CHECK_OK = 1;
const SUBMIT_CHECK_ACCOUNT_WRONG = 2;
const SUBMIT_CHECK_PWD_WRONG = 3;
const SUBMIT_CHECK_REPWD_WRONG = 4;

const SUBMIT_CHECK_INFO_ACCOUNT = "Please input the account in a proper format.";
const SUBMIT_CHECK_INFO_PWD = "Please input the pwd in a proper format.";
const SUBMIT_CHECK_INFO_REPWD = "Please input the same pwd in two pwd box.";

/*------CHECK PASSWORD HINT-----*/


//这里面必须是1，2，3 用const的值不起作用
var ACCOUNT_CHECK_HINT_INFO = { 
								  1 : "OK, you can use it.", 
								  2 : "Account length can not less than 6", 
								  3 : "The account has already been taken.",
								  4 : "Invalid characters in the account."
								};

var PASSWORD_CHECK_HINT_INFO = {
								  1 : "",
								  2 : "Password length should between 6 to 16.",
								  3 : "Invalid characters in the password."
}

const HINT_REPASSWORD_STR = "Password is not equal to repassword.";


console.log("ACCOUNT_CHECK_HINT_INFO[1] is " + ACCOUNT_CHECK_HINT_INFO[1]);
var checkElements = [];
var textAccountFocusLastTime = false;
var textPasswordFocusLastTime = false;



function InitWork()
{
	console.log("Init work begin...");
	//var childnodes = document.getElementById('row1').childNodes;// childNodes未定义会报错
	//var childnodes = document.getElementById('form_login').children;

	checkElements.push(false);
	checkElements.push(ID_TEXT_ACCOUNT);
	checkElements.push(false);
	checkElements.push(ID_INPUT_PASSWORD);
	checkElements.push(false);
	checkElements.push(ID_INPUT_REPASSWORD);

	var elem_account = document.getElementById(ID_TEXT_ACCOUNT);
	elem_account.value = "";

	console.log("Init work end...");
	console.log("checkElements len is " + checkElements.length);

	/*
	是click不是onclick
	var elem = document.getElementById(ID_INPUT_PASSWORD);
	elem.addEventListener('click',function(){alert('ok');},false);
	*/
}

function onSubmitCheckElem(elem_id, alert_info, check_func, do_func)
{
	var elem = document.getElementById(elem_id);
	var elem_str = elem.value;
	var return_code = check_func(elem_str)
	if (return_code != HINT_OK)
	{
		do_func(return_code);
		alert(alert_info);
		return false;
	}
	return true;
}

function onSubmitCheck()
{
	//check account pwd pwd-repwd.
	//if one wrong, return false. 
	//account有问题，依然要提示account有问题，并且清除2个pwd
	//pwd有问题 ， 提示pwd有问题，清除repwd，repwd不提示任何信息
	//repwd有问题，清除pwd和repwd。提示的话。。。待定
	var elem_pwd = document.getElementById(ID_INPUT_PASSWORD);
	var pwd_str = elem_pwd.value;
	var elem_repwd = document.getElementById(ID_INPUT_REPASSWORD);
	var elem_p_repwd = document.getElementById(ID_P_REPASSWORD_HINT);
	var repwd_str = elem_repwd.value;
	var elem_pwd_img = document.getElementById(ID_IMG_PASSWORD_HINT);
	var elem_repwd_img = document.getElementById(ID_IMG_REPASSWORD_HINT);
	//1. get account input
	if(!onSubmitCheckElem(ID_TEXT_ACCOUNT, SUBMIT_CHECK_INFO_ACCOUNT, 
							checkAccountLogic, doWhenAccountWrong))
	{
		elem_pwd.value = "";
		elem_repwd.value = "";
		elem_p_repwd.innerHTML = "";
		elem_pwd_img.style.visibility = "hidden";
		elem_repwd_img.style.visibility = "hidden";
		return false;
	}

	if(!onSubmitCheckElem(ID_INPUT_PASSWORD, SUBMIT_CHECK_INFO_PWD, 
							checkPasswordLogic, doPasswordWrong))
	{
		elem_pwd.value = "";
		elem_repwd.value = "";
		elem_pwd_img.style.visibility = "hidden";
		return false;
	}
	
	console.log("pwd_str is " + pwd_str);
	console.log("repwd_str is " + repwd_str);
	if(pwd_str != repwd_str)
	{
		elem_pwd.value = "";
		elem_repwd.value = "";
		elem_pwd_img.style.visibility = "hidden";
		elem_repwd_img.style.visibility = "hidden";
		alert(SUBMIT_CHECK_INFO_REPWD);
		return false;
	}


	//send the form to the register page.

	return true;
}

function IsAnElementLostFocus(checkElement_idx)
{
	var element_id = checkElements[checkElement_idx];
	if((document.activeElement.id != element_id)
		&& (checkElements[checkElement_idx - 1] == true))
	{
		checkElements[checkElement_idx - 1] = false;
		return true;
	}

	if(document.activeElement.id == element_id)
	{
		checkElements[checkElement_idx - 1] = true;
	}

	return false;
}

function clearTheWrongHint(elem)
{
	//删除就是要2行，怎么样吧。
	/*
	var element = document.getElementById("element-id");
	element.outerHTML = "";
	delete element;
	貌似这个也是个办法。
	*/
	if (elem.id == ID_TEXT_ACCOUNT)
	{
		var img_wrong_element = document.getElementById(ID_IMG_ACCOUNT_HINT);
		img_wrong_element.style.visibility = 'hidden';

		var p_account_hint_info_elem = document.getElementById(ID_P_ACCOUNT_HINT);
		p_account_hint_info_elem.innerHTML = "";
		p_account_hint_info_elem.style.visibility = "hidden"; //必须要用引号。。。
	}
}

//会刷新网页,所以要用AJAX
//http://www.runoob.com/ajax/ajax-tutorial.html 教程
function postAccountToCheck(user_input_account)
{
	//create ajax object
	var xmlhttp;
	if (window.XMLHttpRequest)
	{
		xmlhttp = new XMLHttpRequest();
	}
	else
	{
		//for IE6 IE5.
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange=function()
	{
		//readyState改变时 会触发 onreadystatechange事件
		//status 200是ok 404是没有找到页面
		if ((4 == xmlhttp.readyState) && (200 == xmlhttp.status))
		{
			var accountnum = xmlhttp.responseText;
			console.log("accountnum is :" + accountnum);
			var p_account_hint_info_elem = document.getElementById(ID_P_ACCOUNT_HINT);
			var img_account_hint = document.getElementById(ID_IMG_ACCOUNT_HINT);
			if (1 == accountnum)
			{
				//show the wrong hint , 'already taken'
				p_account_hint_info_elem.innerHTML = ACCOUNT_CHECK_HINT_INFO[HINT_ACCOUNT_TAKEN];
				p_account_hint_info_elem.style.visibility = "visible";

				//show the wrong img
				img_account_hint.setAttribute("src", SRC_WRONG_IMG);//see if this can happen;
				img_account_hint.style.visibility = 'visible';
			}
			else if (0 == accountnum)
			{
				//change img to a check.
				img_account_hint.setAttribute("src", SRC_RIGHT_IMG);
				img_account_hint.style.visibility = 'visible';
				//show the p
				p_account_hint_info_elem.innerHTML = ACCOUNT_CHECK_HINT_INFO[HINT_OK];
				p_account_hint_info_elem.style.visibility = "visible";
			}
			else
			{
				console.log("sth gose wrong");
			}
		}
	}

	xmlhttp.open("GET", "account_check.php?account=" + user_input_account, true);
	xmlhttp.send();

}


//check logic 应该还有一个专门的逻辑函数。处理 长度，字符个数，甚至是否是固定格式
function checkAccountLogic(str)
{
    //imsert a circling img, telling the user that I am checking...
    //当要显示勾勾 or 叉叉 的图片的时候，通过id找到元素，然后把这个图片的src替换掉
	//see if length is ok, not ok ,return 提示 "length is not ok".
	if((str.length < MIN_ACCOUNT_LEN) || (str.length > MAX_ACCOUNT_LEN))
	{
		console.log("in checkAccountLogic str is " + str);
		return HINT_ACCOUNT_LENGTH_WRONG;
	}

	var reg = new RegExp("^[A-Za-z0-9]+$");
	if (!reg.exec(str))
	{
		return HINT_ACCOUNT_HAS_INVALID_CHAR;
	}

	//see if the account is already taken. taken, 提示 "already exist."
	postAccountToCheck(str);
	return HINT_OK; //return error code
}

/*
	check这个account的值，返回返回码，
	if 不是ok的返回码:
		显示not no的图片（一个xx），
		更新提示，提示根据错误码查找到对应的提示
	else:
		显示ok的图片（一个勾勾）
*/
function doWhenAccountWrong(return_code)
{
	hint_info = ACCOUNT_CHECK_HINT_INFO[return_code];
	console.log("The hint info is " + hint_info);

	//create a bubble box to show the hint info.
	//maybe just show it, the css can hide everything.
	var p_account_hint_info_elem = document.getElementById(ID_P_ACCOUNT_HINT);
	p_account_hint_info_elem.innerHTML = ACCOUNT_CHECK_HINT_INFO[return_code];
	p_account_hint_info_elem.style.visibility = "visible"; //必须要用引号。。。

	var img_account_hint = document.getElementById(ID_IMG_ACCOUNT_HINT);
	img_account_hint.setAttribute('src', SRC_WRONG_IMG);
	img_account_hint.style.visibility = 'visible';  //这个不能用setAttribute哦~
}

function checkAccount(element, str)
{
	//input textbox should have the fix width.
	console.log("text account value is " + str);
	var return_code;
	var hint_info;

	return_code = checkAccountLogic(str);

	//然后返回一个返回值。然后提示一个img，还有在下面加一个text。
	if (return_code != HINT_OK)
	{
		doWhenAccountWrong(return_code);
		//Todo:
		//create information node(e.g.  the length should be more than 5.)
		//set the flag that the form can not be submit.
	}
	else 
	{
		clearTheWrongHint(element);
		//create circling img which tells the user that the program is checking.
		//connect the database. if the account has already be registered.
	}
}
/*
	单纯地检测用户输入的密码
*/
function checkPasswordLogic(str)
{
	//more than 6, less equal than 16
	if ((str.length < MIN_PWD_LEN) || (str.length > MAX_PWD_LEN))
	{
		return HINT_PASSWORD_LENGTH_WRONG;
	}

	//all key board characters.
	var reg = new RegExp("^[A-Za-z0-9]+$");
	if (!reg.exec(str))
	{
		return HINT_PASSWORD_INVALID_CHAR;
	}

	return HINT_OK;
}

function doPasswordWrong(return_code)
{
	var img_elem = document.getElementById(ID_IMG_PASSWORD_HINT);
	//show the img and the correspond hint info.
	img_elem.setAttribute("src", SRC_WRONG_IMG);

	clearRepasswordHint();
}

function clearRepasswordHint()
{
	var img_hint = document.getElementById(ID_IMG_REPASSWORD_HINT);
	var p_hint = document.getElementById(ID_P_REPASSWORD_HINT);

	img_hint.style.visibility = "hidden";
	p_hint.style.visibility = "hidden";
}

function checkPassword(elem, str)
{
	console.log("this is password input");

	var return_code = checkPasswordLogic(str);
	//set hint words.
	var p_pwd_hint_info = document.getElementById(ID_P_PASSWORD_HINT);
	p_pwd_hint_info.innerHTML = PASSWORD_CHECK_HINT_INFO[return_code];
	p_pwd_hint_info.style.visibility = "visible";

	//set hint img.
	var img_elem = document.getElementById(ID_IMG_PASSWORD_HINT);
	if (return_code != HINT_OK)
	{
		doPasswordWrong();
	}
	else
	{
		//show the img and no words.
		img_elem.setAttribute("src", SRC_RIGHT_IMG);
	}
	
	img_elem.style.visibility = "visible";
	
}

function checkRepassword(elem, str)
{
	//to check if the password is equal to str.
	var pwd_str = document.getElementById(ID_INPUT_PASSWORD).value;
	var img_hint = document.getElementById(ID_IMG_REPASSWORD_HINT);
	var p_hint = document.getElementById(ID_P_REPASSWORD_HINT);

	if (HINT_OK == checkPasswordLogic(pwd_str))
	{
		img_hint.style.visibility = "visible";	
		p_hint.style.visibility = "visible";

		if (pwd_str != str)
		{
			img_hint.setAttribute("src", SRC_WRONG_IMG);
			p_hint.innerHTML = HINT_REPASSWORD_STR;
		}
		else
		{
			img_hint.setAttribute("src", SRC_RIGHT_IMG);
			p_hint.innerHTML = "";
		}
		return HINT_OK;
	}
	else
	{
		img_hint.style.visibility = "hidden";
		p_hint.style.visibility = "hidden";

		return HINT_REPASSWORD_ERROR;
	}
}

function check(checkElement_idx)
{
	var element = document.getElementById(checkElements[checkElement_idx]);
	var str_id = element.id;
	console.log("the element id is " + str_id);
	switch (str_id)
	{
		case ID_TEXT_ACCOUNT:
			checkAccount(element, element.value);
			break;
		case ID_INPUT_PASSWORD:
			checkPassword(element, element.value);
			break;
		case ID_INPUT_REPASSWORD:
			checkRepassword(element, element.value);
			break;
		default :
			break;
	}
	
}

function TestTextBox() {
	var i;
	for (i = 1; i < checkElements.length; i += 2)
	{
		if (true == IsAnElementLostFocus(i))
		{
			check(i);
		}
	}
}

InitWork();

//要防止漏检测到从focus到not focut，是不是应该有个onclick事件来防止这类问题的发生
//不行 onclick检测不到focus
//注意写在行内的事件的参数是字符串，
//浏览器会使用eval来执行代码，所以你应该写onclick="myfuncyion()"

//应该可以用onblur来代替 -. -...
window.setInterval(TestTextBox, 10);
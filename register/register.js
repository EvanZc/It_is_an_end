/*---------ID---------*/
const ID_TEXT_ACCOUNT = "text_account";
const ID_IMG_ACCOUNT_HINT = "id_img_account_hint";

const ID_INPUT_PASSWORD = "input_password"

/*-------SRC------*/
const SRC_WRONG_IMG = "wrong.png";
const SRC_RIGHT_IMG = "check.png";


const MIN_ACCOUNT_LEN = 6;
const ACCOUNT_OK = 1;
const LENGTHEN_THE_ACCOUNT = 2;
const ACCOUNT_TAKEN = 3;
const ACCOUNT_HINT_ID = "p_account_hint_info";
//这里面必须是1，2，3 用const的值不起作用
var ACCOUNT_CHECK_HINT_INFO = { 
								  1 : "OK, you can use it.", 
								  2 : "Account length can not less than 6", 
								  3 : "The account has already been taken."
								};
console.log("ACCOUNT_CHECK_HINT_INFO[1] is " + ACCOUNT_CHECK_HINT_INFO[1]);
console.log("LENGTHEN_THE_ACCOUNT is " + LENGTHEN_THE_ACCOUNT);
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

	console.log("Init work end...");
	console.log("checkElements len is " + checkElements.length);

	/*
	是click不是onclick
	var elem = document.getElementById(ID_INPUT_PASSWORD);
	elem.addEventListener('click',function(){alert('ok');},false);
	*/
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

		var p_account_hint_info_elem = document.getElementById(ACCOUNT_HINT_ID);
		p_account_hint_info_elem.innerHTML = "";
		p_account_hint_info_elem.style.visibility = "hidden"; //必须要用引号。。。
	}
	else if (elem.id == ID_INPUT_PASSWORD)
	{

	}
	else
	{

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
			var p_account_hint_info_elem = document.getElementById(ACCOUNT_HINT_ID);
			var img_account_hint = document.getElementById(ID_IMG_ACCOUNT_HINT);
			if (1 == accountnum)
			{
				//show the wrong hint , 'already taken'
				p_account_hint_info_elem.innerHTML = ACCOUNT_CHECK_HINT_INFO[ACCOUNT_TAKEN];
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
				p_account_hint_info_elem.innerHTML = ACCOUNT_CHECK_HINT_INFO[ACCOUNT_OK];
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
	if(str.length < MIN_ACCOUNT_LEN)
	{
		console.log("in checkAccountLogic str is " + str);
		return LENGTHEN_THE_ACCOUNT;
	}

	//see if the account is already taken. taken, 提示 "already exist."
	postAccountToCheck(str);
	return ACCOUNT_OK; //return error code
}

function isAccountExist(isExist)
{
	//show the hint.
	var p_account_hint_info_elem = document.getElementById(ACCOUNT_HINT_ID);
	p_account_hint_info_elem.innerHTML = ACCOUNT_CHECK_HINT_INFO[return_code];
	p_account_hint_info_elem.style.visibility = "visible";

	//change the picture;
}


/*
	check这个account的值，返回返回码，
	if 不是ok的返回码:
		显示not no的图片（一个xx），
		更新提示，提示根据错误码查找到对应的提示
	else:
		显示ok的图片（一个勾勾）
*/
function checkAccount(element, str)
{
	//input textbox should have the fix width.
	console.log("text account value is " + str);
	var return_code;
	var hint_info;

	return_code = checkAccountLogic(str);

	//然后返回一个返回值。然后提示一个img，还有在下面加一个text。
	if (return_code != ACCOUNT_OK)
	{
		hint_info = ACCOUNT_CHECK_HINT_INFO[return_code];
		console.log("The hint info is " + hint_info);

		//create a bubble box to show the hint info.
		//maybe just show it, the css can hide everything.
		var p_account_hint_info_elem = document.getElementById(ACCOUNT_HINT_ID);
		p_account_hint_info_elem.innerHTML = ACCOUNT_CHECK_HINT_INFO[return_code];
		p_account_hint_info_elem.style.visibility = "visible"; //必须要用引号。。。

		console.log("text account value length is " + str.length);
		var img_account_hint = document.getElementById(ID_IMG_ACCOUNT_HINT);
		img_account_hint.setAttribute('src', SRC_WRONG_IMG);
		img_account_hint.style.visibility = 'visible';  //这个不能用setAttribute哦~

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

function checkPassword(elem, str)
{
	console.log("this is password input");
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
window.setInterval(TestTextBox, 10);
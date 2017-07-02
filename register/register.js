/*---------ID---------*/
const ID_TEXT_ACCOUNT = "text_account";
const ID_INPUT_PASSWORD = "input_password"

const MIN_ACCOUNT_LEN = 6;
const RETURN_OK = 1;
const LENGTHEN_THE_ACCOUNT = 2;
const ACCOUNT_TAKEN = 3;
const ACCOUNT_HINT_ID = "p_account_hint_info";
//这里面必须是1，2，3 用const的值不起作用
var ACCOUNT_CHECK_HINT_INFO = { 
								  1 : "OK", 
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
		var img_wrong_element= document.getElementById('img_text_account_wrong');
		clearTheWrongHint(img_wrong_element);
		if (img_wrong_element)
		{
			console.log("remove img.");
			img_wrong_element.parentElement.removeChild(img_wrong_element);
		}

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


//check logic 应该还有一个专门的逻辑函数。处理 长度，字符个数，甚至是否是固定格式
function checkAccountLogic(str)
{
    //imsert a circling img, telling the user that I am checking...
    //当要显示勾勾 or 叉叉 的图片的时候，通过id找到元素，然后把这个图片的src替换掉

	//see if length is ok, not ok ,return 提示 "length is not ok".
	if(str.length < MIN_ACCOUNT_LEN)
	{
		return LENGTHEN_THE_ACCOUNT;
	}

	//see if the account is already taken. taken, 提示 "already exist."

	return RETURN_OK; //return error code
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
	if (return_code != RETURN_OK)
	{
		hint_info = ACCOUNT_CHECK_HINT_INFO[return_code];
		console.log("The hint info is " + hint_info);

		//create a bubble box to show the hint info.
		//maybe just show it, the css can hide everything.
		var p_account_hint_info_elem = document.getElementById(ACCOUNT_HINT_ID);
		p_account_hint_info_elem.innerHTML = ACCOUNT_CHECK_HINT_INFO[return_code];
		p_account_hint_info_elem.style.visibility = "visible"; //必须要用引号。。。

        if (document.getElementById('img_text_account_wrong'))
		{
			console.log("already have the wrong img information.");
			return; 
		}

		console.log("text account value length is " + str.length);
		var wrong_img = document.createElement("img");
		wrong_img.setAttribute('src', 'wrong.png');
		wrong_img.style.width = '16px'; // css mode
		//wrong_img.style.height = '16px'; // css mode
		wrong_img.height = 16; //html mode
		wrong_img.style.verticalAlign = 'text-bottom';
		wrong_img.id = 'img_text_account_wrong';
		element.parentNode.appendChild(wrong_img);

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

function checkPassword(str)
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
			checkPassword(element.value);
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
var checkElements = [];
var textAccountFocusLastTime = false;
var textPasswordFocusLastTime = false;
function InitWork()
{
	console.log("Init work begin...");
	//var childnodes = document.getElementById('row1').childNodes;// childNodes未定义会报错
	//var childnodes = document.getElementById('form_login').children;

	checkElements.push(false);
	checkElements.push('text_account');
	checkElements.push(false);
	checkElements.push('input_password');

	console.log("Init work end...");
	console.log("checkElements len is " + checkElements.length);

	/*
	是click不是onclick
	var elem = document.getElementById('input_password');
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

function checkAccount(str)
{
	console.log("this is text account");
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
		case 'text_account':
			checkAccount(element.value);
			break;
		case 'input_password':
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
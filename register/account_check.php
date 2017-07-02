<?php
    /*接受text中的account，查看是否在数据库里面有*/
    $account = $_GET['account'];
    //echo "account is " . $account . "---";
    $conn = mysqli_connect('localhost', 'root', 'superman29', 'myweb') or die("connect to db failed.");
    $query = "SELECT * FROM user_info WHERE user_account='$account'";//注意双引号和单引号
    $res = mysqli_query($conn, $query);
    //check if there is a line of data.
    $num = mysqli_num_rows($res);
    if ($num > 0)
    {
        echo 1;
    }
    else
    {
        echo 0;
    }
    //pass the right result to the js.
    mysqli_close($conn);
?>
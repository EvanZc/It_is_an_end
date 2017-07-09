<!DOCTYPE html>
<html>
<head>
	<title>PHP LIB</title>
</head>
<body>
	<?php 
		function jsPrintSingleQuote()
		{
			$start = "<script type='text/javascript'> console.log(\"";
			$arg_list = func_get_args();
			foreach ($arg_list as $s)
			{
				$start .= $s . " ";
			}
			$start .= "\"); </script>";
			echo $start;
		}
	?>
</body>
</html>
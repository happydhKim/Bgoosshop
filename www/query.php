<?php

	header("Access-Control-Allow-Origin: *");

	$mysql_host ="localhost";
	$mysql_database = "talktudy";
	$mysql_user = "root";
	$mysql_password = "xhrxjel0101";



	$conn = new mysqli ($mysql_host, $mysql_user, $mysql_password, $mysql_database);

	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);

	}

	$sql = "SELECT * FROM gd_goods LIMIT 1";
	$result = $conn->query($sql);

	$outp = "";

	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
		if ($outp != "") {$outp .= ",";}
		$outp .= '{"img_l":"'	.$rs["img_l"] . '",';
		$outp .= '"img_x":"'		.$rs["img_x"] . '"';
		$outp .= '"goodsnm":"'		.$rs["goodsnm"] .'"';
		$outp .= '"shortdesc":"'	.$rs["shortdesc"] .'"}';

	}

	$outp = '{ "records":[ '.$outp.']}';

	$conn->close();

	echo($outp);

	?>
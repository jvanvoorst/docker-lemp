<?php

$directory = 'uploads/';
$file = $_SERVER['DOCUMENT_ROOT'] . '/uploads/' . basename($_FILES['file']['name']);
$extension = pathinfo($file, PATHINFO_EXTENSION);

if (move_uploaded_file($_FILES["file"]["tmp_name"], $file)) {
    echo "The file ". basename( $_FILES["file"]["name"]). " has been uploaded.";
} else {
    echo "Sorry, there was an error uploading your file.";
}


?>

<?php

var_dump($_FILES);

$directory = 'uploads/';
$file = $_SERVER['DOCUMENT_ROOT'] . '/uploads/' . basename($_FILES['fileToUpload']['name']);
$extension = pathinfo($file, PATHINFO_EXTENSION);

if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $file)) {
    echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
} else {
    echo "Sorry, there was an error uploading your file.";
}

?>

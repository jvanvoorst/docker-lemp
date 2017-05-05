<?php

echo $_FILES;

$directory = 'uploads/';
$file = $directory . basename($_FILES['fileToUpload']['name']);
$extension = pathinfo($file, PATHINFO_EXTENSION);

if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $file)) {
    echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
} else {
    echo "Sorry, there was an error uploading your file.";
}

?>

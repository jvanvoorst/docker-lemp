<?php

$files =  array_map("basename", glob('../uploads/*.*'));
echo json_encode($files);

?>

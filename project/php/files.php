<?php

// router for GET requests
if (isset($_GET['action'])) {

    switch ($_GET['action']) {
        case 'list':
            $files =  array_map("basename", glob('../uploads/*.*'));
            echo json_encode($files);
            break;
        case 'get':
            downloadFile('../uploads/' . $_GET['file']);
            break;
        case 'getMultiple':
            $archive = zipFiles(explode('@', $_GET['files']));
            downloadFile($archive);
    }
}

// creates a zip archive and adds requested files
function zipFiles($files) {
    $archive = './download.zip';
    // delete old archive file before creating new one
    unlink($archive);

    $zip = new ZipArchive();

    if ($zip->open($archive, ZipArchive::CREATE) !== TRUE) {
        exit("cannot open $archive\n");
    } else {
        foreach ($files as $item) {
            $zip->addFile('../uploads/' . $item, $item);
        }
        $zip->close();
        return $archive;
    }
}

// sends one file to the browser
function downloadFile($file) {
    if (file_exists($file)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="'.basename($file).'"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file));
        readfile($file);
        exit;
    } else {
        echo 'file does not exist';
    }
}

?>

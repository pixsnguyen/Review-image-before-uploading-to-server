<?php 
    require_once('function.php');
    $data = deleteImageInFolder($_POST['path']);
    echo $data;
?>
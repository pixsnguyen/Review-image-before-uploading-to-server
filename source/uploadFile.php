<?php 
    require_once('function.php');
    date_default_timezone_set('Asia/Ho_Chi_Minh');
    $array =  $_FILES;
    foreach ($array as $key => $value) {
        $data[$key] =  json_encode($value);
        $data[$key] = json_decode($data[$key]);
        $extensionType[$key] = $data[$key]->type;
        $locationSlash[$key] = strpos($extensionType[$key],"/");
        $stringLength[$key] = strlen($extensionType[$key]);
        $nameTemp[$key] =  $data[$key]->tmp_name;
        $extension[$key] = substr($extensionType[$key],  $locationSlash[$key]+1, $stringLength[$key]);
        $fileName[$key] = 'FileAttachment' . '_' . date('Ymdhis') . '_' . rand(0, 1000) . "." . $extension[$key];
        if (!is_dir("../uploads/")) {
            mkdir("../uploads");
            chmod("../uploads",777);
        }
        $destination_url[$key] = '../uploads/'. $fileName[$key];
        compressImage($nameTemp[$key], $destination_url[$key],30);
        $data['path'] = $fileName[$key];
        $data['name'] = $data[$key]->name;
        $data['size'] = $data[$key]->size;
        $data['time'] = date('d-m-y h:i:s');
        insertDataImage($data);
    }
    return true;
?>
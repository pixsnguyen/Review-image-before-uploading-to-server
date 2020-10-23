<?php 
    // Compress image
    function compressImage($source, $destination, $quality) {

        $info = getimagesize($source);

        if ($info['mime'] == 'image/jpeg') 
        $image = imagecreatefromjpeg($source);

        elseif ($info['mime'] == 'image/gif') 
        $image = imagecreatefromgif($source);

        elseif ($info['mime'] == 'image/png') 
        $image = imagecreatefrompng($source);

        imagejpeg($image, $destination, $quality);

    }
    function insertDataImage($data)
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        //Tên thư mục chứ log
        $data_directory = "../database";
        if (!file_exists($data_directory)) 
        {
            // create directory/folder uploads.
            mkdir($data_directory);
            chmod($data_directory,777);
        }
        // Tạo file chứa log dạng json
        $imagedata_file = $data_directory.'/imagedata' . '.json';
        // if you don't add `FILE_APPEND`, the file will be erased each time you add a log
        $arrEmpty = [];
        $arrContructor = json_encode($arrEmpty, JSON_PRETTY_PRINT);
        //Check existing json file
        $checkExistFile = file_exists($imagedata_file);
        if(!$checkExistFile){
            //Save
            file_put_contents($imagedata_file, $arrContructor);
        }
        //Get data from existing json file
        $jsondata = file_get_contents($imagedata_file);
        // converts json data into array
        $arr_data = json_decode($jsondata, true);
        $id = 0;
        if(count($arr_data) == 0){
            $id = 1;
        }else{
            $id = count($arr_data) + 1;
        }
        try
        {
            $saveData = [
                    "id"=>$id,
                    "path"=>$data['path'],
                    "name" => $data['name'],
                    "size" => $data['size'],
                    "time" => $data['time']
            ];
            // ==================== 
            //Get data from existing json file
            $jsondata = file_get_contents($imagedata_file);
            // converts json data into array
            $arr_data = json_decode($jsondata, true);
            
            // Push user data to array
            array_push($arr_data,$saveData);

            //Convert updated array to JSON
            $jsondata = json_encode($arr_data, JSON_PRETTY_PRINT);
            
            // if you don't add `FILE_APPEND`, the file will be erased each time you add a log
            file_put_contents($imagedata_file, $jsondata);
        }
        catch (Exception $e) {
            // if you don't add `FILE_APPEND`, the file will be erased each time you add a log
            $jsondata = json_encode(['error'=>$e->getMessage()], JSON_PRETTY_PRINT);
            var_dump($jsondata);
        }
        
    }
    function updateDataImage($data)
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        //Tên thư mục chứ log
        $data_directory = "../database";
        if (!file_exists($data_directory)) 
        {
            // create directory/folder uploads.
            mkdir($data_directory);
            chmod($data_directory,777);
        }
        // Tạo file chứa log dạng json
        $imagedata_file = $data_directory.'/imagedata' . '.json';
        // if you don't add `FILE_APPEND`, the file will be erased each time you add a log
        $arrEmpty = [];
        $arrContructor = json_encode($arrEmpty, JSON_PRETTY_PRINT);
        //Check existing json file
        $checkExistFile = file_exists($imagedata_file);
        if(!$checkExistFile){
            //Save
            file_put_contents($imagedata_file, $arrContructor);
        }
        try
        {
            //Convert updated array to JSON
            $jsondata = json_encode($data, JSON_PRETTY_PRINT);
            if($jsondata == 'null'){
                $jsondata = '[]';
            }
            // if you don't add `FILE_APPEND`, the file will be erased each time you add a log
            file_put_contents($imagedata_file, $jsondata);
        }
        catch (Exception $e) {
            // if you don't add `FILE_APPEND`, the file will be erased each time you add a log
            $jsondata = json_encode(['error'=>$e->getMessage()], JSON_PRETTY_PRINT);
            var_dump($jsondata);
        }
        
    }
    function getDataImage()
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        //Tên thư mục chứ log
        $data_directory = "../database";
        if (!file_exists($data_directory)) 
        {
            // create directory/folder uploads.
            mkdir($data_directory);
            chmod($data_directory,777);
        }
        // Tạo file chứa log dạng json
        $imagedata_file = $data_directory.'/imagedata' . '.json';
        // if you don't add `FILE_APPEND`, the file will be erased each time you add a log
        $arrEmpty = [];
        $arrContructor = json_encode($arrEmpty, JSON_PRETTY_PRINT);
        //Check existing json file
        $checkExistFile = file_exists($imagedata_file);
        if(!$checkExistFile){
            //Save
            file_put_contents($imagedata_file, $arrContructor);
        }
        try
        {
            //Get data from existing json file
            $jsondata = file_get_contents($imagedata_file);
            // converts json data into array
            $arr_data = json_decode($jsondata, true);
            $jsondata = json_encode($arr_data);
            return $jsondata;            
        }
        catch (Exception $e) {
            // if you don't add `FILE_APPEND`, the file will be erased each time you add a log
            $jsondata = json_encode(['error'=>$e->getMessage()], JSON_PRETTY_PRINT);
            var_dump($jsondata);
        }
        
    }
    function deleteImageInFolder($path){
        if(unlink($path)){
            echo "XÓA THÀNH CÔNG";
        }else{
            echo "XÓA THẤT BẠI";
        }
    }
?>
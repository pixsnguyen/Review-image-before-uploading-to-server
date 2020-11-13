# Review-image-before-uploading-to-server
## Plugin online
```
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/2.5.1/jquery-confirm.min.css" />
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/2.5.1/jquery-confirm.min.js"></script>
```
## Css
```
<link rel="stylesheet" href="css/uploadfile.css">
```
## Body Code
```
<div class="container-fluid">
        <div class="col-sm-3 border" style="margin-top: 10px;">
            <div class="col-sm-6">
                <span class="btn btn-success fileinput-button">
                    <i class="glyphicon glyphicon-plus"></i>
                    <span>Add files...</span>
                    <input type='file' id="imgInp" name="file[]" multiple accept="image/*" enctype="multipart/form-data"/>
                </span>
            </div>
            <div class="col-sm-6">
                <button type="button" id="btnUploadImage" class="btn btn-primary start">
                    <i class="fa fa-cloud-upload uploadIcon"></i>
                    <span>Start upload</span>
                </button>
            </div>
        </div>
        <div class="col-sm-12 border">
            <div class="row m-t-15">
                <div class="showImages col-sm-6">

                </div>
                <div class="listOfFile col-sm-6">

                </div>
            </div>
        </div>
    </div>
```
## Setting
```
<script>
        // setting lang:vi-vn
        var message = {
            fileNotImage : " không phải là ảnh",
            selectFileToUpload:" Vui lòng chọn tệp hình ảnh trước khi tải ảnh lên",
            uploadPhoToSuccessfully:" Thêm ảnh thành công",
            titleNotify:" Thông báo",
            contentConfirm:" Bạn có muốn xóa hình ảnh được chọn?",
            confirmButton:" Đồng ý",
            cancelButton:" Hủy bỏ",
            notifySuccess:" Xóa thành công",
        }
        var selector = {
            showImages:"", // The id or class containing a list of images before uploading to server 
            imageInput:"", // The id or class of the input selects the image
            btnUploadImage:"", // The id or class of button upload images
            listOfFile:"" // The id or class containing a list of images after uploading to server 
        }
        var RetrieveOnlyDataToDisplay = false; // Don't use server just use javascript client
    </script>
```
## Code process
```
<script src='js/loadDatabase.js'></script>
    <script src='js/uploadFile.js'></script>
```
## Code Get the data object to send
```
<script>
        RetrieveOnlyDataToDisplay = true;
        if(RetrieveOnlyDataToDisplay){
            $(btnUploadImage).click(function(){
                var formData = dataImage;
                for (var value of formData.values()) {
                    console.log(value);
                }
            })
        }
    </script>
```
## Full code example:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View photos before uploading them to the server</title>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/2.5.1/jquery-confirm.min.css" />
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/2.5.1/jquery-confirm.min.js"></script>
    <link rel="stylesheet" href="css/uploadfile.css">
</head>
<body>
    <div class="container-fluid">
        <div class="col-sm-3 border" style="margin-top: 10px;">
            <div class="col-sm-6">
                <span class="btn btn-success fileinput-button">
                    <i class="glyphicon glyphicon-plus"></i>
                    <span>Add files...</span>
                    <input type='file' id="imgInp" name="file[]" multiple accept="image/*" enctype="multipart/form-data"/>
                </span>
            </div>
            <div class="col-sm-6">
                <button type="button" id="btnUploadImage" class="btn btn-primary start">
                    <i class="fa fa-cloud-upload uploadIcon"></i>
                    <span>Start upload</span>
                </button>
            </div>
        </div>
        <div class="col-sm-12 border">
            <div class="row m-t-15">
                <div class="showImages col-sm-6">

                </div>
                <div class="listOfFile col-sm-6">

                </div>
            </div>
        </div>
    </div>
    <script>
        // setting lang:vi-vn
        var message = {
            fileNotImage : " không phải là ảnh",
            selectFileToUpload:" Vui lòng chọn tệp hình ảnh trước khi tải ảnh lên",
            uploadPhoToSuccessfully:" Thêm ảnh thành công",
            titleNotify:" Thông báo",
            contentConfirm:" Bạn có muốn xóa hình ảnh được chọn?",
            confirmButton:" Đồng ý",
            cancelButton:" Hủy bỏ",
            notifySuccess:" Xóa thành công",
        }
        var selector = {
            showImages:"", // The id or class containing a list of images before uploading to server 
            imageInput:"", // The id or class of the input selects the image
            btnUploadImage:"", // The id or class of button upload images
            listOfFile:"" // The id or class containing a list of images after uploading to server 
        }
        var RetrieveOnlyDataToDisplay = false; // Don't use server just use javascript client
    </script>
    <script src='js/loadDatabase.js'></script>
    <script src='js/uploadFile.js'></script>
    <script>
        RetrieveOnlyDataToDisplay = true;
        if(RetrieveOnlyDataToDisplay){
            $(btnUploadImage).click(function(){
                var formData = dataImage;
                for (var value of formData.values()) {
                    console.log(value);
                }
            })
        }
    </script>
</body>
</html>
```

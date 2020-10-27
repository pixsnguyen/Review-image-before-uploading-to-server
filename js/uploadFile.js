var _token = $('meta[name="csrf-token"]').attr('content');
var template = '';
var idSelector = '';
var arrayIMG = [];
var form_data = new FormData();
var countItemFileImg = -1;
var dataImage = '';
// Div display and Button
var showImages ='.showImages';
var imageInput ='#imgInp';
var btnUploadImage ='#btnUploadImage';
// Message
var fileNotImage =' file is not an image';
var selectFileToUpload =' Please select files to upload';
var uploadPhoToSuccessfully =' Upload photo successfully';
if(typeof (selector) != 'undefined' && typeof (selector) == 'object'){
    showImages = (selector.showImages != '' && typeof(selector.showImages) != 'undefinded') ? selector.showImages :'.showImages';
    imageInput = (selector.imageInput != '' && typeof(selector.imageInput) != 'undefinded') ? selector.imageInput :'#imgInp';
    btnUploadImage = (selector.btnUploadImage != '' && typeof(selector.btnUploadImage) != 'undefinded') ? selector.btnUploadImage :'#btnUploadImage';
}
if(typeof (message) != 'undefined' && typeof (message) == 'object'){
    fileNotImage = (message.fileNotImage != '' && typeof(message.fileNotImage) != 'undefinded') ? message.fileNotImage :' file is not an image';
    selectFileToUpload = (message.selectFileToUpload != '' && typeof(message.selectFileToUpload) != 'undefinded') ? message.selectFileToUpload :' Please select files to upload';
    uploadPhoToSuccessfully = (message.uploadPhoToSuccessfully != '' && typeof(message.uploadPhoToSuccessfully) != 'undefinded') ? message.uploadPhoToSuccessfully :' Upload photo successfully';
}
function showMessage(status, message)
{
    if(message == "") return;
    //status: error, success, info, warning
    toastr.options = {
    "closeButton": true,
    "debug": false,
    "progressBar": true,
    "preventDuplicates": false,
    "positionClass": "toast-top-center",
    "showDuration": "1000",
    "hideDuration": "1000",
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
    }    
    
    toastr[status](message, "");    
}
// Read base64 image url
function readURL(input,key,idSelector) {
    input.files = input;
    if (input.files && input.files[key]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#upload_'+idSelector).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[key]); // convert to base64 string
    }
}
// View the image before uploading to the server
function loadImageView(arrayIMG,divView){
    var d = new Date();
    var time = d.getTime();
    var flagCheckTypeImage = false;
    var stringDontImage =''; 
    template += `<table class="table border" id="tableUpload">`;
    $.each(arrayIMG,function(key,value){
        type = value.type;
        if(type.includes("image")){
            idSelector = key+`_`+time;
            imgSize = ((value.size/1024) > 1024) ? parseFloat((value.size/1048576).toFixed(2))+` MB` : parseInt(value.size/1024)+` KB`;
            template += `
            <tbody>
                    <tr>
                        <td class="frameIMG border" width="10%">
                            <img id="upload_`+idSelector+`" src="#" alt="your image" width="50" hieght="50" />
                        </td>
                        <td class="fileName text-center border v-middle">
                            <span class="name_`+idSelector+`">`+value.name+`</span>
                        </td>
                        <td class="fileSize text-center border v-middle">
                            <span class="size_`+idSelector+`">`+imgSize+`</span>
                        </td>
                        <td class="frameDeleteFile text-center v-middle">
                            <button class="btn btn-danger itemIMG" type="button" onClick="return deleteItemIMG(`+key+`)" id="id_file_`+idSelector+`"><i class="fa fa-trash-o"></i></button>
                        </td>
                    </tr>
                </tbody>`;
                
        }else{
            //Check the data type of the file, if not the image file, then error
            flagCheckTypeImage = true;
            stringDontImage += value.name + ", ";
        }
    })
    if(flagCheckTypeImage){
        stringDontImage = stringDontImage.substring(0, stringDontImage.length - 1);
        let message = stringDontImage + fileNotImage;
        showMessage('error',message);
    }
    template += `</table>`;
    $(divView).html(template);
    template = '';
    // Load the corresponding image in the selected image array
    $.each(arrayIMG,function(key,value){
        idSelector = key+`_`+time;
        readURL(arrayIMG,key,idSelector);
    })
}
$(imageInput).change(function() {
    var inputFile = $(this).prop('files');
    // Save the selected data in the formdata
    if(inputFile.length > 0){
        $.each(inputFile,function(key,val){
            countItemFileImg++;
            arrayIMG.push(val);
            form_data.append('File_'+countItemFileImg, this);
        })
    }
    // function loadImageView with 2 arguments is array of data and div to display
    loadImageView(arrayIMG,showImages);
});
function deleteItemIMG(key){
    // Remove the selected keyed element from the data array
    arrayIMG.splice(key, 1);
    // Remove the selected keyed element from the form_data
    for (var keys of form_data.keys()) {
        form_data.delete('File_'+key);
    }
    var totalRecord = 0;
    for (var value of form_data.values()) {
        totalRecord++;
    }
    form_data_temp = new FormData();
    var index = -1;
    for (var pair of form_data.entries()) {
        index++;
        form_data_temp.set('File_'+index, pair[1]); 
    }
    // Update formdata elements again
    form_data = form_data_temp;
    loadImageView(arrayIMG,showImages);
}
$(btnUploadImage).click(function(){
    var checkTheLengthOfTheArrayFormData = 0;
    for (var value of form_data.values()) {
        checkTheLengthOfTheArrayFormData++;
    }
    // Check for non-zero array
    if(checkTheLengthOfTheArrayFormData == 0 && arrayIMG.length == 0){
        showMessage('error',selectFileToUpload)
        return;
    }
    $('.uploadIcon').removeClass('fa-cloud-upload');
    $('.uploadIcon').addClass('fa-refresh fa-spin');
    $(btnUploadImage).attr('disabled',true);
    if(!RetrieveOnlyDataToDisplay){
        $.ajax({
            url: './source/uploadFile.php',
            headers: { 'X-CSRF-TOKEN': _token },
            async: false,
            type: 'POST',
            data: form_data,
            processData: false,
            contentType: false,
            success: function (data, status) {
                // Reset when the results are returned successfully
                form_data = new FormData();
                arrayIMG = [];
                showMessage('success',uploadPhoToSuccessfully)
                $('.uploadIcon').addClass('fa-cloud-upload');
                $('.uploadIcon').removeClass('fa-refresh fa-spin');
                $(btnUploadImage).attr('disabled',false);
                $(showImages).html('');
                showImageListFromDatabase();
            },
            error: function (request, error) {

            }
        });
    }else{
        dataImage = form_data;
        $('.uploadIcon').addClass('fa-cloud-upload');
        $('.uploadIcon').removeClass('fa-refresh fa-spin');
        $(btnUploadImage).attr('disabled',false);
        // console.log('The program is only intended for user-side display')
    }
})
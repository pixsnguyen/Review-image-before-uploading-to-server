// Message
var titleNotify =' Notify';
var contentConfirm =' Do you want to delete the selected pictures?';
var confirmButton =' Yes';
var listOfFile ='.listOfFile';
var cancelButton =' No';
var notifySuccess =' Action executed successfully';
if(typeof (message) != 'undefined' && typeof (message) == 'object'){
    titleNotify = (message.titleNotify != '' && typeof(message.titleNotify) != 'undefinded') ? message.titleNotify :' Notify';
    contentConfirm = (message.contentConfirm != '' && typeof(message.contentConfirm) != 'undefinded') ? message.contentConfirm :' Do you want to delete the selected pictures?';
    confirmButton = (message.confirmButton != '' && typeof(message.confirmButton) != 'undefinded') ? message.confirmButton :' Yes';
    cancelButton = (message.cancelButton != '' && typeof(message.cancelButton) != 'undefinded') ? message.cancelButton :' No';
    notifySuccess = (message.notifySuccess != '' && typeof(message.notifySuccess) != 'undefinded') ? message.notifySuccess :' Action executed successfully';
}
if(typeof (selector) != 'undefined' && typeof (selector) == 'object'){
    listOfFile = (selector.listOfFile != '' && typeof(selector.listOfFile) != 'undefinded') ? selector.listOfFile :'.listOfFile';
}
function loadDatabase(){
    var _token = $('meta[name="csrf-token"]').attr('content');
    var result = '';
    $.ajax({
        url: './source/loadDatabase.php',
        dataType: 'json',
        headers: { 'X-CSRF-TOKEN': _token },
        async: false,
        type: 'POST',
        success: function (data, status) {
            result = data;
        },
        error: function (request, error) {

        }
    });
    return result;
}
function updateDatabase(data){
    var _token = $('meta[name="csrf-token"]').attr('content');
    var params = {};
    params['data'] = data;
    $.ajax({
        url: './source/updateDatabase.php',
        dataType: 'json',
        headers: { 'X-CSRF-TOKEN': _token },
        async: false,
        type: 'POST',
        data: params,
        success: function (data, status) {
            // Sucess
        },
        error: function (request, error) {

        }
    });
}
function deleteImageInFolder(path){
    var _token = $('meta[name="csrf-token"]').attr('content');
    var params = {};
    params['path'] = './../uploads/'+path;
    $.ajax({
        url: './source/deleteImageInFolder.php',
        dataType: 'json',
        headers: { 'X-CSRF-TOKEN': _token },
        async: false,
        type: 'POST',
        data: params,
        success: function (data, status) {
            // Every working well
        },
        error: function (request, error) {

        }
    });
}
function showImageListFromDatabase(){
    var data = loadDatabase();
    var template = `<table class="table border" id="tableUpload">`;
    $.each(data, function (key, value) {
        imgSize = ((value.size/1024) > 1024) ? parseFloat((value.size/1048576).toFixed(2))+` MB` : parseInt(value.size/1024)+` KB`;
        template += `
        <tbody>
                <tr>
                    <td class="frameIMG border" width="10%">
                        <img id="upload_`+value.id+`" src="uploads/`+value.path+`" alt="your image" width="50" hieght="50" />
                    </td>
                    <td class="fileName text-center border v-middle">
                        <span class="name_`+value.id+`">`+value.name+`</span>
                    </td>
                    <td class="fileSize text-center border v-middle">
                        <span class="size_`+value.id+`">`+imgSize+`</span>
                    </td>
                    <td class="frameDeleteFile text-center v-middle">
                        <button class="btn btn-danger itemIMG" type="button" onClick="return deleteItemIMGFromDatabase(`+key+`)" id="id_file_`+value.id+`"><i class="fa fa-trash-o"></i></button>
                    </td>
                </tr>
            </tbody>`;
    });
    template += `</table>`;
    $(listOfFile).html(template);
}
function deleteItemIMGFromDatabase(key){
    $.confirm({
        title: titleNotify,
        content: contentConfirm,
        confirmButton: confirmButton,
        cancelButton: cancelButton,
        confirmButtonClass: 'btn-success',
        cancelButtonClass: 'btn-primary',
        icon: 'fa fa-question-circle',
        confirm: function () {
            var data = loadDatabase();
            $.each(data,function(index,value){
                if(index == key){
                    deleteImageInFolder(value.path);
                }
            })
            data.splice(key, 1);
            updateDatabase(data);
            showImageListFromDatabase();
            showMessage('success',notifySuccess)
        },
        cancel: function () {

        }
    });
}
showImageListFromDatabase();
$(document).ready(function () {
    // $('#myformlogin').on('submit', function (e) {
    //     e.preventDefault();
    //     var data = {
    //         username: $('#username').val(),
    //         password: $('#password').val()
    //     };
    //     $.ajax({
    //         url: '/*',
    //         method: 'POST',
    //         dataType: 'json',
    //         data: data
    //     }).done(function (data) {
    //         console.log('OK');
    //     }).fail(function (err) {
    //         console.error(err);
    //     });
    // });

    $('#myform').on('submit', function(e) {
        e.preventDefault();

        if ($('#newpassword').val() !== $('#repassword').val())
            alert('Mật khẩu nhập lại không đúng');
        else {

            var oldpassword = $('#oldpassword').val();
            var newpassword = $('#newpassword').val();

            $.ajax({
                url: '/user/info',
                type: 'put',
                dataType: 'json',
                data: {
                    oldPassword: oldpassword,
                    newPassword: newpassword,
                }
            }).done(function (data) {
                alert("Thay đổi mật khẩu thành công.");
                $('#myPassModal').modal('hide');
            }).fail(function (err) {
                console.log(err);
                alert(err.responseJSON.msg);
            });
        }
    })
});
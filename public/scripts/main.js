$(document).ready(function () {
    $('#myformlogin').on('submit', function (e) {
        e.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();
        var url = window.location;

        $.ajax({
            url: '/user/info',
            method: 'post',
            dataType: 'json',
            data: {
                username: username,
                password: password
            }
        }).done(function (data) {
            $('#myModal').modal('hide');
            window.location.replace(url);
        }).fail(function (err) {
            alert(err.responseJSON.msg);
        });
    });

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
    });
});
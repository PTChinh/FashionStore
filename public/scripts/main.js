$(document).ready(function () {
    // $('#myForm').on('submit', function (event) {
    //     event.preventDefault(); // Stop the form from causing a page refresh.
    //     var data = {
    //         username: $('#username').val(),
    //         password: $('#password').val()
    //     };
    //     $.ajax({
    //         url: '/',
    //         method: 'GET'
    //     }).then(function (status) {
    //         // Do stuff with the response, like add it to the page dynamically.
    //         if(status === 401)
    //             $('#error').append('Wrong');
    //         else
    //             alert('ok');
    //     }).catch(function (err) {
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
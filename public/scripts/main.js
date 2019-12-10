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

    $('#btnUpdate').click(function () {
        if($('#newpassword').val() !== $('#repassword').val())
            alert('Mật khẩu nhập lại không đúng');
    });
});
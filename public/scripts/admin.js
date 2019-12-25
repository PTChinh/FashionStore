$(document).ready(function () {

    //ajax sign up staff
    $('#btnStaffSignUp').on('click', function (e) {
        e.preventDefault();

        var regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var email = $('#staffEmail').val();
        var username = $('#staffUsername').val();
        var password = $('#staffPassword').val();
        var role = parseInt($("#roleSelect option:selected").val(), 10);

        if (!regExEmail.test(String(email).toLowerCase())) {
            alert("Vui lòng điền email hợp lệ.");
        } else {
            $.ajax({
                url: '/admin/staff/signup',
                type: 'put',
                dataType: 'json',
                data: {
                    email: email,
                    username: username,
                    password: password,
                    role: role
                }
            }).done(function () {
                alert("Đăng kí thành công.");
                $('#staffSignUpModal').modal('hide');
                window.location.replace(window.location);
            }).fail(function (err) {
                console.log(err);
                alert("Đăng kí không thành công. Vui lòng thực hiện lại thao tác.");
            });
        }
    });

    //ajax update staff
    $('.update-staff').on('click', function (e) {
        e.preventDefault();

        var $row = $(this).closest("tr");    // Find the row
        var id = parseInt($row.find(".staff-id").text(), 10);
        var username = $row.find(".staff-username").text();
        var email = $row.find(".staff-email").text();
        var status = $row.find(".staff-status").attr('name');
        var role = $row.find(".staff-role").attr('name');

        $('#staffCurUsername').attr('value', username);
        $('#staffCurId').attr('value', id);
        $('#staffCurEmail').attr('value', email);
        $('#roleCurSelect').val(role);
        $('#statusCurSelect').val(status);

        $('#staffUpdateModal').modal('show');
    });

    $('#btnStaffUpdate').on('click', function (e) {
        e.preventDefault();

        var regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var email = $('#staffCurEmail').val();
        var username = $('#staffCurUsername').val();
        var id = $('#staffCurId').val();
        var role = parseInt($("#roleCurSelect option:selected").val(), 10);
        var status = parseInt($("#statusCurSelect option:selected").val(), 10);

        if (!regExEmail.test(String(email).toLowerCase())) {
            alert("Vui lòng điền email hợp lệ.");
        } else {
            $.ajax({
                url: '/admin/staff/update',
                type: 'put',
                dataType: 'json',
                data: {
                    id: id,
                    email: email,
                    username: username,
                    status: status,
                    role: role
                }
            }).done(function () {
                alert("Sửa thành công.");
                $('#staffUpdateModal').modal('hide');
                window.location.replace(window.location);
            }).fail(function (err) {
                console.log(err);
                alert("Sửa không thành công. Vui lòng thực hiện lại thao tác.");
            });
        }
    });
});
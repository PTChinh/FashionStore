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

    //ajax sign up customer
    $('#btnCusSignUp').on('click', function (e) {
        e.preventDefault();

        var regExPhone = /^0[35789][0-9]{8}$/;
        var regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var name = $('#cusName').val();
        var pass = $('#cusPassword').val();
        var dob = $('#cusDob').val();
        var address = $('#cusAddress').val();
        var email = $('#cusEmail').val();
        var phone = $('#cusPhone').val();
        var user = $('#cusUsername').val();

        var sex;

        if ($('#cusMaleSex').is(":checked")) {
            sex = "nam";
        }
        if ($('#cusFemaleSex').is(":checked")) {
            sex = "nữ";
        }
        if ($('#cusOtherSex').is(":checked")) {
            sex = "khác";
        }

        if (!regExPhone.test(phone)) {
            alert("Vui lòng điền số điện thoại hợp lệ.");
        } else if (!regExEmail.test(String(email).toLowerCase())) {
            alert("Vui lòng điền email hợp lệ.");
        } else {
            $.ajax({
                url: '/admin/user/signup',
                type: 'put',
                dataType: 'json',
                data: {
                    name: name,
                    dob: dob,
                    address: address,
                    email: email,
                    phone: phone,
                    sex: sex,
                    pass: pass,
                    username: user
                }
            }).done(function () {
                alert("Đăng kí thành công.");
                $('#userSignUpModal').modal('hide');
                window.location.replace(window.location);
            }).fail(function (err) {
                console.log(err);
                alert("Đăng kí không thành công. Vui lòng thực hiện lại thao tác.");
            });
        }
    });

    //ajax update user
    $('.update-cus').on('click', function (e) {
        e.preventDefault();

        var $row = $(this).closest("tr");    // Find the row
        var id = parseInt($row.find(".cus-id").text(), 10);
        var username = $row.find(".cus-username").text();
        var name = $row.find(".cus-name").text();
        var email = $row.find(".cus-email").text();
        var phone = $row.find(".cus-phone").text();
        var address = $row.find(".cus-address").text();
        var status = $row.find(".cus-status").attr('name');
        var dob = $row.find(".cus-dob").text();
        var sex = $row.find(".cus-sex").text();

        var curDob = dob.split('-');
        var tmp = curDob[0];
        curDob[0] = curDob[curDob.length -1];
        curDob[curDob.length -1] = tmp;
        curDob = curDob.join('-');

        $('#cusUpUsername').attr('value', username);
        $('#cusUpId').attr('value', id);
        $('#cusUpName').attr('value', name);
        $('#cusUpEmail').attr('value', email);
        $('#cusUpDob').val(curDob);
        $('#cusUpAddress').attr('value', address);
        $('#cusUpPhone').attr('value', phone);
        $('#cusSelect').val(status);

        if(sex === "nam") {
            $("#cusUpMaleSex").prop('checked', true);
            $("#cusUpFemaleSex").prop('checked', false);
            $("#cusUpOtherSex").prop('checked', false);
        }
        if(sex === "nữ") {
            $("#cusUpMaleSex").prop('checked', false);
            $("#cusUpFemaleSex").prop('checked', true);
            $("#cusUpOtherSex").prop('checked', false);
        }
        if(sex === "khác") {
            $("#cusUpMaleSex").prop('checked', false);
            $("#cusUpFemaleSex").prop('checked', false);
            $("#cusUpOtherSex").prop('checked', true);
        }

        $('#cusUpdateModal').modal('show');
    });

    $('#btnCusUpdate').on('click', function (e) {
        e.preventDefault();

        var regExPhone = /^0[35789][0-9]{8}$/;
        var regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var email = $('#cusUpEmail').val();
        var phone = $('#cusUpPhone').val();
        var name = $('#cusUpName').val();
        var dob = $('#cusUpDob').val();
        var address = $('#cusUpAddress').val();
        var id = $('#cusUpId').val();
        var status = parseInt($("#cusSelect option:selected").val(), 10);

        var sex;

        if ($('#cusUpMaleSex').is(":checked")) {
            sex = "nam";
        }
        if ($('#cusUpFemaleSex').is(":checked")) {
            sex = "nữ";
        }
        if ($('#cusUpOtherSex').is(":checked")) {
            sex = "khác";
        }

        if (!regExPhone.test(phone)) {
            alert("Vui lòng điền số điện thoại hợp lệ.");
        } else if (!regExEmail.test(String(email).toLowerCase())) {
            alert("Vui lòng điền email hợp lệ.");
        } else {
            $.ajax({
                url: '/admin/user/update',
                type: 'put',
                dataType: 'json',
                data: {
                    id: id,
                    email: email,
                    name: name,
                    address: address,
                    dob: dob,
                    status: status,
                    phone: phone,
                    sex: sex
                }
            }).done(function () {
                alert("Sửa thành công.");
                $('#cusUpdateModal').modal('hide');
                window.location.replace(window.location);
            }).fail(function (err) {
                console.log(err);
                alert("Sửa không thành công. Vui lòng thực hiện lại thao tác.");
            });
        }
    });
});
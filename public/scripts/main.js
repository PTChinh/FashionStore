$(document).ready(function () {
    //ajax user login
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

    //ajax user change password
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

    //ajax add product to cart
    $(".btnAddToCart").click(function(e) {
        e.preventDefault();

        var postUrl = window.location.pathname;
        var url = window.location;

        var $row = $(this).closest("tr");    // Find the row
        var $id = $row.find(".product-id").text();

        $.ajax({
            type: "post",
            url: postUrl,
            data: {
                productDetailId: $id
            },
        }).done(function () {
            alert("Thêm sản phẩm vào giỏ thành công");
            window.location.replace(url);
        }).fail(function (err) {
            console.log(err);
            alert(err.responseJSON.msg);
        });
    });

    //button add and sub product quantity
    $(".add").click(function(e) {
        e.preventDefault();

        var $row = $(this).closest("tr");    // Find the row
        var $price = parseInt($row.find(".price-pro").text(), 10);
        var $sale = parseInt($row.find(".sale-pro").text(), 10);

        var x = parseInt($(this).prev('input').attr('value'), 10);

        var $row = $(this).closest("tr");    // Find the row
        var $itemHas = parseInt($row.find(".item-has").text(), 10);

        if(x < $itemHas)
            $(this).prev('input').attr('value', ++x);

        $(this).closest('td').next('td').next('td').html($price * x - $price * x * $sale / 100);

        let totalMoney = 0;
        $('.total-money').each(function () {
            totalMoney += parseInt($(this).text(), 10);
        });

        document.getElementById('total').innerHTML = totalMoney + '₫';
        document.getElementById('totalFinal').innerHTML = totalMoney +  20000 + '₫';
    });

    $(".sub").click(function(e) {
        e.preventDefault();

        var $row = $(this).closest("tr");    // Find the row
        var $price = parseInt($row.find(".price-pro").text(), 10);
        var $sale = parseInt($row.find(".sale-pro").text(), 10);

        var x = parseInt($(this).next('input').attr('value'), 10);

        if(x > 1)
            $(this).next('input').attr('value', --x);

        $(this).closest('td').next('td').next('td').html($price * x - $price * x * $sale / 100);

        let totalMoney = 0;
        $('.total-money').each(function () {
            totalMoney += parseInt($(this).text(), 10);
        });

        document.getElementById('total').innerHTML = totalMoney + '₫';
        document.getElementById('totalFinal').innerHTML = totalMoney + 20000 + '₫';
    });

    //ajax remove product from cart
    $(".btnRemove").click(function(e) {
        e.preventDefault();

        var postUrl = window.location.pathname;
        var url = window.location;

        var $row = $(this).closest("tr");    // Find the row
        var $id = $row.find("input").attr('id');

        $.ajax({
            type: "post",
            url: postUrl,
            data: {
                productDetailId: $id
            },
        }).done(function () {
            alert("Xóa sản phẩm thành công");
            window.location.replace(url);
        }).fail(function (err) {
            console.log(err);
            alert(err.responseJSON.msg);
        });
    });

    //Click button buy
    $("#btnBuy").click(function () {
        var listProductDetails = [];
        var listTotalMoney = [];
        var listProductNames = [];
        var listProductPrice = [];
        var listProductQuantity = [];

        let totalMoney = 0;
        $('.total-money').each(function () {
            totalMoney += parseInt($(this).text(), 10);
        });

        $('.quantity-pro').each(function () {
            listProductDetails.push(parseInt($(this).attr('id'), 10));
        });

        $('.total-money').each(function () {
            listTotalMoney.push(parseInt($(this).text(), 10));
        });

        $('.name-pro').each(function () {
            listProductNames.push($(this).text());
        });

        $('.price-pro').each(function () {
            listProductPrice.push(parseInt($(this).text(), 10));
        });

        $('.quantity-pro').each(function () {
            listProductQuantity.push(parseInt($(this).attr('value'), 10));
        });

        $.ajax({
            type: "put",
            url: "/user/cart",
            dataType: 'json',
            data: {
                productDetails: listProductDetails,
                listTotalMoney: listTotalMoney,
                listProductNames: listProductNames,
                listProductPrice: listProductPrice,
                listProductQuantity: listProductQuantity,
                totalMoney: totalMoney
            }
        }).done(function () {
            alert("Đặt hàng thành công.");
            window.location.href = "../user/order";
        }).fail(function (err) {
            console.log(err);
            alert(err.responseJSON.msg);
        });
    });

    //ajax handle checkbox interested
    $(".checkforfun").change(function () {
        var productId = $(this).attr('id');
        if(this.checked) {

            $.ajax({
                type: "post",
                url: "/user/interested",
                data: {
                    productId: productId
                }
            }).done(function () {
                alert("Đã thêm vào yêu thích.");
            }).fail(function (err) {
                console.log(err);
                alert(err.responseJSON.msg);
            });

        } else {
            $.ajax({

                type: "put",
                url: "/user/interested",
                data: {
                    productId: productId
                }
            }).done(function () {
                alert("Đã xóa khỏi yêu thích.");
            }).fail(function (err) {
                console.log(err);
                alert(err.responseJSON.msg);
            });

        }
    });

    //ajax user change info
    $('#formChangeInfo').on('submit', function(e) {
        e.preventDefault();

        var regExPhone = /^0[35789][0-9]{8}$/;
        var regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var name = $('#name').val();
        var dob = $('#dob').val();
        var address = $('#address').val();
        var email = $('#email').val();
        var phone = $('#phone').val();

        var sex;

        if($('#maleSex').is(":checked")) {
            sex = "nam";
        }
        if($('#femaleSex').is(":checked")) {
            sex = "nữ";
        }
        if($('#otherSex').is(":checked")) {
            sex = "khác";
        }

        if(!regExPhone.test(phone)) {
            alert("Vui lòng điền số điện thoại hợp lệ.");
        } else if(!regExEmail.test(String(email).toLowerCase())) {
            alert("Vui lòng điền email hợp lệ.");
        } else {
            $.ajax({
                url: '/user/changeinfo',
                type: 'put',
                dataType: 'json',
                data: {
                    name: name,
                    dob: dob,
                    address: address,
                    email: email,
                    phone: phone,
                    sex: sex
                }
            }).done(function (data) {
                alert("Đã lưu thay đổi.");
            }).fail(function (err) {
                console.log(err);
                alert(err.responseJSON.msg);
            });
        }
    });

    //Upload user's avatar
    let readURL = function (input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                $('#avatar').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);

        }
    };

    $(".file-upload").on('change', function () {
        readURL(this);
    });

    $(".upload-button").on('click', function () {
        $(".file-upload").click();
    });


    //ajax logout
    $("#logout").on('click', function (e) {
        e.preventDefault();

        $.ajax({
            type: "get",
            url: "/user/logout",
        }).done(function () {
            window.location.href = "/";
        }).fail(function (err) {
            console.log(err);
            alert("Lỗi: " + err);
        })
    });

    //ajax user sign up
    $("#signup").on('click', function (e) {
        e.preventDefault();
        $('#myModal').modal('hide');
    });

    $("#btnSignUp").on('click', function (e) {

        var regExPhone = /^0[35789][0-9]{8}$/;
        var regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var name = $('#newname').val();
        var pass = $('#newpassword').val();
        var dob = $('#newdob').val();
        var address = $('#newaddress').val();
        var email = $('#newemail').val();
        var phone = $('#newphone').val();
        var user = $('#newusername').val();

        var sex;

        if ($('#newmaleSex').is(":checked")) {
            sex = "nam";
        }
        if ($('#newfemaleSex').is(":checked")) {
            sex = "nữ";
        }
        if ($('#newotherSex').is(":checked")) {
            sex = "khác";
        }

        if (!regExPhone.test(phone)) {
            alert("Vui lòng điền số điện thoại hợp lệ.");
        } else if (!regExEmail.test(String(email).toLowerCase())) {
            alert("Vui lòng điền email hợp lệ.");
        } else {
            $.ajax({
                url: '/user/signup',
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
                $('#mySignUpModal').modal('hide');
                window.location.href = "/";
            }).fail(function (err) {
                console.log(err);
                alert("Đăng kí không thành công. Vui lòng thực hiện lại thao tác.");
            });
        }
    });

    //ajax product filter
    $("#btnFilter").on('click', function (e) {
        e.preventDefault();

        var promotion = 0;

        if($("#promotion").is(":checked"))
            promotion = 1;

        var selectedVal = parseInt($("#priceSelect option:selected").val(), 10);
        var id = $(".form-id").attr('id');
        $(this).attr('href', '/product/filter?id=' + id + '&promotion=' + promotion + '&selected=' + selectedVal);

        window.location.href = '../product/filter?id=' + id + '&promotion=' + promotion + '&selected=' + selectedVal;

    });

    //ajax remove order
    $(".btnCancel").click(function(e) {
        e.preventDefault();
        var url = window.location;

        var $row = $(this).closest("tr");    // Find the row
        var $id = $row.find(".name-trans").text();

        $.ajax({
            type: "put",
            url: '/user/cancel',
            data: {
                trans: $id
            },
        }).done(function () {
            alert("Xóa đơn hàng thành công");
            window.location.replace(url);
        }).fail(function (err) {
            console.log(err);
            alert(err.responseJSON.msg);
        });
    });
});
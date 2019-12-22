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
            alert("Thêm sản phẩm thành công");
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
});
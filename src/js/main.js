$(document).ready(function() {
    $('.selectpicker').selectpicker({
        style: 'dropdown-select'
    });

    if ($('.dropdownUserInfo .dropdown-toggle').attr('title','My Account')) {
        $('.dropdownUserInfo .dropdown-toggle .filter-option').addClass('fa fa-user');
    }

    $('.searchWrapper').focusin(function () {
        $(this).addClass('onFocus');
    });

    $('.searchWrapper').focusout(function () {
        $(this).removeClass('onFocus');
    });
});

$(function () {
    $("#save").on('click', function (e) {
        e.preventDefault();

        localStorage.setItem('semaphoreUserToken', $("#token").val());
        $("#form").hide();
        $("#answer").show();
    });

    $("#edit-button").on('click', function () {
        $("#form").show();
        $("#answer").hide();
    });

    if (localStorage.getItem('semaphoreUserToken') !== null) {
        $("#form").hide();
        $("#answer").show();
    }
});

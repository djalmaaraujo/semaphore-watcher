var SemaphoreWatcherUI = function () {
    var instance = this;

    instance.bindSaveToken();
    instance.bindEditButton();
    instance.syncUI();
};

SemaphoreWatcherUI.prototype.syncUI = function () {
    var instance = this
        , token = localStorage.getItem('semaphoreUserToken');

    if ((token !== null) && (token !== "")) {
        console.log('aa');
        instance.showAnsweUI();
    } else {
        console.log('bb');
        instance.showFormUI();
    }
};

SemaphoreWatcherUI.prototype.bindEditButton = function () {
    var instance = this;

    $(".js-semaphore-editButton").on('click', function () {
        instance.showFormUI();
    });
};

SemaphoreWatcherUI.prototype.bindSaveToken = function () {
    var instance = this;

    $(".js-semaphore-saveButton").on('click', function (e) {
        e.preventDefault();

        localStorage.setItem('semaphoreUserToken', $(".js-semaphore-inputToken").val());

        instance.syncUI();
    });
};

SemaphoreWatcherUI.prototype.showFormUI = function () {
    var instance = this;

    $(".js-semaphore-formContainer").show();
    $(".js-semaphore-answerContainer").hide();
};

SemaphoreWatcherUI.prototype.showAnsweUI = function () {
    var instance = this;

    $(".js-semaphore-formContainer").hide();
    $(".js-semaphore-answerContainer").show();
};

$(function () {
    new SemaphoreWatcherUI();
});

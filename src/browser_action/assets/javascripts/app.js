var END_POINT_CHECK = 'https://semaphoreci.com/api/v1/projects?auth_token=';

var SemaphoreWatcherUI = function () {
  var instance = this;

  instance.bindSubmit();
  instance.bindEditButton();
  instance.syncUI();
};

SemaphoreWatcherUI.prototype.syncUI = function () {
  var instance = this
  , token = localStorage.getItem('semaphoreUserToken');

  if ((token !== null) && (token !== "")) {
    instance.showAnswerUI();
  } else {
    instance.showFormUI();
  }
};

SemaphoreWatcherUI.prototype.bindEditButton = function () {
  var instance = this;

  $(".js-semaphore-editButton").on('click', function () {
    instance.showFormUI();
  });
};

SemaphoreWatcherUI.prototype.bindSubmit = function () {
  var instance = this;

  $(".js-semaphore-submitForm").on('submit', function (e) {
    e.preventDefault();

    instance.showProgressUI();
    instance.validateToken($(".js-semaphore-inputToken").val());
  });
};

SemaphoreWatcherUI.prototype.validateToken = function (newToken) {
  var instance = this;

  var jqxhr = $.ajax(END_POINT_CHECK + newToken)
    .done(function() {
      localStorage.setItem('semaphoreUserToken', newToken);
      chrome.runtime.reload();
    })
    .fail(function() {
      $(".js-semaphore-inputToken").prop('val', false);
      $('.js-semaphore-error-text').text('I told you.. I Know, it\'s invalid!');
      $(".js-semaphore-invalid-container").addClass('is-invalid');
      instance.showFormUI();
    });
};

SemaphoreWatcherUI.prototype.showFormUI = function () {
  var instance = this;

  $('#mainPopup')
  .removeClass('mainPopup--answerUI')
  .removeClass('mainPopup--progressUI')
  .addClass('mainPopup--formUI');

  $(".js-semaphore-ProgressContainer").hide();
  $(".js-semaphore-answerContainer").hide();
  $(".js-semaphore-formContainer").show();
};

SemaphoreWatcherUI.prototype.showAnswerUI = function () {
  var instance = this;

  $('#mainPopup')
  .removeClass('mainPopup--formUI')
  .removeClass('mainPopup--progressUI')
  .addClass('mainPopup--answerUI');

  $(".js-semaphore-formContainer").hide();
  $(".js-semaphore-ProgressContainer").hide();
  $(".js-semaphore-answerContainer").show();
};

SemaphoreWatcherUI.prototype.showProgressUI = function () {
  var instance = this;

  $('#mainPopup')
  .removeClass('mainPopup--formUI')
  .removeClass('mainPopup--answerUI')
  .addClass('mainPopup--progressUI');

  $(".js-semaphore-formContainer").hide();
  $(".js-semaphore-answerContainer").hide();
  $(".js-semaphore-ProgressContainer").show();
};

$(function () {
  new SemaphoreWatcherUI();
});

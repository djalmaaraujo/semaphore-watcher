var END_POINT         = 'https://semaphoreci.com/api/v1/'
  , END_POINT_TOKEN   = '?auth_token=' + localStorage.getItem('semaphoreUserToken')
  , SOCKET_END_POINT  = 'https://semaphorewatcherserver.herokuapp.com/'
  , STATUES_PROGRESS  = { passed: 100, failed: 0, stopped: 0, pending: 50 };

var SemaphoreWatcher = function () {
  this.fetchProjects();
  this.bindSocket();
};

SemaphoreWatcher.prototype.fetchProjects = function () {
  var instance = this;

  $.get(END_POINT + 'projects' + END_POINT_TOKEN, function (data) {
    instance.save('projects', JSON.stringify(data));
  });
};

SemaphoreWatcher.prototype.getProject = function (hashId) {
  var instance = this
    , projects = instance.getProjects();

  return _.find(projects, function(o) { return o.hash_id === hashId });
};

SemaphoreWatcher.prototype.getProjects = function (hashId) {
  return JSON.parse(localStorage.getItem('projects'));
};

SemaphoreWatcher.prototype.save = function (key, data) {
  var instance = this;

  localStorage.setItem(key, data);
};

SemaphoreWatcher.prototype.notify = function (project, data) {
  var instance = this,
    status = data.status.toLowerCase();

  chrome.notifications.clear('notify.semaphore');

  var opt = {
    type: 'progress',
    iconUrl: '../../images/semaphore_' + status + '.png',
    title: '#' + data.build_number + ' - ' + project.name + ' (' + data.status.toUpperCase() + ')',
    progress: STATUES_PROGRESS[status],
    message: data.message,
    priority: 1
  };

  chrome.notifications.create('notify.semaphore', opt, function() {});
  chrome.notifications.onClicked.addListener(function () {
    chrome.tabs.create({ url: data.build_url });
  });
};

SemaphoreWatcher.prototype.bindSocket = function () {
  var instance = this
    , socket = io.connect(SOCKET_END_POINT);

  socket.on('build', function (data) {
    var project = instance.getProject(data.project);

    if (project === false) return false;

    instance.notify(project, data);
  });
};

$(function () {
  new SemaphoreWatcher();
});

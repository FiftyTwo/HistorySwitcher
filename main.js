var minutes = 10;

var people = [ 'Aaron', 'Jaren' ];

function getCurrentPerson() {
  var date = new Date();
  var minuteType = Math.floor(date.getMinutes() / minutes) % 2;
  return date.getDate() % 2 == 0 ? people[1 - minuteType] : people[minuteType];
}

function getSecondsLeft() {
  var date = new Date();
  return (minutes - date.getMinutes() % minutes)*60 - date.getSeconds();
}

var formatString = (num, base) => ('00' + num.toString(base)).substr(-2);

document.addEventListener('DOMContentLoaded', function() {
  if (!Notification) {
    alert('Notifications not supported... (stop using IE)');
    return;
  }

  if (Notification.permission !== 'granted')
    Notification.requestPermission();

  setInterval(() => {
    var currentTime = new Date();
    var timeRemaining = getSecondsLeft();
    var currentPerson = getCurrentPerson();
    if (timeRemaining <= 1) {
        var alertText = 'Switch! ' + currentPerson + "'s turn";
        alert(alertText);
        if (Notification.permission !== 'granted')
          Notification.requestPermission();
        var notification = new Notification(alertText);
        return;
    }
    var text = document.getElementById('text');
    text.innerHTML = currentPerson
      + "'s turn<br />"
      + Math.floor(timeRemaining/60)
      + ':'
      + formatString(timeRemaining % 60, 10);
    var gNum = Math.floor(255 * (timeRemaining/(minutes*60)));
    text.style.color = '#'
      + formatString(255 - gNum, 16)
      + formatString(gNum, 16)
      + '00';
  }, 500);
});


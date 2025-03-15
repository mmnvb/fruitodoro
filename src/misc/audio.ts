export function playClick(){
  new Audio('/sound/click.ogg').play();
}

export function playBack(){
  new Audio('/sound/unclick.ogg').play();
}

const alarm = new Audio('/sound/ringtone_1.ogg');
alarm.loop = true;

export function playAlarmSound(){
  alarm.play();
}

export function stopAlarmSound(){
  alarm.pause();
  alarm.currentTime = 0;
}

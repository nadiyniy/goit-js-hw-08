import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const SAVE_TIME = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const onCurrentTime = throttle(({ seconds }) => {
  localStorage.setItem(SAVE_TIME, JSON.stringify(seconds));
}, 1000);

const restorePlayback = () => {
  const savedTime = localStorage.getItem(SAVE_TIME);
  if (savedTime) {
    const currentTime = JSON.parse(savedTime);
    player.setCurrentTime(currentTime);
  }
};

player.on('timeupdate', onCurrentTime);

restorePlayback();

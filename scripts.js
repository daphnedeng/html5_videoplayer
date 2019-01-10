/* get elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* functions */
function tooglePlay() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

//change the play button icon
function updateButton() {
    //"this" is video
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon;
}

//skip seconds on video
function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

//change volumn and playback rate
function handleRangeUpdate() {
    video[this.name] = this.value;
    console.log(this.value);
}

//progress bar
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

//scrub. click on the progress will update the video 进度
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

/* add event listener */
video.addEventListener('click', tooglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', tooglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
//when someone move their mouse, first check mousedown variable. if it's true, move on to scrub(e). if false do nothing
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
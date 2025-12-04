let activePhoto = document.querySelector('.active-photo');
let previews = document.querySelectorAll('.preview-list a');

for (let activeImage of previews) {
  activeImage.onclick = function (evt) {
    evt.preventDefault();
    activePhoto.src = activeImage.href;
  }
}

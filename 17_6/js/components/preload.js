export function showPreloader() {
  // Если прелоадер уже есть, не добавляем заново
  if (document.getElementById('preloader')) {
    const loaderE3 = document.getElementById('preloader');

    loaderE3.style.display = 'flex'; 

    
  } else {

  const loaderEl = getLoaderEl();
  document.body.appendChild(loaderEl);

  loaderEl.style.display = 'flex';

  } 

}
export function hidePreloader() {
  const loaderEl = document.getElementById('preloader');
  if (loaderEl) {
    loaderEl.style.display = 'none';
  }

}

export function getLoaderEl () {

  const loaderEl = document.createElement("div");
  loaderEl.id = 'preloader';
  loaderEl.innerHTML = '<div class="preloader"></div>';
   
  return loaderEl;
}

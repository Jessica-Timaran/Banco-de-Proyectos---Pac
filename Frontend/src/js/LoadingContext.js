let isLoading = false;

export function startLoading() {
  isLoading = true;
  document.getElementById('loader').style.display = 'flex';
}

export function stopLoading() {
  isLoading = false;
  document.getElementById('loader').style.display = 'none';
}
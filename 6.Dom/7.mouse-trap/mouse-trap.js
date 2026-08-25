let activeCircle = null;
let boxElement = null;
let isTrapped = false;

export function setBox() {
  boxElement = document.createElement('div');
  boxElement.className = 'box';
  document.body.append(boxElement);
}

export function createCircle(e) {
  if (!e) return;

  activeCircle = document.createElement('div');
  activeCircle.className = 'circle';
  activeCircle.style.background = 'white';
  
  activeCircle.style.left = `${e.clientX - 25}px`;
  activeCircle.style.top = `${e.clientY - 25}px`;
  
  document.body.append(activeCircle);
  isTrapped = false; 
}
export function moveCircle(e) {
  if (!e || !activeCircle || !boxElement) return;

  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const radius = 25;

  const boxRect = boxElement.getBoundingClientRect();

  if (isTrapped) {
    const minX = boxRect.left + radius;
    const maxX = boxRect.right - radius;
    const minY = boxRect.top + radius;
    const maxY = boxRect.bottom - radius;
    const clampedX = Math.max(minX, Math.min(mouseX, maxX));
    const clampedY = Math.max(minY, Math.min(mouseY, maxY));

    activeCircle.style.left = `${clampedX - radius}px`;
    activeCircle.style.top = `${clampedY - radius}px`;
    return;
  }
  const isFullyInsideX = mouseX > (boxRect.left + radius) && mouseX < (boxRect.right - radius);
  const isFullyInsideY = mouseY > (boxRect.top + radius) && mouseY < (boxRect.bottom - radius);

  if (isFullyInsideX && isFullyInsideY) {
    isTrapped = true;
    activeCircle.style.background = 'var(--purple)';

    activeCircle.style.left = `${mouseX - radius}px`;
    activeCircle.style.top = `${mouseY - radius}px`;
  } else {
    activeCircle.style.left = `${mouseX - radius}px`;
    activeCircle.style.top = `${mouseY - radius}px`;
  }
}

window.addEventListener('click', createCircle);
window.addEventListener('mousemove', moveCircle);
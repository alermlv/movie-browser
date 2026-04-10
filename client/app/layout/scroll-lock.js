let scrollY = 0;

export function updateScrollLock(state) {
  const isLocked = Boolean(state.ui.activeDialog);

  if (isLocked) {
    scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
  } else {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";

    window.scrollTo(0, scrollY);
  }
}

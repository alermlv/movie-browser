let scrollY = 0;
let isScrollLocked = false;

export function updateScrollLock(state) {
  const shouldLock = Boolean(state.ui.activeDialog);

  if (shouldLock && !isScrollLocked) {
    scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    isScrollLocked = true;
    return;
  }

  if (!shouldLock && isScrollLocked) {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";

    window.scrollTo(0, scrollY);
    isScrollLocked = false;
  }
}

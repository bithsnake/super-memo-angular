import { Memo } from "../../memo/memo.model";

export function compareName( memo_a : Memo, memo_b : Memo ) {
  if ( memo_a.Title < memo_b.Title ){
    return -1;
  }
  if ( memo_a.Title > memo_b.Title ){
    return 1;
  }
  return 0;
}
export function compareId( memo_a : Memo, memo_b : Memo ) {
  if ( memo_a.Index < memo_b.Index ){
    return -1;
  }
  if ( memo_a.Index > memo_b.Index ){
    return 1;
  }
  return 0;
}
export function compareCreatedDate( memo_a : Memo, memo_b : Memo ) {
  if ( memo_a.CreatedDate < memo_b.CreatedDate ){
    return -1;
  }
  if ( memo_a.CreatedDate > memo_b.CreatedDate ){
    return 1;
  }
  return 0;
}

function SetBackToTopElement(InFrame : boolean) {
  let element = document.getElementById('backtotop');
  if (element === null) return;
    if (!InFrame) {
      element.classList.replace('full-opacity', 'fade-in');
      element.classList.replace('static', 'sticky');
    } else {
      element.classList.replace('fade-in', 'fade-out');
    }

    element.addEventListener('animationend', (currentAnim) => {
      if (element === null) throw new Error("There is no element with the id: ");
      if (currentAnim.animationName !== 'fadeOut') return;

      element.classList.replace('sticky', 'static');
      element.classList.replace('fade-out', 'full-opacity');
      return;
    });
}

export function PrevScrollY() : boolean{
  let lastKnownScrollYPosition: number = 0;
  let InFrame: boolean = false;
  document.addEventListener('scroll', () => {
    lastKnownScrollYPosition = window.scrollY;
    InFrame = window.scrollY < window.screen.availHeight / 4;
      SetBackToTopElement(InFrame);
  });
  return InFrame;
}
export const ScrollBackUp = () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
export const checkOverflow = (BackToTopElement : HTMLElement, ItemListElement : HTMLElement) : boolean =>
{
  var curOverflow = BackToTopElement.classList.contains('hidden');

  if (!curOverflow)
    BackToTopElement.classList.replace('hidden', 'show');

  var isOverflowing = ItemListElement.clientWidth < ItemListElement.scrollWidth
      || ItemListElement.clientHeight > window.screen.availHeight;

  if (isOverflowing)
    BackToTopElement.classList.add('show');

   return isOverflowing;
}

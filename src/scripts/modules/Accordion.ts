require("web-animations-js/web-animations-next.min");
export class Accordion {

  private accordion : NodeListOf<Element>;
  private animationOptions : KeyframeAnimationOptions;
  private initOptions : KeyframeAnimationOptions;

  constructor() {
      this.accordion = document.querySelectorAll('.js-acc');
      this.animationOptions = {
          fill: "forwards",
          duration: 500,
          easing: 'ease-in-out',
      }
      //初期化時に開いてるアコーディオン用のparams
      this.initOptions = {
          fill: "forwards",
          duration: 0,
      }
      if (this.accordion.length > 0) {
          this.init();
      }
  }

  init() : void {
    this.accordion.forEach(elem => {
      const trigger : HTMLElement | null = elem.querySelector('.js-acc__trg');
      const target: HTMLElement | null = elem.querySelector('.js-acc__cont');

      if (trigger === null || target === null) return;

      let isActive : boolean = trigger?.classList.contains('is-active');
      target!.style.overflow = 'hidden';

      let height = this.checkHeight(target, isActive);

      trigger.addEventListener('click', () => {
          isActive ? this.close(trigger,target, height) : this.open(trigger,target, height);
          isActive = !isActive
      })

      window.addEventListener('resize', ()=>{
          height = this.checkHeight(target, isActive)
      })

      this.checkDefaultState(trigger,target,height);
    })
  }

  open(trigger : HTMLElement,target : HTMLElement, height : number,initFlg = false) : void {
    target.animate(
      [
        {height:0,opacity:0},
        {opacity:0},
        {height:`${height}px`,opacity:1},
      ],
      initFlg ? this.initOptions : this.animationOptions
    ).finished.then((anim) => {
      if (anim.playState) {
        trigger.classList.add('is-active');
        this.scrollProvider.fixState(this.scrollProvider.locomotiveInstance);
      }
    });
  }

  close(trigger : HTMLElement,target : HTMLElement, height : number) : void {
    target.animate(
      [
        {height:`${height}px`,opacity:1},
        {opacity:0},
        {height:0,opacity:0},
      ],
      this.animationOptions
    ).finished.then((anim) => {
      if (anim.playState) {
        trigger.classList.remove('is-active');
        this.scrollProvider.fixState(this.scrollProvider.locomotiveInstance);
      }
    });
  }

  checkHeight(target : HTMLElement, isActive : boolean) : number {
    const init : string = isActive ? 'auto' : '0px';
    const options : number | KeyframeAnimationOptions = {
      fill: "forwards",
      duration: 0,
    };
    target.animate(
      [
        {height: init },
        {height:'auto'},
      ],
      options
    )
    const height = target!.getBoundingClientRect().height;
    target.animate(
      [
        {height:'auto'},
        {height: init },
      ],
      options
    )
    return height;
  }

  checkDefaultState(trigger : HTMLElement,target : HTMLElement, height : number) : void {
    trigger.classList.contains('is-active') ? this.open(trigger,target, height,true):null;
  }
}

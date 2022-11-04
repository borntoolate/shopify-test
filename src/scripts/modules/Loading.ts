// loading
import imagesLoaded from "imagesloaded";
import { ScrollJack } from "./ScrollJack";
import { FrontProductAnim } from "./FrontProductAnim";

export class Loading {
  private loadedFlag: boolean;
  private isRunning: boolean;
  private root: HTMLElement | null;
  private body: HTMLElement | null;
  private loadingElm: HTMLElement | null;
  private mainVisual: HTMLElement | null;
  private loadedImg: number;
  private imgLength: number;
  private progressElm: HTMLElement | null;
  private progressCounter: HTMLElement | null;
  private progressCurrent: number;
  private timer: number;
  private mwwpForm: HTMLElement | null;
  private mwwpError: HTMLCollection;
  private scrollProvider: ScrollJack;

  constructor(scrollProvider: ScrollJack) {
    this.loadedFlag = false;
    this.isRunning = false;
    // ▼imagesloaded
    this.root = document.querySelector("html");
    this.body = document.querySelector("body");
    this.mainVisual = document.getElementById("js-mainVisual");
    this.loadingElm = document.getElementById("js-loading");
    this.loadedImg = 0;
    this.imgLength = imagesLoaded("body", {
      background: true,
    }).images.length;
    this.progressElm = document.getElementById("js-progress");
    this.progressCounter = document.querySelector(".js-progressCounter");
    this.progressCurrent = 0;
    this.timer = 0;
    // mwwp form
    this.mwwpForm = document.getElementById("js-mwwpForm");
    this.mwwpError = document.getElementsByClassName("js-mwwpError");
    this.scrollProvider = scrollProvider;

    this.start();
  }

  start(): void {

    if (this.loadingElm) {
      imagesLoaded(this.loadingElm, (): void => {
        this.timer = window.setInterval(
          this.monitorProgress.bind(this),
          1000 / 50
        );
        imagesLoaded('body', {background: true}).on('progress', () => {
          this.loadedImg++;
        });
      });
    } else {
      this.clearLoading();
    }
  }

  monitorProgress(): void {
    const progressPer: number = (this.loadedImg / this.imgLength) * 100;
    this.progressCurrent += (progressPer - this.progressCurrent) * 0.1;
    if (this.progressCounter) {
      if (this.progressCurrent > 99.9) {
        this.progressCounter.textContent = '100%';
      } else {
        this.progressCounter.textContent = `${Math.floor(this.progressCurrent)}%`;
      }
    }
    if (this.progressCurrent >= 100) {
      this.clearLoading();
    }
    if (this.progressCurrent > 99.9) {
      this.progressCurrent = 100 + 10;
    }
  }

  clearLoading(): void {
    clearInterval(this.timer);
    window.scrollTo(0, 0);
    // Locomotive Scroll適用
    this.scrollProvider.init();
    // gsap適用
    if (this.body!.classList.contains('is-front-page')) {
      new FrontProductAnim(this.scrollProvider);
    }
    this.root!.classList.add("is-loaded");
    this.body!.classList.remove("is-trimmed");
    this.loadedFlag = true;

    // if (this.body!.classList.contains("is-forworker")) {
    //   const swingTitle = document.getElementById("js-swingTitle");
    //   if (swingTitle !== null) {
    //     if (!('animate' in document.documentElement) || (navigator && /(iPhone OS|iPad; CPU OS) (8|9|10|11|12|13)_/.test(navigator.userAgent))) {
    //       swingTitle!.classList.add('is-animate');
    //       setTimeout(() => {
    //         this.root!.classList.add("is-ready");
    //       }, 900);
    //     } else {
    //       swingTitle
    //       .animate(
    //         [
    //           { transform: "rotate(15deg)", transformOrigin: "top center" },
    //           { transform: "rotate(-10deg)" },
    //           { transform: "rotate(5deg)" },
    //           { transform: "rotate(-5deg)" },
    //           { transform: "rotate(0deg)" },
    //         ],
    //         {
    //           duration: 900,
    //           delay: 300,
    //           easing: "ease-out",
    //           fill: "none",
    //         }
    //       )
    //       .finished.then((anim) => {
    //         if (anim.playState) {
    //           this.root!.classList.add("is-ready");
    //         }
    //       });
    //     }
    //   } else {
    //     this.root!.classList.add("is-ready");
    //   }
    // }

    // if (this.mwwpForm !== null) {
    //   if (this.mwwpError.length) {
    //     const globalError = document.createElement("div");
    //     globalError.classList.add("p-globalError");
    //     const globalErrorTxt = document.createElement("p");
    //     globalErrorTxt.classList.add("p-globalError__txt");
    //     globalErrorTxt.innerHTML = "正しく入力されていない項目があります";
    //     globalError.insertBefore(globalErrorTxt, globalError.firstChild);
    //     this.mwwpForm.insertBefore(globalError, this.mwwpForm.firstChild);
    //   }
    // }
  }
}

import Util from "./Util";
import MatchMedia from "./MatchMedia";
import { throttle } from "throttle-debounce";

export default class ToggleToTop {
  private target: HTMLElement | null;
  private stop_at: HTMLElement | null;
  private fixer: Number;
  private speed: Number;
  private stop: Boolean;
  private util: Util;

  constructor(
    param = {
      target: "#js-goToTop",
      stop_at: "#js-footer",
      fixer: 100,
      speed: 400,
      stop: true,
    }
  ) {
    this.target = document.querySelector(param.target);
    this.stop_at = document.querySelector(param.stop_at);
    this.fixer = param.fixer;
    this.speed = param.speed;
    this.stop = param.stop;
    this.util = new Util();

    this.bindEvent();
  }

  bindEvent(): void {
    window.addEventListener("load", () => {
      this.toggle();
    });

    window.addEventListener(
      "scroll",
      throttle(200, () => {
        this.toggle();
      })
    );

    window.addEventListener(
      "resize",
      throttle(200, () => {
        this.toggle();
      })
    );
  }

  /**
   * フッター手前でボタンを止める
   * position fixed or relativeを切り替えるだけなのでhtml構造による位置調整や左右位置などはDOM/CSSで別途調整必要
   * @return void
   */
  togglePosition(): void {
    if (!this.target) return;

    const mm = new MatchMedia(),
      scrollHeight: Number = document.querySelector("body")!.offsetHeight,
      scrollPosition: Number = +window.innerHeight + +this.util.scrollTop(),
      footHeight: Number = this.stop_at ? this.stop_at.clientHeight : 0,
      trigger: Number = +scrollHeight - +scrollPosition;

    if (trigger <= footHeight) {
      const bottomPos = mm.is("md") ? +footHeight + 30 : +footHeight + 60;
      this.target.style.position = "absolute";
      this.target.style.bottom = `${bottomPos}px`;
    } else {
      this.target.style.position = "fixed";
      this.target.style.bottom = "";
    }
  }

  toggle(): void {
    if (this.util.scrollTop() > this.fixer) {
      this.target?.classList.add("is-triggerd");
    } else {
      this.target?.classList.remove("is-triggerd");
    }
    if (this.stop) {
      this.togglePosition();
    }
  }
}

// スクロール処理
require("intersection-observer");

export class CommonScroll {
  private root: HTMLElement | null;
  private header: HTMLElement | null;
  private footer: HTMLElement | null;
  private mainVisual: HTMLElement | null;
  private goToTop: HTMLElement | null;
  private blueBackArea: HTMLCollection;
  private defaultOption: Object;
  private headerOption: Object;
  private footerOption: Object;
  private goToTopOption: Object;
  private observedTargets: HTMLCollection;
  private addedClassName: string;

  constructor() {
    this.root = document.querySelector("html");
    this.header = document.getElementById("js-header");
    this.footer = document.getElementById("js-footer");
    this.mainVisual = document.getElementById("js-mainVisual");
    this.goToTop = document.getElementById("js-goToTop");
    this.blueBackArea = document.getElementsByClassName("js-areaBlue");
    this.defaultOption = {
      root: null,
      rootMargin: "-20% 0px",
      threshold: 0,
    };
    this.headerOption = {
      root: null,
      rootMargin: "0px 0px",
      threshold: 0,
    };
    this.footerOption = {
      root: null,
      rootMargin: "0px 0px",
      threshold: 0,
    };
    this.goToTopOption = {
      root: null,
      rootMargin: "0px 0px",
      threshold: 0,
    };
    this.observedTargets = document.getElementsByClassName("js-inview");
    this.addedClassName = "is-inView";

    if (this.mainVisual !== null) {
      this.bindEvent(
        this.mainVisual!,
        this.headerToggleClassName.bind(this),
        this.headerOption
      );
    }
    if (this.footer !== null) {
      this.bindEvent(
        this.footer!,
        this.goToTopStop.bind(this),
        this.footerOption
      );
    }
    if (this.blueBackArea.length) {
      [...this.blueBackArea].forEach((item) => {
        this.bindEvent(
          item,
          this.goToTopToggleClassName.bind(this),
          this.goToTopOption
        );
      });
    }
    if (this.observedTargets.length) {
      [...this.observedTargets].forEach((item) => {
        this.bindEvent(item, this.addClassName.bind(this), this.defaultOption);
      });
    }
  }

  bindEvent(
    target: HTMLElement | Element,
    callback: IntersectionObserverCallback,
    option: Object
  ): void {
    const observer = new IntersectionObserver(callback, option);
    observer.observe(target);
  }

  addClassName(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(this.addedClassName);
      }
    });
  }

  headerToggleClassName(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (this.header !== null) {
          this.root!.classList.remove("headerIsFixed");
          this.header.classList.remove("is-fixed");
        }
        if (this.goToTop !== null) {
          this.goToTop.classList.remove("is-visible");
        }
      } else {
        if (this.header !== null) {
          this.root!.classList.add("headerIsFixed");
          this.header.classList.add("is-fixed");
        }
        if (this.goToTop !== null) {
          this.goToTop.classList.add("is-visible");
        }
      }
    });
  }

  goToTopToggleClassName(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (this.goToTop !== null) {
          this.goToTop.classList.add("is-colored");
        }
      } else {
        if (this.goToTop !== null) {
          this.goToTop.classList.remove("is-colored");
        }
      }
    });
  }

  goToTopStop(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (this.goToTop !== null) {
          this.goToTop.classList.add("is-stopped");
        }
      } else {
        if (this.goToTop !== null) {
          this.goToTop.classList.remove("is-stopped");
        }
      }
    });
  }
}

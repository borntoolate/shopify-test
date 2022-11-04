/**
 * formを空にする
 */
export default class ClearForm {
  private trg: HTMLElement | null;
  private target: HTMLCollection;

  constructor() {
    this.trg = document.getElementById("js-formClear");
    this.target = document.forms;

    if (this.trg) {
      this.bindEvent();
    }
  }

  clearFormAll(): void {
    if (this.target.length) {
      [...this.target].forEach((item) => {
        this.clearForm(item);
      });
    }
  }

  clearForm(form): void {
    if (form.elements.length) {
      [...form.elements].forEach((item) => {
        this.clearElement(item);
      });
    }
  }

  clearElement(element): void {
    switch (element.type) {
      case "hidden":
      case "submit":
      case "reset":
      case "button":
      case "image":
        return;
      case "file":
        return;
      case "text":
      case "password":
      case "textarea":
      case "email":
        element.value = "";
        return;
      case "checkbox":
      case "radio":
        element.checked = false;
        return;
      case "select-one":
      case "select-multiple":
        element.selectedIndex = 0;
        return;
      default:
    }
  }

  bindEvent(): void {
    this.trg!.addEventListener(
      "click",
      (): void => {
        this.clearFormAll();
      },
      false
    );
  }
}

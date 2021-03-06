import { HasRender } from "../interfaces/HasRender.js";
import { HasHtmlFormat } from "../interfaces/HasHtmlFormat.js";
import { Storage } from "../classes/Storage.js";

export class Display implements HasRender {
  formContainer: HTMLDivElement;
  constructor(
    private container: HTMLDivElement,
    private hiddenDiv: HTMLDivElement,
    private BtnPrint: HTMLButtonElement
  ) {
    this.formContainer = document.getElementById(
      "form-container"
    ) as HTMLDivElement;
  }
  render(docObjet: HasHtmlFormat, docType: string): void {
    const htmlString: string = docObjet.htmlFormat();
    this.container.innerHTML = htmlString;
    this.hiddenDiv.classList.remove("invisible");
    this.formContainer.innerHTML = "";

    if (docType === "invoice") {
      this.BtnPrint.innerText = "Imprimer la facture";
    }
    if (docType === "estimation") {
      this.BtnPrint.innerText = "Imprimer le devis";
    }
    new Storage(docType, htmlString);
  }
}

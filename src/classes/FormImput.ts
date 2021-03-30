import { HasHtmlFormat } from "../interfaces/HasHtmlFormat.js";
import { Datas } from "../classes/Datas.js";
import { Display } from "./Display.js";
import { HasRender } from "../interfaces/HasRender.js";
import { HasPrint } from "../interfaces/HasPrint.js";
import { Print } from "../classes/Print.js";

export class FormInput {
  form: HTMLFormElement;
  type: HTMLSelectElement;
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  address: HTMLInputElement;
  country: HTMLInputElement;
  town: HTMLInputElement;
  zip: HTMLInputElement;
  product: HTMLInputElement;
  price: HTMLInputElement;
  quantity: HTMLInputElement;
  tva: HTMLInputElement;
  container: HTMLDivElement;
  hiddenDiv: HTMLDivElement;
  BtnPrint: HTMLButtonElement;
  BtnReload: HTMLButtonElement;
  BtnStoredInvoices: HTMLButtonElement;
  BtnStoredEstimates: HTMLButtonElement;
  StoredData: HTMLDivElement;
  constructor() {
    this.form = document.getElementById("form") as HTMLFormElement;
    this.type = document.getElementById("type") as HTMLSelectElement;
    this.firstName = document.getElementById("firstName") as HTMLInputElement;
    this.lastName = document.getElementById("lastName") as HTMLInputElement;
    this.address = document.getElementById("address") as HTMLInputElement;
    this.country = document.getElementById("country") as HTMLInputElement;
    this.town = document.getElementById("town") as HTMLInputElement;
    this.zip = document.getElementById("zip") as HTMLInputElement;
    this.product = document.getElementById("product") as HTMLInputElement;
    this.price = document.getElementById("price") as HTMLInputElement;
    this.quantity = document.getElementById("quantity") as HTMLInputElement;
    this.tva = document.getElementById("tva") as HTMLInputElement;
    this.submitFormListener();
    this.container = document.getElementById(
      "document-container"
    ) as HTMLDivElement;
    this.hiddenDiv = document.getElementById("hiddenDiv") as HTMLDivElement;
    this.BtnPrint = document.getElementById("print") as HTMLButtonElement;
    this.printListener(this.BtnPrint, this.container);
    this.BtnReload = document.getElementById("reload") as HTMLButtonElement;
    this.deleteListener(this.BtnReload);
    this.BtnStoredInvoices = document.getElementById(
      "stored-invoices"
    ) as HTMLButtonElement;
    this.BtnStoredEstimates = document.getElementById(
      "stored-estimates"
    ) as HTMLButtonElement;
    this.StoredData = document.getElementById("stored-data") as HTMLDivElement;
    this.getDocsListener();
  }
  private submitFormListener(): void {
    this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
  }

  private handleFormSubmit(e: Event) {
    e.preventDefault();
    const inputs = this.inputDatas();
    if (Array.isArray(inputs)) {
      const [
        type,
        firstName,
        lastName,
        address,
        country,
        town,
        zip,
        product,
        price,
        quantity,
        tva,
      ] = inputs;
      console.log(
        type,
        firstName,
        lastName,
        address,
        country,
        town,
        zip,
        product,
        price,
        quantity,
        tva
      );

      let docData: HasHtmlFormat;
      let date: Date = new Date();

      docData = new Datas(
        type,
        firstName,
        lastName,
        address,
        country,
        town,
        zip,
        product,
        price,
        quantity,
        tva,
        date
      );
      console.log(docData.htmlFormat());
      let template: HasRender;
      template = new Display(this.container, this.hiddenDiv, this.BtnPrint);
      template.render(docData, type);
    }
  }

  private printListener(btn: HTMLButtonElement, container: HTMLDivElement) {
    btn.addEventListener("click", () => {
      let SelectedDoc: HasPrint;
      SelectedDoc = new Print(container);
      SelectedDoc.print();
    });
  }
  private deleteListener(btn: HTMLButtonElement) {
    btn.addEventListener("click", () => {
      document.location.reload();
      window.scroll(0, 0);
    });
  }

  private getDocsListener(): void {
    this.BtnStoredInvoices.addEventListener(
      "click",
      this.getItems.bind(this, "invoice")
    );
    this.BtnStoredEstimates.addEventListener(
      "click",
      this.getItems.bind(this, "estimate")
    );
  }

  private getItems(docType: string) {
    if (this.StoredData.hasChildNodes()) {
      this.StoredData.innerHTML = "";
    }
    if (localStorage.getItem(docType)) {
      let array: string | null;
      array = localStorage.getItem(docType);
      if (array !== null && array.length > 2) {
        let arrayData: string[];
        arrayData = JSON.parse(array);
        arrayData.map((doc: string): void => {
          let card: HTMLDivElement = document.createElement("div");
          let cardBody: HTMLDivElement = document.createElement("div");
          let cardClasses: Array<string> = ["card", "mt-5"];
          let cardBodyClasses: string = "card-body";

          card.classList.add(...cardClasses);
          cardBody.classList.add(cardBodyClasses);
          cardBody.innerHTML = doc;
          card.append(cardBody);
          this.StoredData.append(card);
        });
      } else {
        this.StoredData.innerHTML = `<div>Pas de données à afficher !</div>`;
      }
    }
  }

  private inputDatas():
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        number,
        string,
        number,
        number,
        number
      ]
    | void {
    const type = this.type.value;
    const firstName = this.firstName.value;
    const lastName = this.lastName.value;
    const address = this.address.value;
    const country = this.country.value;
    const town = this.town.value;
    const zip = this.zip.valueAsNumber;
    const product = this.product.value;
    const price = this.price.valueAsNumber;
    const quantity = this.quantity.valueAsNumber;
    const tva = this.tva.valueAsNumber;

    if (zip > 0 && price > 0 && quantity > 0 && tva > 0) {
      return [
        type,
        firstName,
        lastName,
        address,
        country,
        town,
        zip,
        product,
        price,
        quantity,
        tva,
      ];
    } else {
      alert("Erreur une des valeurs ne peut pas etre égale à 0 !");
      return;
    }
  }
}

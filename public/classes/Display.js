export class Display {
    constructor(container, hiddenDiv, BtnPrint) {
        this.container = container;
        this.hiddenDiv = hiddenDiv;
        this.BtnPrint = BtnPrint;
        this.formContainer = document.getElementById("form-container");
    }
    render(docObjet, docType) {
        const htmlString = docObjet.htmlFormat();
        this.container.innerHTML = htmlString;
        this.hiddenDiv.classList.remove("invisible");
        this.formContainer.innerHTML = "";
        if (docType === "invoice") {
            this.BtnPrint.innerText = "Imprimer la facture";
        }
        if (docType === "estimation") {
            this.BtnPrint.innerText = "Imprimer le devis";
        }
    }
}

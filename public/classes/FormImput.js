import { Datas } from "../classes/Datas.js";
import { Display } from "./Display.js";
import { Print } from "../classes/Print.js";
export class FormInput {
    constructor() {
        this.form = document.getElementById("form");
        this.type = document.getElementById("type");
        this.firstName = document.getElementById("firstName");
        this.lastName = document.getElementById("lastName");
        this.address = document.getElementById("address");
        this.country = document.getElementById("country");
        this.town = document.getElementById("town");
        this.zip = document.getElementById("zip");
        this.product = document.getElementById("product");
        this.price = document.getElementById("price");
        this.quantity = document.getElementById("quantity");
        this.tva = document.getElementById("tva");
        this.submitFormListener();
        this.container = document.getElementById("document-container");
        this.hiddenDiv = document.getElementById("hiddenDiv");
        this.BtnPrint = document.getElementById("print");
        this.printListener(this.BtnPrint, this.container);
        this.BtnReload = document.getElementById("reload");
        this.deleteListener(this.BtnReload);
    }
    submitFormListener() {
        this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
    }
    handleFormSubmit(e) {
        e.preventDefault();
        const inputs = this.inputDatas();
        if (Array.isArray(inputs)) {
            const [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva,] = inputs;
            console.log(type, firstName, lastName, address, country, town, zip, product, price, quantity, tva);
            let docData;
            let date = new Date();
            docData = new Datas(type, firstName, lastName, address, country, town, zip, product, price, quantity, tva, date);
            console.log(docData.htmlFormat());
            let template;
            template = new Display(this.container, this.hiddenDiv, this.BtnPrint);
            template.render(docData, type);
        }
    }
    printListener(btn, container) {
        btn.addEventListener("click", () => {
            let SelectedDoc;
            SelectedDoc = new Print(container);
            SelectedDoc.print();
        });
    }
    deleteListener(btn) {
        btn.addEventListener("click", () => {
            document.location.reload();
            window.scroll(0, 0);
        });
    }
    inputDatas() {
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
        }
        else {
            alert("Erreur une des valeurs ne peut pas etre égale à 0 !");
            return;
        }
    }
}

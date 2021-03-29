import { HasHtmlFormat } from "./HasHtmlFormat.js";

export interface HasRender {
  render(docObjet: HasHtmlFormat, docType: string): void;
}

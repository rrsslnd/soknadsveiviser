import { b64toBlob } from "./blob";
import { LocalePDFObjekt } from "../../../../typer/sprak";

export const hentPDFurl = (
  pdfObjekt: LocalePDFObjekt,
  valgtLocale: string,
  globalLocale: string
) => hentPDFasset(pdfObjekt, valgtLocale, globalLocale).url;

export const hentPDFasset = (
  pdfObjekt: LocalePDFObjekt,
  valgtLocale: string,
  globalLocale: string
) => hentPDFobjekt(pdfObjekt, valgtLocale, globalLocale).asset;

export const hentPDFobjekt = (
  pdfObjekt: LocalePDFObjekt,
  valgtLocale: string,
  globalLocale: string
) => {
  // Generer url til hovedskjema og vedlegg
  const PDFsprak = pdfObjekt[valgtLocale]
    ? valgtLocale
    : pdfObjekt[globalLocale]
    ? globalLocale
    : `nb`;
  const pdf = pdfObjekt[PDFsprak];

  if (pdf) {
    return pdf;
  } else {
    throw new Error("Dokumentet har ikke et gyldig språk");
  }
};

/*
export const lastNedFil = (url: string, tittel: string, filtype: string) => {
  console.log(`Laster ned ${tittel}`);
  FileSaver.saveAs(url, `${tittel}.${filtype}`);
};

^ Tester det å fjerne fileSaver for nedlastinger mot sanity, i og med at vi tror vi opplever noe problemer med dette.
*/

export const lastNedFilBase64 = (base64: string, tittel: string, filtype: string) => {
  console.log(`Laster ned ${tittel}`);
  const blob = new Blob([b64toBlob(base64)]);
  automatiskNedlasting(blob, tittel, filtype);
};

export async function lastNedFil(filUrl: string, tittel: string, filtype: string) {
  try {
    const response = await fetch(filUrl);
    if (!response.ok) {
      console.error(`Network response was not ok ${response.status} ${response.statusText}`);
    }
    const responseBlob = await response.blob();
    const blob = new Blob([responseBlob]);
    automatiskNedlasting(blob, tittel, filtype);
  } catch (error) {
    console.log("There has been a problem with your fetch operation: ", error.message);
  }

}

const automatiskNedlasting = (blob: Blob, tittel: string, filtype: string) => {
  if (window.navigator && window.navigator.msSaveOrOpenBlob) { // for IE og edge
    window.navigator.msSaveOrOpenBlob(blob, `${tittel}.${filtype}`);
  } else { // for alt annet
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${tittel}.${filtype}`);
    document.body.appendChild(link);
    link.click();
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
    window.URL.revokeObjectURL(url);
  }
};

import { Kategori } from "../typer/kategori";
import { Underkategori } from "../typer/underkategori";

export const erKategoriValgt = (kategori: Kategori, valgtKategori: Kategori) =>
  kategori.urlparam === valgtKategori.urlparam;

export const typeTilEngelsk = (type: string) =>
  type === "engelsk" ? "english" : type;

export const typeTilNorsk = (type: string) =>
  type === "english" ? "engelsk" : type;

export const typeTilLocale = (type: string) =>
  type === "engelsk" ? "en" : "nb";

export const filtrerKategorier = (kategorier: Kategori[], type: string) =>
  kategorier.filter(kategori => kategori.domene.toLowerCase() === type);

export const hentMestBrukteUnderkategorier = (
  kategorier: Kategori[]
): Underkategori[] => {
  let mestBrukteUnderkategorier: Underkategori[] = [];

  for (let kategori of kategorier) {
    if (kategori.underkategorier) {
      for (let underkategori of kategori.underkategorier) {
        if (
          underkategori.lenketilhorlighet === "mestbrukte" &&
          !mestBrukteUnderkategorier.some(
            uk => uk.urlparam === underkategori.urlparam
          )
        ) {
          mestBrukteUnderkategorier.push(underkategori);
        }
      }
    }
  }
  return mestBrukteUnderkategorier;
};

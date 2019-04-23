import { Vedlegg } from "../../../../../typer/vedlegg";
import { Skjema } from "../../SkjemaVisning";
import { localeTekst } from "../../../../../utils/sprak";

export const hentVedleggslisteForJoark = (
  vedleggsliste: Vedlegg[],
  locale: string
) =>
  vedleggsliste.map(vedlegg =>
    vedlegg.skjematilvedlegg
      ? `${vedlegg.skjematilvedlegg.skjemanummer} ${vedlegg.skjematilvedlegg
          .navn.nb || vedlegg.skjematilvedlegg.navn[locale]}`
      : vedlegg.navn.nb || vedlegg.navn[locale]
  );

export const hentDokumentliste = (
  vedleggsliste: Vedlegg[],
  hovedskjema: Skjema,
  locale: string,
  ettersendelse?: string
) => {
  const dokumentlisteTilVisning = vedleggsliste.map(vedlegg =>
    vedlegg.skjematilvedlegg
      ? `${vedlegg.skjematilvedlegg.skjemanummer} ${localeTekst(
          vedlegg.skjematilvedlegg.navn,
          locale
        )}`
      : localeTekst(vedlegg.navn, locale)
  );

  !ettersendelse
    ? dokumentlisteTilVisning.unshift(
        `${hovedskjema.skjemanummer} ${hovedskjema.navn[locale] ||
          hovedskjema.navn.nb}`
      )
    : dokumentlisteTilVisning;

  return dokumentlisteTilVisning;
};

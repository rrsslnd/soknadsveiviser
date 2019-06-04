import * as React from "react";
import Underkategorier from "../Underkategorier";
import Hovedbanner from "../../../../komponenter/bannere/Hovedbanner";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Kategori } from "../../../../typer/kategori";
import { Underkategori } from "../../../../typer/underkategori";
import { localeTekst } from "../../../../utils/sprak";
import { medKategorier } from "../../../../states/providers/Kategorier";

interface Props {
  valgtType: "Person" | "Bedrift";
  valgtKategori: Kategori;
  valgtUnderkategori: Underkategori;
  alleKategorier: Kategori[];
}

type MergedProps = Props & InjectedIntlProps;
const Kategoriinnhold = (props: MergedProps) => {
  const { intl, valgtKategori } = props;

  return (
    <div className="innhold__container">
      <Hovedbanner
        tittel={intl.formatMessage({ id: "kategori.beskrivelse" })}
        undertittel={localeTekst(valgtKategori.tittel, intl.locale)}
        backgroundColor={valgtKategori.domenefarge}
        borderColor={valgtKategori.kantfarge}
      />
      <div className="innhold">
        <Underkategorier valgtKategori={valgtKategori} {...props} />
      </div>
    </div>
  );
};

export default medKategorier<Props>(injectIntl<MergedProps>(Kategoriinnhold));

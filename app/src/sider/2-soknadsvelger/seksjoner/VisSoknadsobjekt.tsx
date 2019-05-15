import * as React from "react";
import Undertittel from "nav-frontend-typografi/lib/undertittel";
import { injectIntl, InjectedIntlProps } from "react-intl";
import BlockContent from "@sanity/block-content-to-react";
import KnappSoknadsdialog from "../knapper/Soknadsdialog";
import KnappDokumentinnsending from "../knapper/Dokumentinnsending";
import KnappPapirSoknad from "../knapper/PapirSoknad";
import KnappEttersendelse from "../knapper/Ettersendelse";
import KnappKlage from "../knapper/Klage";
import RelevantInformasjon from "./RelevantInformasjon";
import { link } from "../../../utils/serializers";
import {
  finnesDokumentinnsending,
  finnesInngangTilSoknadsdialog
} from "../../../utils/soknadsobjekter";
import { Soknadsobjekt } from "../../../typer/soknad";
import LocaleTekst from "../../../komponenter/localetekst/LocaleTekst";
import { localeBlockTekst } from "../../../utils/sprak";
import { RouteComponentProps, withRouter } from "react-router";

interface Props {
  key: number;
  soknadsobjekt: Soknadsobjekt;
}

const VisSoknadsobjekt = (props: Props & InjectedIntlProps & RouteComponentProps<{}>) => {
  const { locale } = props.intl;
  const { soknadsobjekt, key } = props;
  const { navn, beskrivelse, lenker, hovedskjema } = soknadsobjekt;
  const valgtSkjemanummer = props.location.hash.split("#")[1];
  const tilsoknadsdialog = finnesInngangTilSoknadsdialog(soknadsobjekt, locale);
  const dokumentinnsending = finnesDokumentinnsending(soknadsobjekt);

  const markert = valgtSkjemanummer === hovedskjema.skjemanummer ? "marker" : "";
  console.log(props.location.hash);

  return (
    <div
      id={hovedskjema.skjemanummer}
      key={key}
      className={"soknadsobjekt"}
    >
      <div className="soknadsobjekt__innhold">
        <div>
          <Undertittel className={markert}>
            <LocaleTekst tekst={navn} />
          </Undertittel>
          {beskrivelse && (
            <div className="typo-normal soknadsobjekt__beskrivelse">
              <BlockContent
                blocks={localeBlockTekst(beskrivelse, locale)}
                serializers={{ marks: { link } }}
              />
            </div>
          )}
        </div>
        {lenker && lenker.length > 0 && (
          <RelevantInformasjon lenker={lenker} locale={locale} />
        )}
      </div>
      <div className="knapper-wrapper litenavstand">
        {tilsoknadsdialog && (
          <KnappSoknadsdialog soknadsobjekt={soknadsobjekt} />
        )}
        {dokumentinnsending && !tilsoknadsdialog && (
          <KnappDokumentinnsending soknadsobjekt={soknadsobjekt} />
        )}
        <KnappPapirSoknad soknadsobjekt={soknadsobjekt} />
        <KnappEttersendelse soknadsobjekt={soknadsobjekt} />
        <KnappKlage soknadsobjekt={soknadsobjekt} />
      </div>
    </div>
  );
};

export default withRouter(injectIntl(VisSoknadsobjekt));

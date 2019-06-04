import React, { Component } from "react";
import { apiKallSamlet } from "../../../klienter/sanityKlient";
import Innholdstittel from "nav-frontend-typografi/lib/innholdstittel";
import { Kategori } from "../../../typer/kategori";
import { RouteComponentProps } from "react-router-dom";
import VisSoknadsobjekt from "./seksjoner/VisSoknadsobjekt";
import Hovedbanner from "../../../komponenter/bannere/Hovedbanner";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import Spinner from "../../../komponenter/spinner/Spinner";
import { localeTekst } from "../../../utils/sprak";
import LocaleTekst from "../../../komponenter/localetekst/LocaleTekst";
import PanelBase from "nav-frontend-paneler";
import Systemtittel from "nav-frontend-typografi/lib/systemtittel";
import { hentSkjemanummerHash } from "../../../utils/hentSkjemanummerHash";
import Lenkepanel from "nav-frontend-lenkepanel/lib";
import Ingress from "nav-frontend-typografi/lib/ingress";

interface State {
  data: Kategori[];
}

type MergedProps = RouteComponentProps & InjectedIntlProps;
class SkjemautlistingDetaljert extends Component<MergedProps, State> {
  state = { data: [] };
  componentDidMount = () => this.hentDataFraSanity();

  hentDataFraSanity = () =>
    apiKallSamlet().then(
      (sanityData: any[]) => sanityData && this.setState({ data: sanityData })
    );

  render() {
    if (!this.state.data.length) {
      return <Spinner />;
    }

    const { intl } = this.props;
    const { data } = this.state;
    const valgtSkjemanummer = hentSkjemanummerHash(this.props.location.hash);

    return (
      <div className="side__wrapper">
        <div className="innhold__container">
          <Hovedbanner
            tittel={intl.formatMessage({
              id: "skjemautlisting.lenketil.detaljert"
            })}
            undertittel={intl.formatMessage({
              id: "skjemautlisting"
            })}
          />
          <PanelBase>
            <div className="skjemautlisting__paneler">
              <Lenkepanel tittelProps="element" href="skjema" border={true}>
                <FormattedMessage id="skjemautlisting.lenketil.skjema" />
              </Lenkepanel>
              <Lenkepanel
                className="skjemautlisting__lenkepanel"
                tittelProps="element"
                href="sed"
                border={true}
              >
                <FormattedMessage id="skjemautlisting.lenketil.sed" />
              </Lenkepanel>
            </div>
            <Ingress className="skjemautlisting__litenmargin-overunder">
              <FormattedMessage id="skjemautlisting.detaljert.forklaring" />
            </Ingress>
            {data.map((kategori: Kategori) => (
              <div key={kategori._id} className="skjemautlisting__storavstand">
                <Innholdstittel>
                  <LocaleTekst tekst={kategori.tittel} />
                  <span>{" – " + kategori.domene}</span>
                </Innholdstittel>
                <hr />
                {kategori.underkategorier.map(underkategori => (
                  <div key={localeTekst(underkategori.navn, intl.locale)}>
                    <Systemtittel>
                      <LocaleTekst tekst={underkategori.navn} />
                    </Systemtittel>
                    {underkategori.soknadsobjekter &&
                      underkategori.soknadsobjekter.map(soknadsobjekt => (
                        <VisSoknadsobjekt
                          key={soknadsobjekt._id}
                          kategori={kategori}
                          underkategori={underkategori}
                          soknadsobjekt={soknadsobjekt}
                          valgtSkjemanummer={valgtSkjemanummer}
                        />
                      ))}
                  </div>
                ))}
              </div>
            ))}
          </PanelBase>
        </div>
      </div>
    );
  }
}

export default injectIntl(SkjemautlistingDetaljert);

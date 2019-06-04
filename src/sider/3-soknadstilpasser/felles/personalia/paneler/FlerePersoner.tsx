import * as React from "react";
import { Field, FieldProps } from "formik";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import {
  ValgtEnhet,
  medPersonalia,
  Personalia
} from "../../../../../states/providers/Personalia";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import VisEnheter from "./felter/VisEnheter";
import { UndertekstBold } from "nav-frontend-typografi";

interface Routes {
  personEllerBedrift: string;
}

type MergedProps = Personalia & RouteComponentProps<Routes> & InjectedIntlProps;
const FlerePersonerPanel = (props: MergedProps) => {
  const { intl } = props;

  return (
    <Ekspanderbartpanel
      border
      tittelProps="normaltekst"
      tittel={intl.formatMessage({ id: "personalia.bedrift.flerepersoner" })}
    >
      <Field
        name="flerepersoner"
        label="Flere personer"
        render={(pr: FieldProps<ValgtEnhet>) => (
          <>
            <UndertekstBold>
              <FormattedMessage
                id={"personalia.undertekstbold.flerepersoner"}
              />
            </UndertekstBold>
            <VisEnheter
              label={intl.formatMessage({
                id: "personalia.label.velgnavkontor"
              })}
              placeholder={intl.formatMessage({
                id: "personalia.label.navkontor"
              })}
              {...pr}
            />
          </>
        )}
      />
    </Ekspanderbartpanel>
  );
};

export default injectIntl(withRouter(medPersonalia(FlerePersonerPanel)));

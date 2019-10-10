const { frontendlogger } = window as any;

export const loggEvent = (
  tittel: string,
  fields?: { [key: string]: any },
  tags?: { [key: string]: any }
) => frontendlogger && frontendlogger.event(tittel, fields || {}, tags || {});

export const loggError = (error: string, url?: string) =>
  frontendlogger && frontendlogger.error(error + " " + url);

export const loggApiError = (url: string, error: string, status?: number) => {
  const errorMessage = `Feil ved henting av data: ` +
    `${url} - ${error}`;

  const title = "soknadsveiviser.apiclient.error";
  const tags = {};
  const fields = {
    status: status || 404,
    statusText: error,
    url
  };

  loggError(errorMessage, url);
  loggEvent(title, fields, tags);
};

export const loggResponseAndApiError = (url: string, response: Response) => {
  loggApiError(url, `${response.status} ${response.statusText}`, response.status);
};

import { i18n, i18nExists } from '../i18n';

export default class Error403 extends Error {
  code: Number;

  constructor(language?, messageCode?) {
    let message;

    if (messageCode && i18nExists(language, messageCode)) {
      message = i18n(language, messageCode);
    }

    message =
      message || i18n(language, 'errors.forbidden.message');

    super(message);
    this.code = 403;
  }
}


const osuThemes = ["light", "dark", "darker"];
const fetch = require("node-fetch");
const querystring = require("querystring");
class AkimiClient {
  /**
   * @typedef {Object} IdioticClientOptions
   * @property {String} [url] Base URL for Idiotic API
   * @property {Boolean} [dev=false]
   * @memberof IdioticClient
   */

  /**
   * @param {string} token Idiotic API token
   * @param {IdioticClientOptions} [options] Client options
   */
  constructor(options = {}) {
    /**
     * Idiot's Guide API token
     * @type {String}
     * @private
     */
    Object.defineProperty(this, "token", { value: token });
    /**
     * Client options
     * @type {Object}
     */
    this.options = options;
    /**
     * Whether to use the dev endpoint
     * @type {Boolean}
     */
    this.dev = options.dev || false;
    /**
     * Base URL for Idiot's Guide API
     * @type {String}
     */
    this.baseUrl =
      options.url || this.dev
        ? "https://dev.anidiots.guide/"
        : "https://api.anidiots.guide/api/";
  }

  /* Text based endpoints */

  /**
   * Blame endpoint
   * @param {string} name text to except back
   * @returns {Promise<Buffer>}
   */
  osu(user, theme) {
    if (!osuThemes.includes(theme))
      throw new TypeError("Theme must be either light, dark or darker");
    return this._get("generators/osu", { user, theme }).then(body =>
      Buffer.from(body)
    );
  }
}
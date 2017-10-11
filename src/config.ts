
/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */


/**
 * This class represents the basic configuration of the seed.
 * It provides the following:
 * - Constants for directories, ports, versions etc.
 */
class Config {

    /**
     * The path for the base of the application at runtime.
     * The default path is based on the environment '/',
     * which can be overriden by the `--base` flag when running `npm start`.
     * @type {string}
     */
    APP_BASE =  '/';


    /**
     * The default title of the application as used in the `<title>` tag of the
     * `index.html`.
     * @type {string}
     */
    APP_TITLE = 'Angularcli-template';
};

export default new Config();
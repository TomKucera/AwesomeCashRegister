//import i18n from 'i18next'
//import Cache from 'i18next-localstorage-cache';

import LanguageDetector from 'i18next-browser-languagedetector'
//import intervalPlural from 'i18next-intervalplural-postprocessor'
import XHR from 'i18next-xhr-backend'
import moment from 'moment'
/*
declare var BUILD_NUMBER: string

const optionsPrev = {
    backend: {
        queryStringParams: {
            b: BUILD_NUMBER,
        },
    },
    fallbackLng: {
        sk: ['cs', 'en'],
        'sk-SK': ['cs', 'en'],
        default: ['en'],
    },
    //load: 'languageOnly',
    withRef: true,
    react: {
        wait: true,
    },
    detection: {
        order: ['navigator'],
    },
    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ',',
        format: function (value: any, format: any) {
            if (format === 'uppercase') return value.toUpperCase()
            if (value instanceof Date) return moment(value).format(format)
            return value
        },
    },
    ns: ['app'],
    defaultNS: 'app',
    debug: true //process.env.NODE_ENV !== 'production',
};

const options = {
    
};

i18n
    .use(XHR)
    .use(LanguageDetector)
    //.use(intervalPlural)
    .init(options);

export default i18n;
*/

import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
/*
i18n
  .use(<any>reactI18nextModule)
  .init({
  fallbackLng: "en",
  load: "languageOnly",
  ns: ["common"],
  defaultNS: "common",
  react: {
    wait: true,
    nsMode: "default"
  }
});
*/
export default i18n;
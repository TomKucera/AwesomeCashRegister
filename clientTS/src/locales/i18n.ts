//import i18n from 'i18next'
//import Cache from 'i18next-localstorage-cache';

import LanguageDetector from 'i18next-browser-languagedetector'
//import intervalPlural from 'i18next-intervalplural-postprocessor'
import XHR from 'i18next-xhr-backend'
import moment from 'moment'

import enTexts from "./en";
import csTexts from "./cs";

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

*/

import i18n, { InitOptions } from "i18next";
import { reactI18nextModule } from "react-i18next";

const options: InitOptions = {
    debug: true,
    lng: "cs",
    resources: {
        en: { translation: { ...enTexts } },
        cs: { translation: { ...csTexts } }
    },
    react: {
        wait: true,
    },
};

i18n
    .use(XHR)
    .use(LanguageDetector)
    //.use(intervalPlural)
    .init(options, function (err, t) {
        let textCustomers = i18n.t('customers');
        console.log("i18n options", options);
        console.log("i18n textCustomers", textCustomers);
    });

export default i18n;
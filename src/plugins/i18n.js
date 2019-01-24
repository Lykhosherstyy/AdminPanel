import VueI18n from 'vue-i18n'
import Vue from 'vue'
import en from '../translates/en.json'

Vue.use(VueI18n);

const messages = {
    en: {
        "hello": 'hello world'
    },
    ru: {
        "hello": 'hello world ru'
    },
    ua: {
        "hello": 'hello world ua'
    }
};
export const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en }
});
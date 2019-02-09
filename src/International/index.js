import Vue from 'vue'
import VueI18n from 'vue-i18n'
import storage from '../utils/storage'
import enLocale from './en'
import ruLocale from './ru'
import uaLocale from './ua'

Vue.use(VueI18n)

const messages = {
    en: {
        ...enLocale,
    },
    ru: {
        ...ruLocale,
    },
    ua: {
        ...uaLocale,
    }
}

const i18n = new VueI18n({
    locale: storage.get('language', 'en'),
    messages
})

export default i18n
export default {
    get(key, defaultValue) {
        try {
            return JSON.parse(localStorage.getItem(key))
        } catch (e) {
            return defaultValue
        }
    },
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },
}
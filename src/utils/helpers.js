import store from '../store'
import route from '../router'
export const isAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
        return
    }
    next('/login')
}

export const isNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next()
        return
    }
    next('/')
}

export const canAccess = (to, from, next) => {

    if (store.getters.isAuthenticated && to.meta.role.includes(store.getters.role)) {
        next()
        return
    }
    next('*')
}

export const getRoutes = () => {
    return route;
}

export function generateTitle(title) {
    const hasKey = this.$te(title)

    if (hasKey) {
        const translatedTitle = this.$t(title)

        return translatedTitle
    }
    return title
}
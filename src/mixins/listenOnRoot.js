
export default {
    methods: {
        listenOnRoot(event, callback) {
            this.$root.$on(event, callback)
        }
    }
}
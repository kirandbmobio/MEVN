
export default function install (Vue, options) {
    Vue.mixin({
        methods: {
            toastMessage(message, type, duration = 3000) {
                this.$buefy.toast.open({
                    message: message,
                    duration: duration,
                    type: type,
                    position: 'is-top-right'
                })
            }
        }
    })
}
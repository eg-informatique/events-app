export default defineNuxtLink(() => {
    function formatDate(event, field) {
        const dateString = event[field]
        const TrimmedDateString = dateString.replace(" GMT", "")
        const date = new Date(TrimmedDateString)
        const options = { weekday:'long', year:'numeric', month:'long', day:'numeric', hour:'numeric', minute:'numeric'}
        return date.toLocaleDateString('fr-FR', options)
    }
})

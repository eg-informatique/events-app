export default defineNuxtPlugin((nuxtApp) => {
  return{
    provide: {
      formatDate(event: Record<string, any>, field: string): string {
        const dateString = event[field];
        const trimmedDateString = dateString.replace(" GMT", "");
        const date = new Date(trimmedDateString);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('fr-FR', options);
      }
    }
  }
})
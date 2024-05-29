export default defineNuxtPlugin((nuxtApp) => {
  
  return{
    provide: {
      formatLongDate(event: Record<string, any>, field: string): string {
        const {locale} = useI18n()
        const dateString = event[field];
        const trimmedDateString = dateString.replace(" GMT", "");
        const date = new Date(trimmedDateString);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString(locale.value, options);
      },
      formatShortDate(event: Record<string, any>, field: string): string {
        const {locale} = useI18n()
        const dateString = event[field];
        const trimmedDateString = dateString.replace(" GMT", "");
        const date = new Date(trimmedDateString);
        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString(locale.value, options);
      }
    }
  }
})
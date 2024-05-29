export default defineEventHandler(async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch("https://events-api.org/events")
            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`)
            }
            const eventsData = await response.json();
            resolve(eventsData);
        } catch (error) {
            let errorMessage = "Failed to fetch events"
            if (error instanceof Error) {
                errorMessage += `: ${error.message}`
            }
            reject(new Error(errorMessage))
        }
    })
})
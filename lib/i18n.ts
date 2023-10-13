import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async ({ locale }) => {
    console.log("locale = "+locale,Math.random())
    return ({
        messages: (await import(`@/messages/${locale}.json`)).default,
        now: new Date()
    })
})
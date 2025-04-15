import { CorsOptions } from "cors"

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        const whiteList = [process.env.FRONTEND_URL]

        if (!origin || whiteList.includes(origin)) {
            return callback(null, true)
        } else {
            return callback(new Error('Not allowed by CORS'))
        }
    }
}
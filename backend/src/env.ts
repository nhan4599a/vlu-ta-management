import { cleanEnv, str, num } from "envalid";

const env = cleanEnv(process.env, {
    PORT: num({ default: 5000 }),
    CONNECTION_STRING: str(),
    PAGINATION_MAX_ITEMS: num({ default: 10 })
})

export { env }
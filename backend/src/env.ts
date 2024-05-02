import { cleanEnv, str, num } from "envalid";

const env = cleanEnv(process.env, {
    PORT: num({ default: 5000 }),
    CONNECTION_STRING: str()
})

export { env }
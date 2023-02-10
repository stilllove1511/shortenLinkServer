import { createClient } from "redis";

const redis = createClient({
    host: "localhost",
    port: "6397",
});

export default redis;

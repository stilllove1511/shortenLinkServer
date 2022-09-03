import logRouter from "./log"
import linkRouter from "./link"
import accountRouter from "./account"

export default (app) => {
    app.use(logRouter)
    app.use("/link", linkRouter)
    app.use("/account", accountRouter)
}

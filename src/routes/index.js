import logRouter from "./log"
import linkRouter from "./link"
import accountRouter from "./account"
import redirect from './redirect'

export default (app) => {
    app.use(logRouter)
    app.use("/redirect",redirect)
    app.use("/link", linkRouter)
    app.use("/account", accountRouter)
}

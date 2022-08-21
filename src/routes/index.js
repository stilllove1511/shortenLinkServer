import logRouter from "./log";
import linkRouter from "./link";
import shortenLinkRouter from "./shortenLink";

export default (app) => {
    app.use(shortenLinkRouter);
    app.use(logRouter);
    app.use("/link", linkRouter);
};

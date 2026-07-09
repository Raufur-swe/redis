import express from "express"
import urlRoutes from "./routes/url.route.js"
import dns from "dns"
// set dns server
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

app.use(express.json())

app.use("/" , urlRoutes)


export default app;
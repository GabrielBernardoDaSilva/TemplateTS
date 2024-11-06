import * as express from "express";
import { config } from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

config();

const app = express();
const port = 5010;

app.use(
  "/optimal-slotting",
  createProxyMiddleware({
    target: process.env.SERVICE_OPTIMAL_SLOTTING,
    changeOrigin: true,
    pathRewrite: {
      "^/optimal-slotting": "",
    },
  })
);

app.get("/health", (req, res) => {
  res.send("API Gateway is up and running");
});

app.use(`/`, express.static(`${__dirname}/assets/dist`));

app.get("/", (_, res) => {
    res.sendFile(`${__dirname}/assets/dist/index.html`);
});

app.listen(port, () => {
  console.log(`API Gateway listening at http://localhost:${port}`);
});

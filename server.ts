import dotenv from "dotenv";
dotenv.config();

import app from "./express";
import IndexRoute from "./routes/IndexRoute";
import AuthRoute from "./routes/AuthRoute";
import PaymentRoute from "./routes/PaymentRoute";
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3001;

app.use("/api", IndexRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/payment", PaymentRoute);

const server = app.listen(port);

server.on("listening", () => {
  const address = server.address();
  if (address && typeof address !== "string") {
    const rawHostname = address.address;
    const port = address.port;
    const hostname = rawHostname === "::" ? "localhost" : rawHostname;
    
    console.log(`[Server] Listening at http://${hostname}:${port}`);
  }
});

server.on("error", (err) => {
  console.error(`[Server] ${err.message}`);
});

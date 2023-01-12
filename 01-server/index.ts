import bodyParser from "body-parser";
import Server from "./src/classes/server";
import router from "./src/routes/router";
import cors from "cors";

const server = new Server();

// BodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// CORS
server.app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Service Routes
server.app.use("/", router);

server.start(() => {
  console.log(`Server running on PORT ${server.port}`);
});

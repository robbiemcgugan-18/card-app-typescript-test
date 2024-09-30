import { server } from "./server";

const port = Number(process.env.PORT) || 3001;

server
  .listen({ port, host: "0.0.0.0" }) // BUG FIX: Neded to be an FastifyOptions object
  .then(() => console.log("Server running on port " + (process.env.PORT || 3001)))
  .catch((error) => {
    console.log(error.message);
  });

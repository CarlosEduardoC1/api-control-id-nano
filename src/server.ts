import fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes/app";
import { UserRoutes } from "./routes/users";
import { TemplatesRoutes } from "./routes/templates";

const app = fastify({ logger: true, connectionTimeout: 25000 });

app.register(cors);
app.register(appRoutes);
app.register(UserRoutes);
app.register(TemplatesRoutes);

app
  .listen({
    port: 6379,
  })
  .then(() => {
    console.info("HTTP Server Running");
  });

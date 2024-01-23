import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listener";

console.clear();

const natsClient = nats.connect("tickethub", randomBytes(8).toString("hex"), {
  url: "http://localhost:4222",
});

natsClient.on("connect", () => {
  console.log("Listener connected to NATS..");

  natsClient.on("close", () => {
    console.log("NATS connection closed..");
    process.exit();
  });

  new TicketCreatedListener(natsClient).listen();
});

process.on("SIGINT", () => natsClient.close());
process.on("SIGTERM", () => natsClient.close());

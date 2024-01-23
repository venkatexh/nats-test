import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();

const natsClient = nats.connect("tickethub", "abc", {
  url: "https://localhost:4222",
});

natsClient.on("connect", async () => {
  console.log("Publisher connected to NATS..");

  const publisher = new TicketCreatedPublisher(natsClient);
  try {
    await publisher.publish({
      id: "123",
      title: "concert",
      price: 20,
    });
  } catch (err) {
    console.error(err);
  }

  // const data = JSON.stringify({
  //   id: "123",
  //   title: "test ticket",
  //   price: 20,
  // });

  // natsClient.publish("ticket:created", data, () => {
  //   console.log("event published");
  // });
});

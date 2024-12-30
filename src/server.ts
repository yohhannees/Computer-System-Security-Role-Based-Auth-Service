import { createServer } from "http";
import app from "./app";
const PORT = 4343;

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server is running on port http://localhost:${PORT}`);
});

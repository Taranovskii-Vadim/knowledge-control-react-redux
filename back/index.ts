import { config } from "dotenv";
import { connect } from "mongoose";

import app from "./app";

config();

const PORT = process.env.PORT || 3001;
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_LOGIN = process.env.DB_LOGIN || "";
const DB_NAME = process.env.DB_NAME || "";

const CONNECTION_URI = `mongodb+srv://${DB_LOGIN}:${DB_PASSWORD}@skillscluster.qm2j9.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

async function startServer() {
  try {
    connect(CONNECTION_URI);

    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
}

startServer();

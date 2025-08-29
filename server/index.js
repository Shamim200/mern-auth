import { app } from "./app.js";
import { connectDb } from "./src/config/db.js";
const port = process.env.PORT || 8001;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

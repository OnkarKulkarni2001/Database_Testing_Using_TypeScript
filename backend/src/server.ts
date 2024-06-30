import cors from "cors";
import express, { json } from "express";
import FlatfilePersistence from "./strategy/flatfile";

(async () => {
  const app = express();
  app.use(cors());
  app.use(json());

  const flatfilePersistence = new FlatfilePersistence();

  app.post("/flatfile/create/:tableId", (req, res) => {
    const { params } = req;

    if (!params || !params.tableId) {
      res.status(406);
      return res.json(
        res.json({
          error: "a body parameter was not indicated",
        })
      );
    }

    try {
      flatfilePersistence.create(params.tableId);
    } catch {
      res.status(500);
      return res.json({
        error: `an error occured while creating the ${params.tableId} table.`,
      });
    }

    return res.status(200);
  });

  app.post("/flatfile/insert", (req, res) => {
    console.log(req.body);
    if (!req.body.content || !req.body.location) {
      res.status(406);
      return res.json({
        error: `The content or location is missing.`,
      });
    }

    try {
      flatfilePersistence.insert(req.body.content, req.body.location);
    } catch {
      res.status(500);
      return res.json({
        error: `An error occured while inserting into ${req.body.location}.`,
      });
    }

    return res.status(200);
  });

  app.use("/", (_, res) => {
    res.json("hello world");
  });

  app.listen(8000, () => {
    console.log(`express server started on 8000`);
  });
})().catch((err) => console.log(err));

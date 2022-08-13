import express from "express";
import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();
const app = express();
const port = 8000;
app.use(express.json());

//Get All Data
app.get("/athlete", async (req, res) => {
  try {
    const resAthlete = await database.athlete.findMany();
    if (!resAthlete) throw new Error("Data not found");
    res.send(resAthlete);
  } catch (err) {
    res.send({ message: err.message });
  }
});

//Get Data By ID
app.get("/athlete/:id", async (req, res) => {
  try {
    const resAthlete = await database.athlete.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!resAthlete) throw new Error("Data not found");
    res.send(resAthlete);
  } catch (err) {
    res.send({ message: err.message });
  }
});

//Create Data
app.post("/athlete/create", async (req, res) => {
  try {
    const resAthlete = await database.athlete.create({
      data: {
        name: req.body.name,
        age: req.body.age,
        geup: req.body.geup,
      },
    });
    if (!resAthlete) throw new Error("Failed to add data");
    res.send({ message: "Successfully added data", data: athlete });
  } catch (err) {
    res.send({ message: err.message });
  }
});

//Delet Data
app.delete("/athlete/delete", async (req, res) => {
  try {
    const resAthlete = await database.athlete.delete({
      where: {
        id: req.body.id,
      },
    });
    if (!resAthlete) throw new Error("Failed to delete data");
    res.send({ message: "Successfully delete data" });
  } catch (err) {
    res.send({ message: err.message });
  }
});

//Update Data
app.put("/athlete/update", async (req, res) => {
  try {
    const resAthlete = await database.athlete.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        name: req.body.name,
        age: req.body.age,
        geup: req.body.geup,
      },
    });
    if (!resAthlete) throw new Error("Failed to update data");
    res.send({ message: "Successfully update data", data: athlete });
  } catch (err) {
    res.send({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`App running on port  ${port}`);
});

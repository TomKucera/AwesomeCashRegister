import express from "express";
import vodafoneRepository from "../dbVDF/data";

const router = express.Router();

// GET home page.
router.get("/", (req, res) => {
  res.render("API is working properly");
});

router.get("/vodafone/location/:address", (req, res) => {
  const address = req.params.address;
  vodafoneRepository.getByAddress(address).then((locations) => {
      res.status(201).send(locations);
    });
});

router.get("/vodafone/location", (req, res) => {
  console.log("location get [req]: ", req);
  vodafoneRepository.getByAddress(req.body.address).then((locations) => {
      res.status(201).send(locations);
    });
});

router.post("/vodafone/location", (req, res) => {
  vodafoneRepository.getByAddress(req.body.address).then((locations) => {
    console.table(locations.map(l => { return {ID: l.id, Address: l.address} }));
    res.status(201).send(locations);
  });
});

export default router;

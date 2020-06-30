
import express from "express";
//import { License } from "./../data/model/types";
import LicenseService from "./../modules/license/services/license-service";

const router = express.Router();

const licenseService: LicenseService = new LicenseService();

router.post("/:idCustomer/", (req, res) => {
  // res.render("respond with a resource");
  const idCustomer = parseInt(req.params.idCustomer, 10);
  const idUser = (req as any).userId as number;

  licenseService.create(idUser, { ...req.body, idCustomer }).then(result => {
    res.status(201).send(result);
  });
});

///orders/{id}/lines/{id}

router.post("/:id/user", (req, res) => {
  const idUser = (req as any).userId as number;
  const id = parseInt(req.params.id, 10);

  console.log("route.post.user idUser, id, body", idUser, id, req.body);

  licenseService.addUser(idUser, id, req.body).then(result => {
    res.status(201).send(result);
  });
});

router.delete("/:id/user/:email", (req, res) => {
  const idUser = (req as any).userId as number;
  const id = parseInt(req.params.id, 10);
  const email = req.params.email;

  console.log("route.delete.user idUser, id, email", idUser, id, email);

  licenseService.removeUser(idUser, id, email).then(result => {
    res.status(201).send(result);
  });
});

router.put("/:id", (req, res) => {
  const idUser = (req as any).userId as number;
  const id = parseInt(req.params.id, 10);

  console.log("route.put idUser, id", idUser, id);

  licenseService.update(idUser, { ...req.body, id }).then(result => {
    res.status(201).send(result);
  });
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idUser = (req as any).userId as number;

  licenseService.get(idUser, id).then(result => {
    res.status(201).send(result);
  });
});

router.get("/", (req, res) => {
  const idUser = (req as any).userId as number;

  licenseService.getAll(idUser).then(result => {
    res.status(201).send(result);
  });
});

export default router;

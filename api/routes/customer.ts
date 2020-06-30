
import express from "express";

import { Customer } from "./../data/model/types";
import customerRepository from "./../data/repository/CustomerRepository";
import licenseRepository from "./../data/repository/LicenseRepository";

import { send } from "./../common/post";

// tslint:disable: object-literal-sort-keys

const router = express.Router();

router.post("/", (req, res) => {
  console.log("customer post [req]: ", req);
  customerRepository.Create(req.body).then((customerData) => {
    console.log("customer post [customerData]: ", customerData);
    res.status(201).send(customerData);
  });
});

router.put("/:id", (req, res) => {
  console.log("customer put [req]: ", req);
  const id = parseInt(req.params.id, 10);
  const data = { ...req.body, id };
  console.log("customer put [req.body]: ", req.body);
  customerRepository.Update(data).then((customerData) => {
    res.status(201).send(customerData);
    send("Customer PUT", JSON.stringify(customerData) );
  });
});

router.get("/:id", (req, res) => {
  console.log("customer getById [req.params]: ", req.params);
  const id = parseInt(req.params.id, 10);
  customerRepository.GetById(id).then((customerData: Customer) => {
    console.log("customer put [customerData]: ", customerData);
    res.status(200).send(customerData);
  });
});

router.delete("/:id", (req, res) => {
  console.log("customer deleteById [req.params]: ", req.params);
  const id = parseInt(req.params.id, 10);
  customerRepository.Delete(id).then(() => {
    res.status(200).send(`Customer [id: ${id}] deleted`);
  });
});

router.get("/", (req, res) => {
  console.log("customer getList [req.params]: ", req.params);
  customerRepository.GetList().then((customers) => {
    res.status(201).send(customers);
  });
});

// TODO test
router.get("/:id/licenses", (req, res) => {
  console.log("customer getLicensesByCustId [req.params]: ", req.params);
  const id = parseInt(req.params.id, 10);
  licenseRepository.GetByCustomerId(id).then((licenses) => {
    res.status(200).send(licenses);
  });
});

export default router;

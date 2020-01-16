
import express from "express";
import customer from "./../data/model/customer";
import customerRepository from "./../data/repository/CustomerRepository";

// import license from "./../data/model/license";
import licenseRepository from "./../data/repository/LicenseRepository";

import { send } from "./../common/post";

// tslint:disable: object-literal-sort-keys

const router = express.Router();

router.post("/", (req, res) => {
  // res.render("respond with a resource");
  console.log("customer post [req]: ", req);

  //status(201)
  customerRepository.Create(req.body).then((customerData) => {
    console.log("customer post [customerData]: ", customerData);
    res.sendStatus(201).send(customerData);
    
  });
});

router.put("/:id", (req, res) => {
  // res.render("respond with a resource");
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
  customerRepository.GetById(id).then((customerData: customer) => {
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

router.get("/", (req, res, next) => {
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

// /1/documents

/*
// GET home page.
router.get("/", (req, res, next) => {
  // res.render("respond with a resource");
  customerRepository.GetById(req.body.id).then((customerData) => {
    res.status(201).send(customerData);
  });

});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const customerData: customer = new customer();
  customerData.id = id;
  customerData.email = id.toString();
  return res.status(200).send({
    success: "true",
    message: "todo retrieved successfully",
    customerData,
  });
});
*/
//// tslint:disable-next-line: no-shadowed-variable

  /*
  else if (!req.body.description) {
    return res.status(400).send({
      success: "false",
      message: "description is required"
    });
  }
  */

  
  
  /*
    return res.status(201).send({
     success: "true",
     message: "customer added successfully",
     customerEmail,
   });
   */

//});

export default router;

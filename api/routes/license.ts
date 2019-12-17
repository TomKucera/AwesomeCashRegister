
import express from "express";
import license from "./../data/model/license";
import licenseRepository from "./../data/repository/LicenseRepository";
// tslint:disable: object-literal-sort-keys

const router = express.Router();

router.post("/:idCustomer/", (req, res) => {
  // res.render("respond with a resource");
  const idCustomer = parseInt(req.params.idCustomer, 10);
  console.log("license post [req, idCustomer]: ", req, idCustomer);
  licenseRepository.Create({ ...req.body, idCustomer }).then((licenseData) => {
    res.status(201).send(licenseData);
  });
});

router.get("/:id", (req, res) => {
  console.log("license getById [req.params]: ", req.params);
  const id = parseInt(req.params.id, 10);
  licenseRepository.GetById(id).then((licenseData: license) => {
    res.status(200).send(licenseData);
  });
});

router.get("/", (req, res, next) => {
  console.log("license getList [req.params]: ", req.params);
  licenseRepository.GetList().then((licenses) => {
    res.status(201).send(licenses);
  });
});

/*
// GET home page.
router.get("/", (req, res, next) => {
  // res.render("respond with a resource");
  licenseRepository.GetById(req.body.id).then((licenseData) => {
    res.status(201).send(licenseData);
  });

});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const licenseData: license = new license();
  licenseData.id = id;
  licenseData.email = id.toString();
  return res.status(200).send({
    success: "true",
    message: "todo retrieved successfully",
    licenseData,
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
     message: "license added successfully",
     licenseEmail,
   });
   */

//});

export default router;

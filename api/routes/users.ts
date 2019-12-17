
import express from "express";
import user from "./../data/model/user";
import userRepository from "./../data/repository/UserRepository";
// tslint:disable: object-literal-sort-keys

const router = express.Router();

// GET home page.
router.get("/", (req, res, next) => {
  // res.render("respond with a resource");
  userRepository.GetById(req.body.id).then((userData) => {
    res.status(201).send(userData);
  });

});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const userData: user = new user();
  userData.id = id;
  userData.email = id.toString();
  return res.status(200).send({
    success: "true",
    message: "todo retrieved successfully",
    userData,
  });
});

//// tslint:disable-next-line: no-shadowed-variable
router.post("/", (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({
      success: "false",
      message: "email is required",
    });
  }
  /*
  else if (!req.body.description) {
    return res.status(400).send({
      success: "false",
      message: "description is required"
    });
  }
  */

  const userEmail = req.body.email;
  const userData: user = { id: 0, email: userEmail, created: new Date(), updated: new Date() };

  userRepository.Create(userData).then(() => {
    res.status(201).send({
      success: "true",
      message: "user added successfully",
      userEmail,
    });
  });
  /*
    return res.status(201).send({
     success: "true",
     message: "user added successfully",
     userEmail,
   });
   */

});

export default router;
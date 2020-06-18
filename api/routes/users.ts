import express from "express";
import { User } from "./../data/model/types";
import userRepository from "./../data/repository/UserRepository";

import GoogleAuthService from './../modules/auth/services/google-auth-service';
import AuthService from './../modules/auth/services/auth-service';

const router = express.Router();

// GET home page.
router.get("/", (req, res) => {
  // res.render("respond with a resource");
  userRepository.GetById(req.body.id).then((userData) => {
    res.status(201).send(userData);
  });

});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const userData: User = new User();
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
  const userData: User = { id: 0, email: userEmail, firstName: '', lastName: '', created: new Date(), updated: new Date() };

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

router.post("/google/login", (req, res) => {
  console.log("/google/login [authorizationCode]", req.body.authorizationCode);

  const authorizationCode = req.body.authorizationCode;

  if (!authorizationCode) {
    res.status(400).send({ code: 'bbb', message: 'No authorization code provided' });
    return;
  }

  const authService = new AuthService(new GoogleAuthService());

  authService.loginUser(authorizationCode)
    .then((user: User | undefined) => {
      if (user) {
        res.status(201).send(user);
      }
      else {
        res.status(404).send({ code: 'aaa', message: 'User not found' });
      }
    })
    .catch((reason: unknown) => {
      res.status(500).send({ error: reason });
    });
});

export default router;


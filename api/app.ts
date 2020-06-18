import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import createError from "http-errors";
import logger from "morgan";
import path from "path";
import bodyParser from 'body-parser';

import indexRouter from "./routes/index";
import testAPIRouter from "./routes/testAPI";
import usersRouter from "./routes/users";
import customerRouter from "./routes/customer";
import licenseRouter from "./routes/license";

import db from "./db/db";

import GoogleAuthService from './modules/auth/services/google-auth-service';
import AuthService from './modules/auth/services/auth-service';

const authService = new AuthService(new GoogleAuthService());

db.init.then();

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use("/", authService.authenticateJWT);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/customer", customerRouter);
app.use("/license", licenseRouter);
app.use("/testAPI", testAPIRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
/*
app.use(
    (err: { status: any; },
     req: { app: { get: (arg0: string) => string; }; },
     res: { locals: { error: any; }; status: (arg0: any) => void; render: (arg0: string) => void; },
     next: any) => {
  // set locals, only providing error in development
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
*/
const PORT = 9000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = app;

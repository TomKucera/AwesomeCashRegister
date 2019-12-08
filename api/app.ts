import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import createError from "http-errors";
import logger from "morgan";
import path from "path";

import indexRouter from "./routes/index";
import testAPIRouter from "./routes/testAPI";
import usersRouter from "./routes/users";

import db from "./db/db";

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

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/testAPI", testAPIRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
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

module.exports = app;

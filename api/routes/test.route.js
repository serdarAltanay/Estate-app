import express from "express";
import { shouldBeAdmin, shouldBeLoggedIn } from "../controllers/test-controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const test = express.Router();

test.post("/should-be-logged-in", verifyToken, shouldBeLoggedIn);
test.post("/should-be-admin", shouldBeAdmin);

export default test;
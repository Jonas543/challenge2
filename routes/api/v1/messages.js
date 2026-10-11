import express from "express";
import { list, get, create } from "../../../controllers/api/v1/messages.js";

const router = express.Router();

router.get("/", list);
router.get("/:id", get);
router.post("/", create);

export default router;
import { Router } from "express";

export const router = Router();

router.get("/", () => {
  console.log("working");
});

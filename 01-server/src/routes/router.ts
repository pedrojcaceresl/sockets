import { Router, Request, Response } from "express";
import Server from "../classes/server";

const router = Router();
const server = Server.instance;

router.get("/mensajes", (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: "Everything is Okay!",
  });
});

router.post("/mensajes", (req: Request, res: Response) => {
  const body = req.body.body;
  const from = req.body.from;
  const payload = {
    from,
    body,
  };
  server.io.emit("new-message", payload);

  res.json({
    ok: true,
    body,
    from,
  });
});

router.post("/mensajes/:id", (req: Request, res: Response) => {
  const body = req.body.body;
  const from = req.body.from;
  const id = req.params.id;

  const payload = {
    from,
    body,
  };

  server.io.in(id).emit("mensaje-privado", payload);

  res.json({
    ok: true,
    body,
    from,
    id,
  });
});

export default router;

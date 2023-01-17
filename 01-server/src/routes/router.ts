import { connectedUsers } from "./../sockets/socket";
import { Socket } from "socket.io/dist/socket";
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

// Service to get all user Ids

router.get("/usuarios", (req: Request, res: Response) => {
  let clients: any[] = [];
  server.io
    .fetchSockets()
    .then((sockets) => {
      sockets.map((client) => {
        clients.push(client.id);
      });
    })
    .catch((err) => {
      console.log(err);
      if (err) {
        return res.json({
          ok: false,
        });
      }
    })
    .finally(() => {
      return res.json({
        ok: true,
        clients,
      });
    });
});

// Get users and their names

router.get("/usuarios/detalle", (req: Request, res: Response) => {
  res.json({
    ok: true,
    clients: connectedUsers.getLista(),
  });
});

export default router;

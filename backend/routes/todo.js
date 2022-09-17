const express = require("express");
const router = express.Router();
const prisma = require("../db");
const securityMiddleware = require("../middleware/securityMiddleware");

//create todo
router.post("/", async (req, res) => {
  const { todo } = req.body;
  const find = await prisma.todolist.findFirst({
    where: {
      todo: {
        contains: todo,
      },
    },
  });
  if (find.todo === todo) {
    return res.status(500).json({ error: "Record already exist" });
  } else {
      await prisma.todolist.create({
        data: {
          todo,
        },
      });
      return res.json({ todo });
  }
});

//update todo
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { todo, completed } = req.body;
  await prisma.todolist.update({
    where: {
      id: Number(id),
    },
    data: {
      todo,
      completed,
    },
  });
  res.json({
    message: "Todo Updated",
  });
});

//get all todo
router.get("/", async (req, res) => {
  const allTodo = await prisma.todolist.findMany();
  return res.json({ allTodo });
});

router.get("/all", securityMiddleware, async (req, res) => {
  console.log("all todos");
});

//get todo byId
router.get("/:id", async (req, res) => {
 try {
    const { id } = req.params;
    const todo = await prisma.todolist.findMany({
      where: {
        id: Number(id),
      },
    });
    res.json({ todo });
 } catch (error) {
   res.json(error.message)
 }
});

//delete todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.todolist.delete({
    where: {
      id: Number(id),
    },
  });
  res.json({
    message: "product deleted",
  });
});

//complete todo
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { todo, completed } = req.body;
  await prisma.todolist.update({
    where: {
      id: Number(id),
    },
    data: {
      todo,
      completed,
    },
  });
  res.json({
    message: "Todo Updated",
  });
});


module.exports = router;

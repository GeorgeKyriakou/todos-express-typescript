import { TodosDao } from "@daos";
import { Request, Response, Router } from "express";
import { BAD_REQUEST, CREATED, OK } from "http-status-codes";
import { paramMissingError } from "@shared";

const router = Router();
const todosDao = new TodosDao();

/******************************************************************************
 *                      Get All Users - "GET /api/todos/all"
 ******************************************************************************/

router.get("/all", async (req: Request, res: Response) => {
  try {
    const todos = await todosDao.getAll();
    return res.status(OK).json(todos);
  } catch (err) {
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *                       Add One - "POST /api/todos/add"
 ******************************************************************************/

router.post("/add", async (req: Request, res: Response) => {
  try {
    const { todo } = req.body;
    if (!todo) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError
      });
    }
    await todosDao.add(todo);
    return res
      .status(CREATED)
      .json(todo)
      .end();
  } catch (err) {
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *                       Update - "PUT /api/todos/update"
 ******************************************************************************/

router.put("/update", async (req: Request, res: Response) => {
  try {
    const { todo } = req.body;
    if (todo === undefined) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError
      });
    }
    todo.id = Number(todo.id);
    await todosDao.update(todo);
    return res
      .status(OK)
      .json(todo)
      .end();
  } catch (err) {
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *                    Delete - "DELETE /api/todos/delete/:id"
 ******************************************************************************/

router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    await todosDao.delete(Number(req.params.id));
    return res.status(OK).end();
  } catch (err) {
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;

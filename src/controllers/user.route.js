const express = require("express")
const pool = require("../config/db")
const userRoute = express.Router()

userRoute.get("/get-all-users", async(req, res)=>{
    try {
        const result = await pool.query("SELECT * FROM users")

        console.log(result)
        res.json({
            message:"list of all users",
            status:200,
            data: result.rows
        })
    } catch (error) {
        res.json({
            message:"internal server error",
            status: 500,
            error: error.message
        })
    }
})
userRoute.get("/get-user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found", status: 404 });
    }
    res.json({
      message: "User found",
      status: 200,
      data: result.rows[0],
    });
  } catch (error) {
    res.json({
      message: "Internal server error",
      status: 500,
      error: error.message,
    });
  }
});

userRoute.post("/create-user", async (req, res) => {
  const { name, age, id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (id, name, age) VALUES ($1, $2, $3) RETURNING *",
      [id, name, age]
    );
    res.status(201).json({
      message: "User created",
      status: 201,
      data: result.rows[0],
    });
  } catch (error) {
    res.json({
      message: "Internal server error",
      status: 500,
      error: error.message,
    });
  }
});

userRoute.put("/update-user/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, age = $2 WHERE id = $3 RETURNING *",
      [name, age, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found", status: 404 });
    }
    res.json({
      message: "User updated",
      status: 200,
      data: result.rows[0],
    });
  } catch (error) {
    res.json({
      message: "Internal server error",
      status: 500,
      error: error.message,
    });
  }
});


userRoute.delete("/delete-user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found", status: 404 });
    }
    res.json({
      message: "User deleted",
      status: 200,
      data: result.rows[0],
    });
  } catch (error) {
    res.json({
      message: "Internal server error",
      status: 500,
      error: error.message,
    });
  }
});

module.exports = userRoute
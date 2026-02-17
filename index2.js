const express = require("express");
const cors = required('cors')
const app = express();
app.use(express.json());
app.use(cors());

const users = [
  {
    att: '80', 
    id: 108243, 
    total_sub: 14,
    bonus:'20',
    name: "Dax"
  },
  {
    att: '90', 
    id: 108244, 
    total_sub: 14,
    bonus:'20',
    name: "Jeel"
  },
    {
    att: '95', 
    id: 108245, 
    total_sub: 14,
    bonus:'20',
    name: "Manav Patel"
  },

      {
    att: '100', 
    id: 108246, 
    total_sub: 14,
    bonus:'20',
    name: "Jivan Patel"
  },

];


app.get("/users", (req, res) => {
  res.status(200).json(users);
});


app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});



app.post("/users", (req, res) => {
  const newUser = {
    att: req.body.att,
    id: req.body.id,
    total_sub: req.body.total_sub,
    bonus: req.body.bonus,
    name: req.body.name
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created",
    user: newUser
  });
});


app.put("/users/:id", (req, res) => {

  const userId = Number(req.params.id);
  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    att: req.body.att,
    id: req.body.id,
    total_sub: req.body.total_sub,
    bonus: req.body.bonus,
    name: req.body.name
  };

  res.status(200).json({
    message: "User replaced",
    user: users[index]
  });
});


app.delete("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(204).end();
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});
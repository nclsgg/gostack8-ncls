const express = require("express");
const server = express();

let numberOfRequests = 0;
const projects = [];

server.use(express.json());

server.get("/projects", (req, res) => {
  res.json(projects);
});

function checkIfIdExistis(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);
  if (!project) {
    return res.status(400).json({ error: "Task ID does not exists" });
  }

  return next();
}

function logRequests(req, res, next) {
  numberOfRequests++;
  console.log(`Requisições ${numberOfRequests}`);

  next();
}

server.post("/projects", logRequests, (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

server.put("/projects/:id", logRequests, checkIfIdExistis, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", logRequests, checkIfIdExistis, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});

server.post(
  "/projects/:id/tasks",
  logRequests,
  checkIfIdExistis,
  (req, res) => {
    const { id } = req.params;
    const { tasks } = req.body;

    const project = projects.find(p => p.id == id);

    project.tasks = tasks;

    return res.json(project);
  }
);

server.listen(3000);

const router = require("express").Router();
const User = require("../model/User");
const Project = require("../model/Project");
//getting a profile of user
router.get("/:id", async (req, res) => {
  try {
    const user = User.findById(req.params.id);
    const [password, ...all] = user;
    res.status(200).send(all);
  } catch (err) {
    res.status(400).send("enternal error");
  }
});
//getting all project
router.get("/:id/allproject", async (req, res) => {
  try {
    const user = User.findById(req.params.id);
    const project = await Promise.all(
      user.task.map((t) => {
        return Project.findById(t);
      })
    );
    let projectList = [];
    project.forEach((t) => {
      const { _id, name, percentage, ...all } = t;
      projectList.push({ _id, name, percentage });
    });
    res.status(200).send(projectList);
  } catch {
    res.status(400);
  }
});
//geting all created task
router.get("/:id/alltask", async (req, res) => {
  try {
    const user = User.findById(req.params.id);
    if (user.isAdmin) {
      const project = Promise.all(
        user.createTask.map((c) => {
          return Project.findById(c);
        })
      );

      res.status(200).send(project);
    } else {
      res.status(400).send("not allowed");
    }
  } catch {
    res.send(404).send("internal error");
  }
});

//creating a project
router.get("/:id/addproject", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.isAdmin) {
      const name = req.body.name;
      const project = await new Project({
        name: name,
      });
      await project.save();
      user.updateOne({ $push: { createTask: project._id } });
      res.status(200).send(project);
    } else {
      res.status(400).send("you cannot create a project");
    }
  } catch {
    res.send(404);
  }
});

module.exports = router;

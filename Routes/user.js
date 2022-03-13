const router = require("express").Router();
const User = require("../model/User");
const Project = require("../model/Project");
//getting a profile of user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { email, task, createTask, ...all } = user;
    res.status(200).send({ email, task, createTask });
  } catch (err) {
    res.status(400).send("enternal error");
  }
});
//getting all project
router.get("/:id/allproject", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.admin === false) {
      const project = await Promise.all(
        user.task.map(async (t) => {
          const data = await Project.findById(t);
          console.log(data);
        })
      );
      let projectList = [];
      project.forEach((t) => {
        const { _id, name, percantage, ...all } = t;
        projectList.push({ _id, name, percentage });
      });
      res.status(200).send(projectList);
    } else {
      console.log("here");
      const project = await Promise.all(
        user.createTask.map(async (c) => {
          return await Project.findById(c);
        })
      );
      console.log(project);
      res.status(200).send(project);
    }
  } catch {
    res.status(400);
  }
});

//creating a project
router.post("/:id/addproject", async (req, res) => {
  console.log(req.params.id);
  try {
    const user = await User.findById(req.params.id);

    const { isAdmin, ...all } = user;
    if (isAdmin) {
      const name = req.body.name;
      console.log(name);
      const project = await new Project({
        name: name,
        createdBy: req.params.id,
      });
      console.log(name);
      const newproject = await project.save();
      console.log("project saved");
      await user.updateOne({ $push: { createTask: project._id } });
      res.status(200).send(project);
    } else {
      res.status(400).send("you cannot create a project");
    }
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;

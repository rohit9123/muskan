const router = require("express").Router();
const Project = require("../model/Project");
const User = require("../model/User");
const Concern = require("../model/concern");
const { all } = require("./user");

//all project of a user
router.get("/:id/alluser", (req, res) => {
  try {
    const project = Project.findById(req.params.id);
    const alluser = Promise.all(
      project.user.map((u) => {
        return User.findById(u);
      })
    );
    const user = [];
    alluser.forEach((u) => {
      const [name, email, profilePicture, ...all] = u;
      user.push({ name, email, profilePicture });
    });
    res.status(400).send(alluser);
  } catch {
    res.status(400);
  }
});

//adding a intern on a project
router.post("/:id/:project/addintern", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findById(req.params.id);

    if (user.isAdmin) {
      const intern = await User.findOne({ email: email });
      const project = await Project.findById(req.params.project);

      if (project.createdBy == user._id && !project.user.includes(intern._id)) {
        await project.updateOne({ $push: { user: intern._id } });
        await intern.updateOne({ $push: { task: project._id } });
        await project.save();
        await intern.save();
        res.status(200).json("user added to project");
      } else {
        res.status(403).json("user is already added");
      }
    } else {
      res.status(404).send("not allowed");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

//deleting a project
router.delete("/:id/:project", async (req, res) => {
  try {
    const { id, project } = req.params;
    const user = User.findById(id);
    if (user.createTask.includes(project)) {
      user.updateOne({ $pull: { createTask: project } });
      res.status(200).send("project deleted");
    } else {
      res.status(400).send("not allowed");
    }
  } catch {
    res.status(404);
  }
});
//updating a project
router.put("/:id/:project", async (req, res) => {
  try {
    const { id, project } = req.params;
    const user = await User.findById(id);
    if (user.task.includes(project) || user.createTask.includes(project)) {
      const pro = await Project.findById(project);
      project.percentage = req.body.percentage;
      await project.save();
      res.send(200).send(project);
    } else {
      res.send(404).send("not allowed");
    }
  } catch {}
});

//geting all  concern on  a project
router.get("/:id/:project/concern", async (req, res) => {
  try {
    const { id, project } = req.params;
    const user = User.findById(user);
    if (user.task.includes(project) || user.createTask.includes(project)) {
      let pro = Project.findById(project);
      const allconcern = Promise.all(
        pro.concern.map((c) => {
          return Concern.findById(c);
        })
      );
      let com = [];
      allconcern.map((c) => {
        const { comment } = c;
        com.push(concern);
      });
      res.send(200).send(concern);
    } else {
      res.send(400).send("not allowed");
    }
  } catch {
    res.send(400).send("server error");
  }
});
//posting a concern in project
router.post("/:id/:projet/concern", async (req, res) => {
  try {
    const { id, project } = req.params;
    const user = await User.findById(id);
    if (user.task.includes(project) || user.createTask.includes(project)) {
      let pro = await Project.findById(project);
      const newconcern = await new Concern({
        Comment: req.body.comment,
      });
      await newconcern.save();
      await pro.updateOne({ $push: { concern: newconcern._id } });
      res.status(200).send("concern added");
    } else {
      res.status(400).send("not allowed");
    }
  } catch {
    res.send(404).send("internal problem");
  }
});

module.exports = router;

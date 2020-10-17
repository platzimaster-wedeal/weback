const express = require("express");

const response = require("../../../network/response");
const controller = require("./index");
const secure = require("./secure");

const router = express.Router();

router.get("/", secure("list"), list);
router.get("/:id", secure("get"), get);
router.get("/:id/getPostulated", getPostulatedEmployee);
router.post("/", secure("insert"), insert);
router.put("/:id", update);
router.delete("/:id", secure("remove"), remove);

function list(req, res, next) {
  controller
    .list()
    .then((list) => {
      response.success(req, res, list, 200);
    })
    .catch(next);
}

function get(req, res, next) {
  console.log(req.params.id);
  controller
    .get(req.params.id)
    .then((result) => {
      response.success(req, res, result, 200);
    })
    .catch(next);
}
function getPostulatedEmployee(req, res, next) {
  console.log(req.params.id);
  controller
    .getPostulatedEmployee(req.params.id)
    .then((result) => {
      response.success(req, res, result, 200);
    })
    .catch(next);
}

function insert(req, res, next) {
  controller
    .insert(req.body, req.files)
    .then((result) => {
      response.success(req, res, result, 200);
    })
    .catch(next);
}

function update(req, res, next) {
  controller
    .update(req.params.id, req.body, req.files)
    .then((result) => {
      response.success(req, res, result, 201);
    })
    .catch(next);
}

function remove(req, res, next) {
  controller
    .remove(req.params.id)
    .then((result) => {
      response.success(req, res, result, 200);
    })
    .catch(next);
}

module.exports = router;

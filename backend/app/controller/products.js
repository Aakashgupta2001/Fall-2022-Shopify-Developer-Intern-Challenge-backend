const productModel = require("../models/products");
const service = require("../service/service");
const { responseHandler } = require("../middlewares/response-handler");
const errorHandler = require("../middlewares/errorHandler");
const helper = require("../middlewares/helper");

exports.createProduct = async (req, res, next) => {
  try {
    const body = req.body;
    if (!body.name || !body.price || !body.quantity) {
      throw new errorHandler.BadRequest("error bad request");
    }
    let code = await helper.codeGenerator("PRD", productModel);
    body.code = code;
    const product = await service.create(productModel, body);

    return responseHandler(product, res);
  } catch (err) {
    next(err);
  }
};

exports.listProduct = async (req, res, next) => {
  try {
    const filter = { active: true };
    const product = await service.find(productModel, filter);
    return responseHandler(product, res);
  } catch (err) {
    next(err);
  }
};

exports.edit = async (req, res, next) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const updateBody = {};
    if (body.name) {
      updateBody.name = body.name;
    }
    if (body.quantity) {
      updateBody.quantity = body.quantity;
    }
    if (body.price) {
      updateBody.price = body.price;
    }
    if (body.description) {
      updateBody.description = body.description;
    }
    const product = await service.update(productModel, { _id: id }, body);
    return responseHandler(product, res);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateBody = { active: false };
    if (req.body.deleteMessage) {
      updateBody["deleteMessage"] = req.body.deleteMessage;
    }
    const product = await service.update(productModel, { _id: id }, updateBody);
    return responseHandler(product, res);
  } catch (err) {
    next(err);
  }
};

exports.listDeleted = async (req, res, next) => {
  try {
    const filter = { active: false };
    const product = await service.find(productModel, filter);
    return responseHandler(product, res);
  } catch (err) {
    next(err);
  }
};

exports.restoreProducts = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateBody = { active: true, deleteMessage: "" };
    const product = await service.update(productModel, { _id: id }, updateBody);
    return responseHandler(product, res);
  } catch (err) {
    next(err);
  }
};

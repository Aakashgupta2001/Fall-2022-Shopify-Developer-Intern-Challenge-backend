const router = require("express").Router();
const productController = require("../controller/products");
const auth = require("../middlewares/auth");

router.route("").post(auth.verifyToken, productController.createProduct);
router.route("").get(auth.verifyToken, productController.listProduct);
router.route("/:id").put(auth.verifyToken, productController.edit);
router.route("/:id").delete(auth.verifyToken, productController.delete);
router.route("/bin").get(auth.verifyToken, productController.listDeleted);
router.route("/bin/:id").put(auth.verifyToken, productController.restore);

module.exports = router;

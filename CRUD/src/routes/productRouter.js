const router = require("express").Router();
const productController = require("../controllers/productController");

const multer= require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/public/uploads/product/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })

router.get("/",productController)

router.get("/:id",productController)

router.get("/create",productController)

router.get("/edit/:id",productController)

router.post("/",upload.single("product"),productController)

router.put("/edit/:id",upload.single("product"),productController)

router.delete("/:id",productController)

module.exports = router;
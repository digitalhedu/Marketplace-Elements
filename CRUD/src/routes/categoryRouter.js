const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const multer= require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/public/uploads/category/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })

router.get("/",categoryController.index)

router.get("/:id",categoryController.show)

router.get("/create",categoryController.create)

router.get("/edit/:id",categoryController.edit)

router.post("/",upload.single("icon"),categoryController.save)

router.put("/edit/:id",upload.single("icon"),categoryController.upload)

router.delete("/:id",categoryController.destroy)


module.exports = router;
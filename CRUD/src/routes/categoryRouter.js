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

router.get("/",categoryController)

router.get("/:id",categoryController)

router.get("/create",categoryController)

router.get("/edit/:id",categoryController)

router.post("/",upload.single("icon"),categoryController)

router.put("/edit/:id",upload.single("icon"),categoryController)

router.delete("/:id",categoryController)


module.exports = router;
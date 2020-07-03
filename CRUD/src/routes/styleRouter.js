const router = require("express").Router();
const styleController = require("../controllers/styleController");

const multer= require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/public/uploads/style/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })

router.get("/",styleController)

router.get("/:id",styleController)

router.get("/create",styleController)

router.get("/edit/:id",styleController)

router.post("/",upload.single("style"),styleController)

router.put("/edit/:id",upload.single("style"),styleController)

router.delete("/:id",styleController)


module.exports = router;
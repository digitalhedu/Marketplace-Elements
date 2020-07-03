const router = require("express").Router();
const brandController = require("../controllers/brandController");
const multer= require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/public/uploads/brand/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })

router.get("/",brandController)
router.get("/:id",brandController)
router.get("/create",brandController)
router.get("/edit/:id",brandController)

router.post("/",upload.single("brand"),brandController)
router.put("/edit/:id",upload.single("brand"),brandController)
router.delete("/:id",brandController)

module.exports = router;
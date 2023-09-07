const express=require("express")

const router=express.Router()

const {
    getController,
    postController,
    getControllerid,
    putController,
    deleteController
}=require("../controllers/routeControllers")

router.route("/").get(getController)

router.route("/").post(postController)

router.route("/:id").get(getControllerid)

router.route("/:id").put(putController)

router.route("/:id").delete(deleteController)

module.exports=router
const express = require("express");
const router = express.Router();

//  @route GET api/posts/test
//  @desc Tests posts route
//  @acess Public

router.get("/test", (req, res) => res.json({ msg: "Users Works!" }));

module.exports = router;

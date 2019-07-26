const Control = require('../../controllers/controller')
const Particule = require('../../controllers/particulier/particulier')
const Admin = require('../../controllers/atelier/atelier')
const express = require("express");
const router = express.Router();

router.post('/register', Control.register)
router.post("/login", Control.login)
router.post('/particulier/:_id', Particule.createPart);
router.post('/newArticle', Admin.create);
router.get('/newArticle', Admin.findAllArticle);
router.put('/putArticle/:profilId', Admin.update);
router.get('/newArticle/:idUser', Admin.findOne);
router.get('/newArticleImage/:image', Admin.findOneArticle);
router.get('/cacherAtl/:_id', Admin.cacherAtl);
router.get('/affichAtl/:_id', Admin.affichAtl);

module.exports = router;

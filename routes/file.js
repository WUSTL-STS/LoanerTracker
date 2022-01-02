const express = require('express');
const router = express.Router();

const multer = require('multer')
const upload = multer({ dest: '/uploads' })

const Record = require('../models/Record')
const GridFile = require('../models/GridFile')

const fs = require('fs')

router.get('/:form/add/:id', (req, res) => {
    try {
        params = {'form': req.params.form, 'id': req.params.id}
        res.render('addFile', params)
    } catch (err) {
        console.log(err)
    }
})

router.post('/:form/add/:id', upload.single('loaner_form'), async (req, res, nxt) => {
    try {
        if (req.file) {
            let file = req.file
            const fileStream = fs.createReadStream(file.path)

            // upload file to gridfs
            const gridFile = new GridFile({ filename: file.originalname })
            await gridFile.upload(fileStream)

            // delete the file from local folder
            fs.unlinkSync(file.path)

            const r = await Record.findById(req.params.id)
        
            if(req.params.form === "form"){
                if (r.loanerForms) {
                    GridFile.findByIdAndRemove(r.loanerForms)
                }
                r.loanerForms = gridFile
            } else if (req.params.form === "proof"){
                if (r.proofRepair) {
                    GridFile.findByIdAndRemove(r.proofRepair)
                }
                r.proofRepair = gridFile;
            }
            
            await r.save();
            res.redirect('/')
        }
    } catch (err) {
        console.log(err)
    }
})

router.get('/:form/get/:id', async (req, res, nxt) => {
    try {
        const r = await Record.findById(req.params.id)
        let g;
        if(req.params.form === "form"){
            g = await GridFile.findById(r.loanerForms)
        } else if (req.params.form === "proof"){
            g = await GridFile.findById(r.proofRepair)
        }
        if (g) {
            console.log(g)
            res.attachment(g.filename)
            g.downloadStream(res)
        } else {
            console.log("fnf")
            res.status(404).json({ error: 'file not found' })
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
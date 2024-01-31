import express from 'express'

const router = express.Router()

router.get('/', (_, res) => {
    res.render('login')
})

router.post('/', (req, res) => {
    if (req.body.password === process.env.SITE_PASS) {
        req.session.loggedIn = true
        return res.redirect('/')
    } else {
        res.render('login')
    }
})

module.exports = router
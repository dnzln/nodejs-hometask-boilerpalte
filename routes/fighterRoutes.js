const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter

router.get('/', (req, res, next) => {
    try {
        const fightersData = FighterService.getFighters();        
        res.data = fightersData;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
    try {
        const fighter = FighterService.getFighterById(req.params.id)
        res.data = fighter;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.post('/', createFighterValid, (req, res, next) => {
    try {
        if (res.validationPassed) {
            const fighterData = FighterService.addFighter(req.body)        
            res.data = fighterData;
        } 
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.put('/:id', updateFighterValid, (req, res, next) => {
    try {
        if (res.validationPassed) {
            const fighterId = req.params.id;
            const newData = req.body;
            const fighter = FighterService.updateFighter(fighterId, newData)
            res.data = fighter;
        }
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
    try {
        const fighter = FighterService.deleteFighter(req.params.id)
        res.data = fighter;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;
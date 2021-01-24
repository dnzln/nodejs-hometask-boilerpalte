const { fighter } = require('../models/fighter');

const createFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during creation    
    let validationPassed = true;

    try {
        if (req.body.hasOwnProperty('id')) throw Error('ID of the fighter already exists');

        const newFighterData = {};        

        for (let key in fighter) {
            if (!req.body[key] && key != 'id' && key != 'health') throw Error('Empty fields');
            if (key != 'id' && key != 'health') newFighterData[key] = req.body[key];
        }

        isPowerValid(newFighterData);        
        isDefenseValid(newFighterData);

    } catch (err) {
        res.err = err;
        validationPassed = false;
    } finally {
        res.validationPassed = validationPassed;
        next();
    }
}

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during update    
    let validationPassed = true;

    try {
        if (req.body.hasOwnProperty('id')) throw Error('Can not change ID of the fighter');

        const fighterData = req.body;
        
        for (let key in fighterData) {
            if (!fighter.hasOwnProperty(key)) throw Error('Unknown property');
            if (!fighterData[key]) throw Error('Property is empty');
            switch (key) {
                case 'power':
                    isPowerValid(fighterData); 
                    break;
                case 'defense':
                    isDefenseValid(fighterData);
                    break;
            }
        }
    } catch (err) {
        res.err = err;
        validationPassed = false;
    } finally {
        res.validationPassed = validationPassed;
        next();
    }    
}

const isPowerValid = (fighter) => {
    if (!Number.isInteger(fighter.power) || fighter.power > 100) throw Error('Invalid power value');
    return true;
}

const isDefenseValid = (fighter) => {
    if (!Number.isInteger(fighter.defense) || fighter.defense > 10 || fighter.defense < 1) throw Error('Invalid defense value');
    return true;
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
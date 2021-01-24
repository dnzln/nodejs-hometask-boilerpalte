const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {

    // TODO: Implement methods to work with fighters

    deleteFighter(id) {
        const fighter = FighterRepository.delete(id);        
        if(!fighter) {
            throw Error('404 Fighter not found');
        }
        return fighter;
    }

    updateFighter(id, newData) {
        if (!FighterRepository.getOne({ 'id': id })) throw Error('404 Fighter not found');
        const fighter = FighterRepository.update(id, newData);        
        if(!fighter) {
            throw Error('404 Fighter was not updated');
        }
        return fighter;
    }

    getFighterById(id) {
        const fighter = FighterRepository.getOne({ 'id': id });        
        if(!fighter) {
            throw Error('404 Fighter not found');
        }
        return fighter;
    }

    getFighters() {
        const fighters = FighterRepository.getAll();
        if(!fighters) {
            return null;
        }
        return fighters;
    }

    addFighter(fighterData) {
        const fighter = FighterRepository.create(fighterData);
        if(!fighter) {
            throw Error('Fighter not created');
        }
        return fighter;
    }

}

module.exports = new FighterService();
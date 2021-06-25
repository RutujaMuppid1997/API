const router = require('express').Router();
const api = require('./controller');
const auth = require('../../../../common/authentication');

// Middle layer for User API
router.post('/checkIfValid', auth.decryptRequest, api.checkIfValid);
// router.put('/', auth.decryptRequest, api.updateUser);
// router.post('/staking-farming', auth.decryptRequest, api.stakingFarming);

module.exports = router;

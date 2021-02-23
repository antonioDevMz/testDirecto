const joi   = require('joi');
const utils = require('../utils');

const schema = joi.object({
    board : joi.array().required(),
    word : joi.string().required(),
});

const test = async ({ body }, res) => {
    try {
        await schema.validateAsync(body);

        let oBuilded = await utils.buildJson(body.board);
        let searchWord = await utils.searchWord(oBuilded, body.word);
        let status = searchWord ? 200: 404;
        
        res.status(status).send({
            found: searchWord 
        });
    } catch (error) {
        res.status(500).send({success: false, message: error.message})
    }
};


module.exports = {
    test
};
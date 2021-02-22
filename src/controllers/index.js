
const test = async (req, res) => {
    res.status(200).send({
        success: true,
        message: 'todo chido'    
    });
};


module.exports = {
    test
};
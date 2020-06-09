const Category = require('../mysqlModels/Category');

getAllCategoryHandler = async (msg, callback) => {
    var res = {}
    try {
        const categories = await Category.findAll();
        res.status = 200;
        res.data = JSON.stringify(categories);
        callback(null, res)
    } catch (err) {
        console.log(err);
        res.status = 500
        res.data = 'Internal Servre Error!'
        callback(null, res);
        
    }
}

getCategoryByIdHandler = async (msg, callback) => {
    var res = {};
    const id = msg.id;
    try {
        const category = await Category.findOne({
            where: {
                id: id
            }
        })
        if(category === null) {
            res.status = 404
            res.data = 'Category not found!';
            callback(null, res);
        }
        res.status = 200
        res.data = JSON.stringify(category);
    } catch(err) {
        console.log(err);
        res.status = 500
        res.data = 'Internal Servre Error!';
        callback(null, res);
    }
}

function handle_request(msg, callback) {

    console.log(msg)
    if (msg.path === 'getAllCategoryHandler') {
        delete msg.path
        getAllCategoryHandler(msg, callback)

    }
    if (msg.path === "getCategoryByIdHandler") {
        delete msg.path
        getCategoryByIdHandler(msg, callback)
    }
};

exports.handle_request = handle_request;
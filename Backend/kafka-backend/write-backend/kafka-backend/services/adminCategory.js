const Category = require('../mysqlModels/Category');

addCategoryHandler = async (msg, callback) => {
    var res = {}
    try {
        const category = await Category.create({categoryName: msg.categoryName});
        res.status = 201
        res.data = JSON.stringify(category);
        callback(null, res) 
    } catch(err) {
        console.log(err);
        res.status = 500
        res.data = 'Internal Server Error!';
        callback(null, res);
    }
}

updateCategoryHandler = async (msg, callback) => {
    var res = {}
    const {categoryName} = msg
    const id = msg.id;
    try {
        const category = await Category.findOne({
            where: {
                id:id
            }
        });
        if ( category === null) {
            res.status = 404
            res.data = 'Category not found!';
            callback(null, res);
        }
        else {
            const newCategory = await Category.update({
               categoryName:categoryName
            },{where:{id:id}})

            res.status = 200
            res.data = JSON.stringify(newCategory);
            callback(null, res) 
        }
    }
    catch (err) {
        console.log(err);
        res.status = 500
        res.data = 'Internal Server Error!';
        callback(null, res);
    }
}

function handle_request(msg, callback) {
    if (msg.path === 'addCategoryHandler') {
      delete msg.path
      getCompanyHandler(msg, callback)
    }
    if (msg.path === 'updateCategoryHandler') {
      delete msg.path
      updateCompanyhandler(msg, callback)
    }
  };
  
  exports.handle_request = handle_request;
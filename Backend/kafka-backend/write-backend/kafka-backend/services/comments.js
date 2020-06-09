const Customer = require('../mysqlModels/Customer')
const Comments = require('../mysqlModels/Comments')
const Product = require('../mysqlModels/Product')

addCommentHandler = async (msg, callback) => {
  var res = {}
  const { comment } = msg
    const userId = msg.userId;
    const productId = msg.productId;
    try {
        const user = await Customer.findOne({
            where: {
                id: userId
            }
        });
        if (user === null) {
            res.status = 404
            res.data = "User not found!";
            callback(null, res);
        }
        else {
            const product = await Product.findOne({
                where: {
                    id: productId
                }
            });
            if (product === null) {
                res.status = 404
                res.data = "Product not found!";
                callback(null, res);
            }
            else {
                const newComment = await Comments.create({
                    comment: comment,
                    customerId: userId,
                    productId: productId
                })
                res.status = 200
                res.data = JSON.stringify(newComment);
                callback(null, res);
            }
        }

    }
    catch (err) {
        console.log(err);
        res.status = 500
        res.data = "Internal Server Error!";
        callback(null, res);
    }
    
}

deleteCommentHandler = async (msg, callback) => {
    var res = {}
  const id = msg.id;
  try {
      const result= Comments.destroy({
          where:{
              id:id
          }
      })
      res.status = 200
      callback(null, res);
      }
  catch (err) {
      console.log(err);
      res.status = 500
      res.data = "Internal Server Error!";
      callback(null, res);
  }
  
}

updateCommentHandler = async (msg, callback) => {
  const { comment } = msg
  const id = msg.id;
  try {
      const comments = await Comments.findOne({
          where: {
              id: id
          }
      });
      if (comments === null) {
        res.status = 404
        res.data = "Comment not found!";
        callback(null, res);
      }
      else {
          const updatedComment = await Comments.update({
              comment: comment,
          }, { where: { id: id } })

          res.status = 200
          res.data = JSON.stringify(updatedComment);
          callback(null, res);
      }
  }
  catch (err) {
      console.log(err);
      res.status = 500
      res.data = "Internal Server Error!";
      callback(null, res);
  }

}

function handle_request(msg, callback) {
    if (msg.path === 'addCommentHandler') {
      delete msg.path
      addCommentHandler(msg, callback)
    }
    if (msg.path === 'deleteCommentHandler') {
      delete msg.path
      deleteCommentHandler(msg, callback)
    }
    if (msg.path === 'updateCommentHandler') {
        delete msg.path
        updateCommentHandler(msg, callback)
    }
  };
  

  exports.handle_request = handle_request;
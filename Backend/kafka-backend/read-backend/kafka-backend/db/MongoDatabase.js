const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://kowshhal:qwerty123@cluster0-k9dnt.mongodb.net/amazon?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
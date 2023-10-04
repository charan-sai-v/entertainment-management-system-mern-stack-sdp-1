const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/events/');
    },
    filename: function(req, file, cb){ // Change cb to next
        cb(null, Date.now() +"-"+ file.originalname); // Change cb to next
    }
});

const upload = multer({storage: storage});

module.exports = upload;

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Укажите путь к папке, где вы хотите сохранять файлы
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
        // Укажите, каким именем сохранять файлы
        cb(null, Date.now() + '-' + file.originalname);
    }
});

exports.toJSON = (value) => {
    return JSON.parse(JSON.stringify(value))
}


exports.upload = multer({ storage: storage });
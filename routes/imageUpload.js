let multer = require('multer');
const imageToBase64 = require('image-to-base64');
const fetch = require('node-fetch')
var FormData = require('form-data');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'tmp')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split(' ').join('_') )
  }
})

var upload = multer({ storage: storage })

module.exports=(app)=>{
    app.post('/api/upload',upload.single('file'),async (req,res)=>{
        
        var form = new FormData();
        form.append('type', 'file');

        await imageToBase64(`./tmp/${req.file.filename}`)
        .then((response) => {
                form.append('image',response)    
            }
        )
        .catch(
            (error) => {
                console.log(error); 
                return res.send('Err')
            }
        )
        const response1 = await fetch('https://api.imgur.com/3/image.json', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Client-ID 667ab1880f44dcb`
            },
            body: form
            })
            const data = await response1.json()
            if(data.success)
                return res.send(data.data.link)
            res.send('Err')
    })
}
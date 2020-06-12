let multer = require('multer');
const imageToBase64 = require('image-to-base64');
const fetch = require('node-fetch')
var FormData = require('form-data');
// var fs = require('fs');

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
        // form.append('image', fs.createReadStream(`/tmp/${req.file.filename}`));

        await imageToBase64(`./tmp/${req.file.filename}`)
        .then((response) => {
                // data1=response; //cGF0aC90by9maWxlLmpwZw==
                // data1= data1.concat(data2);
                // console.log(response);
                form.append('image',response)
                // console.log(form);
                
            }
        )
        .catch(
            (error) => {
                console.log(error); //Exepection error....
                return res.send('Err')
            }
        )
        // console.log('ddwaadwa');
        res.send('OK');
        })
    //     const response1 = await fetch('https://api.imgur.com/3/image.json', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             Authorization: `Client-ID 667ab1880f44dcb`
    //         },
    //         body: form
    //         })
    //         const data = await response1.json()
    //         if(data.success)
    //             return res.send(data.data.link)
    //         res.send('Err')
    // })
}
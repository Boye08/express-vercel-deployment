const express = require("express");
const app = express();

const port = process.env.PORT || 8080;

const superbase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hallo world!')
})

app.get('/v1/auth', async (req, res) => {
    const ip = req.query.ip
    const token = req.query.token
    const type = req.query.resource

    try {
        const { data, error} = await superbase.from('tokens-licnses').select('*').eq('ip', ip).eq('token', token).eq('resource', type)
        if (data) {
                res.status(200).send('License is valid')
            } else {
                res.status(404).send('License not found')
            }
        }
    catch(error) {
        console.log(error)
        res.status(500).send('Database error')
    }
})

app.get('/v1/auth/gencode', (req, res) => {
    const id = req.params.id

    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = 'JUSTME-';
    for ( var i = 0; i < 25; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }

    res.send(result)
})

app.listen(port, () => {
  `Server started on port ${port}`;
});

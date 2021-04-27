const { app } = require('./core'); 
const { db, sse } = require('./db')

// let devices = db.get('devices').value();


app.get('/devices', (req, res) => {
    let devices = db.get('devices').value();
    res.send(JSON.stringify({ devices: devices }));
})


// db.get('devices').value();

// update();

app.get('/devices/:id', (req, res) => {
    let devices = db.get('devices').value();
    let id = parseInt(req.params.id);
    let results = devices.filter(device => device.id === id);
    console.log(results);
    console.log(results[0]);
    res.send(JSON.stringify({ device: results[0] }));

})

app.listen(3000, () => {
    console.log('API for smart home 1.1 up n running.')
})

/* CODE YOUR API HERE */

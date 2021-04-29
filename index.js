const { app } = require('./core'); 
const { db, sse, update } = require('./db')

/* CODE YOUR API HERE */

let devices = db.get('devices');


/* ------------------------------LIGHT-------------------------------- */

app.get('/light/:id/:state', (req, res) => {

    // let type = req.params.type;
    let id = req.params.id;
    let state = req.params.state;

    if(state === 'on'){    
        let device = devices.find(device => device.id === id) 
    .assign({on : true,
            // brightness: req.query.brightness,
        }).value()

    update();
    res.send(`${device.type} in ${device.name} is on`)
    
    } else {
        let device = devices.find(device => device.id === id) 
        .assign({on : false}).value()
    
        update();

        res.send(`${device.type} in ${device.name} is ${device.state}`)
    }
})

/* ------------------------------AC-------------------------------- */

app.get('/ac/:id/:state', (req, res) => {

    // let type = req.params.type;
    let id = req.params.id;
    let state = req.params.state;

    if(state === 'on'){    
        let device = devices.find(device => device.id === id) 
    .assign({on : true}).value()

    update();
    res.send(`${device.type} in ${device.name} is on`)
    
    } else {
        let device = devices.find(device => device.id === id) 
        .assign({on : false}).value()
    
        update();

        res.send(`${device.type} in ${device.name} is ${device.state}`)
    }
})

/* ------------------------------BLIND-------------------------------- */

app.get('/blind/:id/:state', (req, res) => {

    // let type = req.params.type;
    let id = req.params.id;
    let state = req.params.state;

    if(state === 'down'){    
        let device = devices.find(device => device.id === id) 
    .assign({on : true}).value()

    update();
    res.send(`${device.type} in ${device.name} is down`)
    
    } else {
        let device = devices.find(device => device.id === id) 
        .assign({on : false}).value()
    
        update();

        res.send(`${device.type} in ${device.name} is up`)
    }
})

/* ------------------------------CAMERA-------------------------------- */

app.get('/camera/:id/:state', (req, res) => {

    // let type = req.params.type;
    let id = req.params.id;
    let state = req.params.state;

    if(state === 'filming'){    
        let device = devices.find(device => device.id === id) 
    .assign({on : true}).value()

    update();
    res.send(`${device.type} in ${device.name} is filming`)
    
    } else {
        let device = devices.find(device => device.id === id) 
        .assign({on : false}).value()
    
        update();

        res.send(`${device.type} in ${device.name} is faking`)
    }
})

/* ------------------------------LOCK-------------------------------- */

app.get('/lock/:id/:code', (req, res) => {

    // let type = req.params.type;
    let id = req.params.id;
    let code = req.params.code;
    let locked = req.params.locked

    if(code === 1234 || locked === true){    
        let device = devices.find(device => device.id === id) 
    .assign({locked : false}).value()

    update();
    res.send(`${device.type} is locked`)
    
    } else {
        let device = devices.find(device => device.id === id) 
        .assign({locked : true}).value()
    
        update();

        res.send(`${device.type} is open`)
    }
})


app.listen(3000, () => {
    console.log('API for smart home 1.1 up n running.')
})



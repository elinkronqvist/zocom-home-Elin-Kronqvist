const { app } = require('./core'); 
const { db, sse, update } = require('./db')

/* CODE YOUR API HERE */

let devices = db.get('devices');

/* ------------------------------LIGHT-------------------------------- */

app.get('/light/:id/:on', (req, res) => {

    let id = req.params.id;
    let on = req.params.on;

    if(on === 'on'){    
        let device = devices.find(device => device.id === id) 
    .assign({on : true,
            // brightness: req.query.brightness,
        }).value()

    update();

    res.send(`${device.type} in ${device.name} is on`)
    
    } else if (on === 'off'){
        let device = devices.find(device => device.id === id) 
        .assign({on : false}).value()
    
        update();

        res.send(`${device.type} in ${device.name} is ${device.state}`)
    }else {
        res.send(`Wrong input. Please enter 'on' or 'off'.`)
    }
})

/* ------------------------------AC-------------------------------- */

app.get('/ac/:id/:on', (req, res) => {

    let id = req.params.id;
    let on = req.params.on;

    if(on === 'on'){    
        let device = devices.find(device => device.id === id) 
    .assign({on : true,
            temperature: req.query.temperature}).value()

    update();

        res.send(`${device.type} in ${device.name} is on`);

    // if(JSON.stringify(req.query) == {}){
    //     res.send(`${device.type} in ${device.name} is on`);
    // }else{
    //     res.send(`${device.type} in ${device.name} is on with a temperature of ${req.query.temperature} degrees.`)
    // }
    
    
    } else if(on === 'off') {
        let device = devices.find(device => device.id === id) 
        .assign({on : false}).value()
    
        update();

        res.send(`${device.type} in ${device.name} is ${device.state}`)
    } else{

        res.send(`Wrong input. Please enter 'on' or 'off'.`)
    }
})

/* ------------------------------BLIND-------------------------------- */

app.get('/blind/:id/:on', (req, res) => {

    let id = req.params.id;
    let on = req.params.on;

    if(on === 'on'){    
        let device = devices.find(device => device.id === id) 
    .assign({on : true}).value()

    update();
    res.send(`${device.type} in ${device.name} is down`)
    
    } else if(on === 'off') {
        let device = devices.find(device => device.id === id) 
        .assign({on : false}).value()
    
        update();

        res.send(`${device.type} in ${device.name} is up`)
    } else{

        res.send(`Wrong input. Please enter 'on' or 'off'.`)
    }
})

/* ------------------------------CAMERA-------------------------------- */

app.get('/camera/:id/:on', (req, res) => {

    let id = req.params.id;
    let on = req.params.on;

    if(on === 'on'){    
        let device = devices.find(device => device.id === id) 
    .assign({on : true}).value()

    update();
    res.send(`${device.type} at ${device.name} is filming`)
    
    } else if (on === 'off'){
        let device = devices.find(device => device.id === id) 
        .assign({on : false}).value()
    
        update();

        res.send(`${device.type} at ${device.name} is off`)
    } else{

        res.send(`Wrong input. Please enter 'on' or 'off'.`)
    }
})

/* ------------------------------LOCK-------------------------------- */

app.get('/lock/:id/:on', (req, res) => {

    let id = req.params.id;
    let on = req.params.on;

    if(on === 'unlock'){    
        let device = devices.find(device => device.id === id) 
    .assign({locked : true}).value()

    update();
    res.send(`${device.type} at ${device.name} is unlocked`)
        
    } else if (on == 'lock'){
        let device = devices.find(device => device.id === id) 
        .assign({locked : false}).value()
    
        update();

        res.send(`${device.type} at ${device.name} is locked`)
    }else {

        res.send(`Wrong input. Please enter 'unlock' or 'lock'.`)
    }
})


/* ------------------------------VACUUM-------------------------------- */

app.get('/vacuum/:id/:on', (req, res) => {

    let id = req.params.id;
    let on = req.params.on;

    if(on === 'on'){    
        let device = devices.find(device => device.id === id) 
    .assign({on : true}).value()

    update();

    res.send(`${device.type} ${device.name} is cleaning`)
    
    // }else if(state === 'charging'){
    //     let device = devices.find(device => device.id === id) 
    // .assign({on : true}).value()

    // update();

    // res.send(`${device.type} in ${device.name} is charging`)

    }else if(state === 'off') {
        let device = devices.find(device => device.id === id) 
        .assign({on : false}).value()
    
        update();

        res.send(`${device.type} in ${device.name} is off`)
    }else{

        res.send(`Wrong input. Please enter 'on' or 'off'.`)
    }
})

/* ------------------------------SPEAKER-------------------------------- */

app.get('/speaker/:id/:on', (req, res) => {

    let id = req.params.id;
    let on = req.params.on;

    if(on === 'on'){    
        let device = devices.find(device => device.id === id) 
    .assign({on : true}).value()

    update();
    res.send(`${device.type} in ${device.name} is playing`)
    
    }else if(on === 'off'){
        let device = devices.find(device => device.id === id) 
    .assign({on : false}).value()

    update();

    res.send(`${device.type} in ${device.name} is silent`)
    }else {

        res.send(`Wrong input. Please enter 'on' or 'off'.`)
    }
})


app.listen(3000, () => {
    console.log('API for smart home 1.1 up n running.')
})



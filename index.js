const { app } = require('./core'); 
const { db, sse, update } = require('./db')

/* CODE YOUR API HERE */

// Skapat en variabel för att kunna hämta devices från db.json i mappen db
let devices = db.get('devices');

/* ------------------------------LIGHT-------------------------------- */

app.get('/light/:id/:on', (req, res) => {

    //Skapat variabler för att nå id och on som skrivs in som parametrar i url:en
    let id = req.params.id;
    let on = req.params.on;

    //När parametern on matchar och skrivs in som 'on' i url:en körs följande kod
    if(on === 'on'){ 
        
        //Skapar en variabel för brightness som kontrollerar om vi endast tänder lampan utan att skicka in någon query för brightness. Eftersom queryn då blir undefined sätter vi ett standardvärde till 1, som då skickas med.
        let brightness = (req.query.brightness == undefined) ? 1 :  req.query.brightness;

        //Skapat en variabel för att kunna matcha det objekt-id som står i devices med det id som skrivs in i url:en genom params.
         //Skickar sedan in det värde som vi vill sätta till vår device.
        let device = devices.find(device => device.id === id) 
        .assign({on : true,
                brightness: brightness,
            }).value()

        //Här skickar vi till frontend att statet ska uppdateras. Vi får då tillbaka ett promise. 
        update();

        //Här skickar vi vårt response
        res.send(`${device.type} in ${device.name} is on`)
    
    //Om användaren istället skriver in 'off' som params körs denna kod
    } else if (on === 'off'){

        //Skapat en variabel för att kunna matcha det objekt-id som står i devices med det id som skrivs in i url:en genom params.
         //SKickar sedan in det värde som vi vill sätta till vår device 
         let device = devices.find(device => device.id === id)
        .assign({on : false}).value()
    
        //Här skickar vi till frontend att statet ska uppdateras. Vi får då tillbaka ett promise. 
        update();

        //Här skickar vi vårt response
        res.send(`${device.type} in ${device.name} is ${device.state}`)

    //Om användaren skriver något annat än 'on' eller 'off' körs denna kod
    }else {
        
        //Här skickar vi vårt response
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



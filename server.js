const express = require('express');
const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const cors = require ('cors');
const PORT = 4001



const app = express();


const uri =  "mongodb+srv://brianmtonga592:TXrlxC13moNMMI0h@lostandfound1.f6vrf.mongodb.net/?retryWrites=true&w=majority&appName=lostandfound1"

mongoose.connect(uri)
  .then(() => console.log("Connected to MangoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error.message));

const conn = mongoose.connection;

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended:true}));


const locationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    coordinates: {type: String, required: true},
});

const Location = mongoose.model('Location', locationSchema);

app.post('/api/locations', async (req,res) => {
    const {name, coordinates} = req.body;

    if (!name || !coordinates) {
        return res.status(400).json({error: 'Name and coordinates are required'});
    }
    try {
        const newLocation = new Location({name, coordinates});
        await newLocation.save();
        res.status(201).json({message: 'Location saved successfully', location: newLocation});
    } catch (error) {
        res.status(500).json({error: 'Error saving location'});
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
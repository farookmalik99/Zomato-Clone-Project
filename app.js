const express = require ('express');
const mongoose = require ('mongoose');      // Importing Mongoose for the Mongo DB
const cors = require ('cors');              // Connecting the frontend and the backend
//const bodyParser = require ('body-parser');
const route = require ("./Routes/routes");
const dotenv = require("dotenv");
const passport = require ('passport');
const cookieSession =  require ('cookie-session');

const paymentRoutes = require("./Controllers/payment");
const authRoute = require("./Controllers/auth");
const passportSetup = require("./Controllers/passport");

dotenv.config();

const Port = process.env.PORT || 8900;
const hostname = 'localhost';

const atlasDbUrl = "mongodb+srv://gangstamalik:Qf2BZ6SHAUOLaRDB@cluster0.ub1nlyl.mongodb.net/FinalProject?retryWrites=true&w=majority";        // MongoDb Atlas connection URL

// gangstamalik
// Qf2BZ6SHAUOLaRDB
// dbname: FinalProject

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}


const app = express();

app.use(cookieSession({ name: "session", keys:["edureka"], maxAge:24*60*60*1000 }));
    // 24 hours * 60 minutes * 60 Seconds * 1000 MilliSeconds = 84600000 milli seconds a day

//app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/',route);
app.use("/api/payment/", paymentRoutes);
app.use("/auth", authRoute);

mongoose.connect(atlasDbUrl, {           // Creating a mongo DB Connection
    useNewUrlParser: true, useUnifiedTopology: true // Creating a new connection with DB and using the MongoDB Driver's connection management engine
})
    .then(res => {
        app.listen(Port, hostname, () => {
            console.log(`Server is running at ${hostname}: ${Port}`)
        });
    })
    .catch(err => console.log(err));

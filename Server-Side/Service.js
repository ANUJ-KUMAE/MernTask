// require('dotenv').config();
const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./Connection/ConfigConnect');
const errorMiddleware = require('./Middleware/errorMiddleware');
const app = express();
const AuthRouter = require('./Router/AuthRouter');
const EmployeeRouter = require('./Router/EmployeeRouter');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary');


var corsOption = {
    origin:"http://localhost:5173",
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials:true,
};

app.use(cors(corsOption))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(fileUpload({ useTempFiles: true }));

app.use('/Auth/admin', AuthRouter);
app.use('/Auth/employee', EmployeeRouter);

cloudinary.config({
    cloud_name: process.env.CLOUDORDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDORDINARY_API_KRY,
    api_secret: process.env.CLOUDORDINARY_SECRET_KEY,
  });


app.use(errorMiddleware);

const PORT = 5050;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on the port ${PORT}`);
    })
})


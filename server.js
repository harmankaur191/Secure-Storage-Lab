import 'dotenv/config';
import express from 'express';
import connection from './config/connection.js';
import userRoutes from './routes/userRoutes.js';
import router from './routes/userRoutes.js';
import { Router } from 'express';



connection
.then(()=> console.log('Connected to database successfully!'))
.catch((e)=> console.log(e));


const app = express();
const PORT = process.env.PORT || 3001;
 

app.use(express.json());
 
app.use('/api/',userRoutes)
 
// app.use(routes);
 

  app.listen(PORT, () =>{ 
    console.log(`🌍 Now listening on localhost:${PORT}`)});

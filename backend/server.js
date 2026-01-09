import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passportConfig from "./src/config/passport.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import authRoutes from './src/routes/authRoutes.js';
import usersRoutes from './src/routes/usersRoutes.js';
import studentRoutes from './src/routes/studentRoutes.js';
import postRoutes from './src/routes/postRoutes.js';
import commentRoutes from './src/routes/commentRoutes.js';
import session from "express-session";
import { connectDB } from './src/config/db.js'
import adminRoutes from './src/routes/adminRoutes.js'
import forgotPasswordRoutes from './src/routes/forgotPasswordRoutes.js'
// Initialiser express app
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: process.env.JWT_SECRET || 'change_this_in_prod',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // secure:true si HTTPS en prod
}));

app.use(express.urlencoded({  extended: true }));

// Servir les fichiers statiques (avatars)
app.use('/uploads', express.static('src/uploads'));

// init passport
passportConfig();
app.use(passport.initialize());
app.use(passport.session());

// connection à mongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api', adminRoutes);
app.use('/api', forgotPasswordRoutes);

app.get('/', (req, res) => res.send("API AcademyHub"));

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server demarer sur http://localhost:${PORT}`);
});
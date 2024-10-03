// src/server.ts
import jwtAdminMiddleware, { jwtAdminSecret, jwtAdminTokenExpiry } from "../../middleware/jwtAdminMiddleware";
import bcrypt from "bcrypt";
import express, { Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { SocketManager } from './socketManager';

const host = process.env.REDIS_HOST || 'localhost';
const port = process.env.REDIS_PORT || '6379'; // Set a default port if not provided
const redisUrl = `redis://${host}:${port}`; // 'redis://localhost:6379'
const SECRET_KEY = 'saaccountingadminsecretjas9ueyfrvn71803etfbvg61y92efnc817ye2f98c1e2p9cu189e2y';
const users: { [key: string]: string } = { 'userName': 'cyrus', 'userId': '7777', 'password': 'xxxx' }; // Dummy user data

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const socketManager = new SocketManager(io, SECRET_KEY, redisUrl); // Instantiate SocketManager with SECRET_KEY

const router = express.Router();
const infoRouter = express.Router();

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(express.static(__dirname)); 
app.use(router);

router.use("/info", infoRouter);

// Login endpoint to generate JWT
infoRouter.post("/login", (req: Request, res: Response) => {
    const { userName, userId, password } = req.body;

    console.log(`login ==> userId:[${userId}], name:[${userName}], type:[${password}]`);

    if (users['userName'] === userName) {
        const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ token });
    }

    return res.status(401).json({ error: 'Invalid credentials' });

    /* ###################################################### */

    /*

    const { email, password } = req.body || {};

    const _user = await mongodb.SAUser().findOne({ email });
    if (_user == null || !_user.password) {
      res.status(500).json({ msg: "err", error: "NO USER." });
      return;
    }

    try {
        let passwordMatches = bcrypt.compareSync(password, _user.password);
        let masterPassword = process.env.MASTER_PASSWORD as string;
    
        passwordMatches = passwordMatches || (password == masterPassword);
    
        if (passwordMatches) {

            //  const token = jwt.sign({ _id: _user._id.toString('hex') }, jwtAdminSecret, {
            //    expiresIn: jwtAdminTokenExpiry,
            // });
        
            //internalId: _user.internalId,
            //firstName: _user.firstName,
            //lastName: _user.lastName,
            //email: _user.email,
  
            const token = jwt.sign({ _user.internalId }, SECRET_KEY, { expiresIn: '1d' });
            return res.status(200).json({ token });

        } else {
            return res.status(400).json({ msg: "err", error: "INVALID PASSWORD" });
        }

    } catch (error) {
        
        return res.status(500).json({ msg: "err", error: "AN ERROR OCCURRED" });

    }
    */


});

// Start the server
server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});

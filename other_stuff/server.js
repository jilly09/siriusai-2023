const express = require('express');
const app = express();
const userRouter = require('./routes/user.js')();
const gptRouter = require('./routes/gpt.js')();
// app.use(authRouter)
// app.use(guard)
app.use(userRouter);
app.use(gptRouter);
app.listen(process.env.PORT);

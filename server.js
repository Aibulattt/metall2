const express = require('express');
const corsMiddleware = require('./corsMiddleware');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(corsMiddleware);
app.use(express.json({extended: true}))

app.use('/api/', require('./routes'));

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))
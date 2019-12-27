const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// express uygulaması başlatır.
const app = express();

// Ara katman
app.use(bodyParser.json());
app.use(cors());

// iletilerle ilgili rotaları barındıran kod.
const posts = require('./routes/api/posts');

// api/posts önekiyle gelen tüm rotalar postsa yönlendirilecek.
app.use('/api/posts', posts);


//server localde 5000 remoteda ise herokunun belirlediği portda çalışır.
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
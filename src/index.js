const app = require('./servidor');
const rotas = require('./roteador')


app.listen(3000);
app.use(rotas)

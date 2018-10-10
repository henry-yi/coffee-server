const express = require('express')
const app = express()
const port = 3000

const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:2579renata@localhost:5432/coffee');
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
});

const Order = sequelize.define('work_orders', {
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    },    
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    coffee: {
      type: Sequelize.STRING
    },
    brew_method: {
      type: Sequelize.STRING
    },
    number_of_cases: {
      type: Sequelize.INTEGER
    },
    packets_per_case: {
      type: Sequelize.INTEGER
    },
    ship_date: {
      type: Sequelize.DATE
    },    
    order_number: {
        type: Sequelize.INTEGER
    },
    priority: {
      type: Sequelize.BOOLEAN
    }    
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/orders', async (req, res) => res.send(await Order.findAll({ order: [['ship_date', 'ASC']] })));
app.post('/new', async (req, res) => res.send(await Order.create({
  coffee: req.body.coffee,
  brew_method: req.body.brew_method,
  number_of_cases: req.body.number_of_cases,
  packets_per_case: req.body.packets_per_case,
  ship_date: req.body.ship_date,
  priority: req.body.priority,
  order_number: 57120  
})));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
 
async function test(req) {

}
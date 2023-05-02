
const predict = require('../predict');

module.exports = function(options)
{
  this.add({init: "account"}, function(pluginInfo, respond){
    console.log(options.message);
    respond();
  })

  this.add({ area: 'product', action: 'list'}, getProducts)
  this.add({ area: 'product', action: 'add'}, addProduct)
  this.add({ area: 'user', action: 'add'}, addUser)
  this.add({ area: 'user', action: 'list'}, getUsers)

  // ************* Implement Logic here ************* //

  function getProducts(args, respond) {
    try {
        console.log(args.args.query);
        const result = this.act('role:product-store,cmd:list',{}, respond )
        respond(null, { response: result, message: 'Product List' })
    } catch (err) {
        respond(err, null)
    }
}

function addProduct(args, respond) {
    try {
        const { name, description, price } = JSON.parse(args.args.body);
        console.log(args.args);
        // this.act('role:product-store,cmd:add',{name, description, price}, respond )
        respond(null, { response: 'Product Added' })
    } catch (err) {
        respond(err, null)
    }
}

function addUser(args, respond) {
    try {
        const { name, email, empId } = JSON.parse(args.args.body);
        this.act('role:user-store,cmd:add',{name, description, price}, respond )
        respond(null, { response: 'Product Added' })
    } catch (err) {
        respond(err, null)
    }
}

function getUsers(args, respond) {
    try {
        console.log(args.args.query);
        const result = this.act('role:user-store,cmd:list', respond )
        respond(null, { response: result, message: 'Product List' })
    } catch (err) {
        respond(err, null)
    }
}
  return "account";
}
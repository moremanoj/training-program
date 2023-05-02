const URI = "mongodb://myuser:Campdandmj@143@cluster0.2vn9q.mongodb.net/test?ssl=false";

const seneca = require("seneca")();

seneca
    .use('basic')
    .use('entity')
    // .use('seneca-mongo-store', {
    //     uri: URI
    // })
    // .use('mongo-store',{
    //     name: 'test',
    //     host: 'cluster0.2vn9q.mongodb.net/test',
    //     port: 27017,
    //     options: {}
    //   })



seneca.add({ role: "product-store", cmd: "add" }, function (args, respond) {
    var products = seneca.make$("products");
    var product = products.data$({
        name: args.name,
        price: args.price,
        description: args.description
    });
    product.save$(function (err, savedProduct) {

        if (err) return respond(err);

        respond(null, savedProduct );
    });
});

seneca.add({ role: "product-store", cmd: "list" }, function (args, respond) {
    var products = seneca.make$("products"); products.list$({ limit$: 10, skip$: 0 },
        function (err, entity) {
            if (err) return respond(err);
            respond(null, entity);
        })
});

seneca.add({ role: "product-store", cmd: "admin_list" }, function (args, respond) {
    var products = seneca.make$("products"); products.list$({ verified: false }, function (err, entity) {
        if (err) return respond(err);

        respond(null, entity);
    })
});

seneca.add({ role: "product-store", cmd: "verified" }, function (args, respond) {
    var products = seneca.make$("products");
    var data = products.data$({ id: args.id, verified: true }); data.save$(function (err, entity) {
        if (err) return respond(error);

        respond(null, { value: true });
    });
});

seneca.add({ role: "product-store", cmd: "delete" }, function (args, respond) {
    var products = seneca.make$("products"); products.remove$({ id: args.id }); respond(null, { value: true });
});

seneca.listen({ port: "5020", pin: { role: "product-store" } });

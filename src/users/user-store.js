const seneca = require("seneca")();

seneca
    .use('basic')
    .use('entity');

seneca.add({ role: "user-store", cmd: "add" }, function (args, respond) {
    var users = seneca.make$("users");
    var data = users.data$({
        name: args.name,
        email: args.email,
        empId: args.description,
        emailVerified: true
    });
    data.save$(function (err, entity) {

        if (err) return respond(err);

        respond(null, { value: true });
    });
});

seneca.add({ role: "user-store", cmd: "list" }, function (args, respond) {
    var users = seneca.make$("users"); users.list$({ emailVerified: true, limit$: 21, skip$: args.skip },
        function (err, entity) {
            if (err) return respond(err);

            respond(null, entity);
        })
});

seneca.add({ role: "user-store", cmd: "admin_list" }, function (args, respond) {
    var users = seneca.make$("users"); users.list$({ emailVerified: false }, function (err, entity) {
        if (err) return respond(err);

        respond(null, entity);
    })
});

seneca.add({ role: "user-store", cmd: "verified" }, function (args, respond) {
    var users = seneca.make$("users");
    var data = users.data$({ id: args.id, verified: true }); data.save$(function (err, entity) {
        if (err) return respond(error);

        respond(null, { value: true });
    });
});

seneca.add({ role: "user-store", cmd: "delete" }, function (args, respond) {
    var users = seneca.make$("users"); users.remove$({ id: args.id }); respond(null, { value: true });
});

seneca.listen({ port: "5010", pin: { role: "user-store" } });

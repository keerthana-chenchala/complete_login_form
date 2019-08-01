var hapi = require('hapi');
var mysql = require('mysql');
// var jwt = require('jsonwebtoken');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'forms'
  }
});
var server = new hapi.Server({
  host: 'localhost',
  port: 7000,
  routes: {
    cors: true
  },
});

server.route({
  method: 'GET',
  path: '/list',
  handler: async (request, reply) => {
    await knex.raw(`select *,date_format(Date_of_Birth, '%Y-%m-%d') as Date_of_Birth from users`)
      .then(data => {
        reply = 
          data
      })
    return reply;
  }
});


server.route({
  method: 'POST',
  path: '/add',
  handler: async (request, reply) => {
    let item = request.payload;
    await knex.raw(`insert into users (Name,Date_of_Birth,eMail,Contact,About_You,State,Gender,Password) values('${item.name}','${item.dob}','${item.email}','${item.num}','${item.abtu}','${item.states}','${item.gender}','${item.password}')`)
      .then(data => {
        reply = 
          data
      })
    return reply;
  }
});

server.route({
  method: 'POST',
  path: "/edit/{id}",
  handler: async (request, reply) => {
    let item = request.payload;
    var id=request.params.id;
    await knex.raw(`UPDATE users SET Name ='${item.name}', Date_of_Birth ='${item.dob}', eMail = '${item.email}',Contact='${item.num}',About_You='${item.abtu}',State='${item.states}',Gender='${item.gender}' WHERE Id ='${id}'`)
      .then(data => {
      
        reply = 
          data
      })
    return reply;
  }
});


server.route({
  method: 'POST',
  path:"/delete",
  handler: async (request, reply) => {
    let id = request.payload;
    await knex.raw(`DELETE FROM users WHERE Id=${id}`)
      .then(data => {
        reply = 
          data
      })
    return reply;
  }
});



server.start((err) => {
  if (err) throw err;

})

console.log("Server is started")

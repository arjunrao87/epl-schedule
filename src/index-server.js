const fastify = require('fastify')();
const fetchScheduleForTeamAndDuration = require('./request').fetchScheduleForTeamAndDuration;
const moment = require('moment-timezone');
const GENERAL_DATE_FORMAT = 'DDMMMYYYY';

//////////////////////////// SERVER EXECUTION /////////////////////////

// Declare a route
fastify.get('/', function (request, reply) {
    const team = request.query.team;
    let startDate = request.query.startDate;
    let endDate = request.query.endDate;
    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    startDate = startDate ? startDate : moment(new Date(y, m, 1)).format(GENERAL_DATE_FORMAT);
    endDate = endDate ? endDate :  moment(new Date(y, m + 1, 0)).format(GENERAL_DATE_FORMAT);
    const data = fetchScheduleForTeamAndDuration(team, startDate, endDate)
                .then(function (response) {
                    reply.send(response)            
                }).catch(error => {
                    reply.send(error);
                });    
});

// Run the server!
fastify.listen(process.env.PORT || 3000, '0.0.0.0', function (err) {
    if (err) throw err
    console.log(`Server listening on ${fastify.server.address().port}`)
});

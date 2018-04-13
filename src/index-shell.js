const moment = require('moment-timezone');
const fetchScheduleForTeamAndDuration = require('./request').fetchScheduleForTeamAndDuration;

const GENERAL_DATE_FORMAT = 'DDMMMYYYY';
const args = process.argv.slice(2);

//////////////////////////// SHELL EXECUTION /////////////////////////

if( args[0] && args[1] && args[2] ){
    fetchScheduleForTeamAndDuration(args[0], args[1], args[2]);
}
else if( args[0] && args[1] && !args[2] ){
    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    const lastDay = moment(new Date(y, m + 1, 0)).format(GENERAL_DATE_FORMAT);
    fetchScheduleForTeamAndDuration(args[0], args[1], lastDay);
}
else if( args[0] && !args[1] && !args[2] ){
    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    const firstDay = moment(new Date(y, m, 1)).format(GENERAL_DATE_FORMAT);
    const lastDay = moment(new Date(y, m + 1, 0)).format(GENERAL_DATE_FORMAT);
    fetchScheduleForTeamAndDuration(args[0], firstDay, lastDay);
}
else{
    console.log( "Invalid Inputs! Check README for valid usage" );
}

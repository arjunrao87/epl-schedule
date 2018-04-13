require('dotenv').config()
const email = require('./email').email;
const moment = require('moment-timezone');
const axios = require('axios');
const Table = require('easy-table')

const BRITISH_DATE_FORMAT = 'DD.MM.YYYY';
const AMERICAN_DATE_FORMAT = 'MM.DD.YYYY';
const GENERAL_DATE_FORMAT = 'DDMMMYYYY';
const OAUTH_KEY = process.env.OAUTH_KEY;
const BASE_SLUG = `http://api.football-api.com/2.0/`;
const args = process.argv.slice(2);

const createTable = (matches,startDate,endDate) => {
    if(!matches){
        console.log("No matches found for team/duration!");
        return;
    }
    const t = new Table        
    matches.map( match => {
        moment.tz.setDefault("Europe/London");        
        const newYork = moment(`${match.formatted_date} ${match.time}`, `${BRITISH_DATE_FORMAT} HH:mm` ).tz( "America/New_York" );
        t.cell('Home Team', match.localteam_name)
        t.cell('Opponent', match.visitorteam_name)
        t.cell('Date', moment(match.formatted_date, BRITISH_DATE_FORMAT).format(AMERICAN_DATE_FORMAT));
        t.cell('Match Time ( England )', match.time)
        t.cell('Match Time ( EST )', newYork.format("HH:mm"))
        t.cell('Day', moment(`${match.formatted_date}`, BRITISH_DATE_FORMAT).format('dddd'));        
        t.newRow()
    });
    console.log(t.toString());
    if( process.env.EMAIL_ENABLED ){
        email(t.toString(), `[${startDate} - ${endDate}]`);
    }
}

const fetchResponse = (url, startDate, endDate) => {
    axios({
        method: 'get',
        url: url,
    }).then(function (response) {
        createTable( response.data, startDate, endDate );
    }).catch(error => {
        throw error;
    });
}

const fetchScheduleForTeamAndDuration = (teamID, startDate, endDate) => {

    const requestStartDate = moment(startDate, GENERAL_DATE_FORMAT).format(BRITISH_DATE_FORMAT);
    const requestEndDate = moment(endDate, GENERAL_DATE_FORMAT).format(BRITISH_DATE_FORMAT);
    const matchScheduleAPI = `matches?team_id=${teamID}&from_date=${requestStartDate}&to_date=${requestEndDate}&Authorization=${OAUTH_KEY}`;
    const url = `${BASE_SLUG}${matchScheduleAPI}`;
    fetchResponse(url, startDate, endDate);
}

//////////////////////////// MAIN /////////////////////////


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

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
    const data = t.toString();
    console.log(data);
    if( process.env.EMAIL_ENABLED ){
        email(data, `[${startDate} - ${endDate}]`);
    }
    return data;
}

const fetchResponse = (url, startDate, endDate) => {
    return axios({
        method: 'get',
        url: url,
    }).then(function (response) {
        return createTable( response.data, startDate, endDate );
    }).catch(error => {
        throw error;
    });
}

const fetchScheduleForTeamAndDuration = (teamID, startDate, endDate) => {
    const requestStartDate = moment(startDate, GENERAL_DATE_FORMAT).format(BRITISH_DATE_FORMAT);
    const requestEndDate = moment(endDate, GENERAL_DATE_FORMAT).format(BRITISH_DATE_FORMAT);
    const matchScheduleAPI = `matches?team_id=${teamID}&from_date=${requestStartDate}&to_date=${requestEndDate}&Authorization=${OAUTH_KEY}`;
    const url = `${BASE_SLUG}${matchScheduleAPI}`;
    return new Promise(function(resolve, reject) {
        const data = fetchResponse(url, startDate, endDate)
        .then(function (response) {
            return resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}

module.exports = {
    fetchScheduleForTeamAndDuration,
}
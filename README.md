# EPL Schedule

Prints out the EPL schedule for the current month with some East Coast specific details

| Team        | Opponent           | Date  | Local Time  | EST | Day |
| :-------------: |:-------------:| :-----:|:-----:|:-----:|:-----:|
| Manchester United     | Manchester City | 07.04.2018 |16:30|11:30| Saturday
| Manchester United     | West Brom | 15.04.2018 |15:00|10:00| Sunday
| Manchester United     | Arsenal      |    29.04.2018 |15:30|10:30| Sunday


# Usage 

```
node index.js <team-id> <schedule-start-date> <schedule-end-date>
```

- For team-id, refer to team-ids.js
- Start date and end date formats are DDMMMYYYY ( e.g. 23APR2018 ) 

e.g. 
```
node index.js 9260 01APR2018 30APR2018
```

## Note
This program uses an API given by ```https://football-api.com/```. If you wish to clone the project and work on it, make sure to set the env var OAUTH_KEY with the token provided by the API website.

# Motivation 🏅

Ever since I moved to the US, I have been unable to keep track of the English Premier League which is something I used to watch a lot back home. This is v1 of trying to keep me abreast of the EPL schedule for my team ( Manchester United ) ⚽️ 🥅

The goal ( teehee ) of this is not to give me up to the minute scores of games or keep me actively plugged in but to give me an idea of when games take place so I can atleast attempt to watch them.

# Possible Future enhancements

- Have this run periodically and send me updates on a monthly or weekly basis ( emails/sms etc )
- Have this configured for a users team so it can send schedules for their specific team
- Add channels/media to watch the game 
- Reminders to watch the game

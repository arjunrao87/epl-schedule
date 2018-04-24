# EPL Schedule

Prints out the EPL schedule for the current month with some East Coast specific details

| Team        | Opponent           | Date  | Local Time  | EST | Day |
| :-------------: |:-------------:| :-----:|:-----:|:-----:|:-----:|
| Manchester United     | Manchester City | 07.04.2018 |16:30|11:30| Saturday
| Manchester United     | West Brom | 15.04.2018 |15:00|10:00| Sunday
| Manchester United     | Arsenal      |    29.04.2018 |15:30|10:30| Sunday

# Usage 

## As Fastify server

```bash
yarn run prod
```

Server runs at :3000 and can be requested with a GET request 

```
http://localhost:3000/?team=9260&startDate=23APR2018&endDate=30APR2018
```

## As Node script

```bash
yarn run dev <team-id> <schedule-start-date> <schedule-end-date>
```

- For team-id, refer to team-ids.js ( MANDATORY parameter )
- schedule-start-date format is DDMMMYYYY ( e.g. 23APR2018 ) ( OPTIONAL parameter. Defaults to start date of current month)
- schedule-end-date format is DDMMMYYYY ( e.g. 25APR2018 ) ( OPTIONAL parameter. Defaults to end date of current month)

e.g. 
```
yarn run dev 9260 01APR2018 30APR2018 
yarn run dev 9260
```

# Notifications

## Email

If the environment variable EMAIL_ENABLED=true then email notification with the schedule will be sent to the assigned email address. [Mailgun](https://www.mailgun.com/) is being used to send emails. A few other environment variables need to be set to enable the email functionality to work :

```bash
EMAIL_ENABLED=true
FROM_EMAIL=<sender-email>
TO_EMAIL=<recipient-email>
EMAIL_DOMAIN=<mailgun-provided-email-domain>
MAILGUN_API_KEY=<mailgun-key-after-signing-up-for-account>
```

## Note
This program uses an API given by ```https://football-api.com/```. If you wish to clone the project and work on it, make sure to set the env var OAUTH_KEY with the token provided by the API website.

```bash
OAUTH_KEY=<oauth-key-for-football-api>
```

# Building and Running Docker image

## Build
```
docker build -t <user-id>/epl-schedule .
```

## Run
```
docker run -p 49161:3000 <user-id>/epl-schedule
```

# Motivation 🏅

Ever since I moved to the US, I have been unable to keep track of the English Premier League which is something I used to watch a lot back home. This is v1 of trying to keep me abreast of the EPL schedule for my team ( Manchester United ) ⚽️ 🥅

The goal ( teehee ) of this is not to give me up to the minute scores of games or keep me actively plugged in but to give me an idea of when games take place so I can atleast attempt to watch them.

# Possible Future enhancements

- Have this run periodically and send me updates on a monthly or weekly basis ( emails/sms etc )
- Have this configured for a users team so it can send schedules for their specific team
- Add channels/media to watch the game 
- Reminders to watch the game

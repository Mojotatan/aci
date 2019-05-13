[https://github.com/Mojotatan/aci](https://github.com/Mojotatan/aci)

## Tech Used
* Database is Postgres
* Everything else is Javascript (Node.js)
* DB Definition: Sequelize
* Server: Express (+ Passenger via DreamHost)
* Front End Framework: React-Redux

**Control Flow:**
1. User enters username + password and clicks log in
2. Server checks database and for a successful u/pw match, sends back an access token
3. User receives access token and uses it to make API requests for applications (+buyouts, customers, etc)
4. Server checks token and queries database, sending back applications that match the user's credentials
5. Redux tracks the applications and the access token for as long as the user is logged in
6. React renders different components which allow the user to view and edit applications

**tl;dr**
<p>Database <-> Server API <-> Redux <-> React <-> Rendered HTML</p>


## File Structure

Backend | server/
------- | ---------
Database | server/db/
Server | app.js
API | server/api/

Frontend | browser/
-------- | ----------
Redux Store | browser/store/
React Containers | browser/containers/ <!-- Containers are aware of state -->
React Components | browser/components/ <!-- Components are purely for rendering elements -->

Media | public/
----- | ---------
Styles | public/assets/css/
Images | public/assets/img/


## Installation

**How to set up a dev environment**
1. Get the files <!-- make sure to find or create secrets -->

```
git clone https://github.com/Mojotatan/aci.git
npm install
```

2. Create secret files -- put any plain text in .devCert and the password for the server's email in .devMail

```
touch .devCert
touch .devMail
```

3. Download [postgress.app](https://postgresapp.com/), begin running it on port 5432, and create a database named 'aci'

4. Seed the database

```
npm run seed-dev
```

5. Start the webpack compiler and keep it running in a tab in terminal

```
npm run build-dev
```

6. Start the server!
<!-- The default port is 1337 (localhost:1337) but you can change this in app.js -->
```
npm run start-dev
```


**How to set up on Dreamhost**
1. Install and start PostgresQL

2. Check that Node.js is reasonably up to date

```
node -v
```

3. Get the files -- make sure you download the production branch

```
git clone https://github.com/Mojotatan/aci.git
npm install
```

4. Run webpack to compile bundle.js

```
npm run build
```

5. Configure process.env variables for DATABASE_URL, EMAIL_PW, and CERT

```
export key=value
```

If process.env variables are getting overwritten or otherwise misbehaving, set up hidden files with the secrets as you would in a dev environment.

6. Configure Passenger on cpanel if you haven't already

7. Start Passenger

8. [Follow this tutorial to set up SSL](https://medium.com/@yash.kulshrestha/using-lets-encrypt-with-express-e069c7abe625)
```
//chmod certbot-auto a+x
sudo ./certbot-auto certonly --webroot -w ./public -d myadmindev.xyz
```

9. After you successfully generate web certificates, create symbolic links to them:
```
mkdir .ssl
ln -s /path/to/cert /path/to/web/directory/.ssl/fullchain.pem
ln -s /path/to/key /path/to/web/directory/.ssl/privkey.pem
```

10. Create/edit Passengerfile.json to say:
```
{
  "app_type": "node",
  "startup_file": "app.js",
  "environment": "development",
  "daemonize": true,
  "log_file": "./log",
  "pid_file": "./pid",
  "port": 80,
  "ssl": true,
  "ssl_certificate": "./.ssl/fullchain.pem",
  "ssl_certificate_key": "./.ssl/privkey.pem",
  "ssl_port": 443
}
```

11. TODO: automate certificate renewal
```
certbot-auto renew
```

12. Set up a cron job to automatically backup the database:
```
crontab -e
```
Add the following:
```
01	01	04	*	*	/usr/local/pgsql/bin/pg_dump aci > /home/impact_myadmin/dbackups/$(date +\%Y\%m\%d)
```


**How to update on a Remote Server**
1. Download the updates -- make sure you download the production branch

```
git pull origin production
npm install
```

2. Change dbUrl in server/db/index.js. You may have to manually add the email password as well.
*Addendum* You might have to do this as root b/c of permissions issues.

3. Restart Passenger

```
passenger-config restart-app
```
or
```
rm tmp/restart.txt
touch tmp/restart.txt
```

4. Double check to make sure everything is configured and running correctly.

*cough cough*
```
node -v
```

If you need to restart the Passenger instance (after changing values in Passengerfile.json, for example):
```
kill <pid>
passenger start
```

You can find the pid in the pid file or with
```
ps aux | grep passenger
```


**How to deal with everything shutting down for no reason**

So this happened on Dreamhost before and I don't know why.  Here's how I fixed it.

0. If you for some reason can't log into the postgres user

```
adduser (postgres user)
chown -R (postgres user) /usr/local/pgsql/data/
```

1. Log into postgres user and start database

```
su (postgres user)
/usr/local/pgsql/bin/pg_ctl start -l /path/to/logfile -D /usr/local/pgsql/data/
```

You might have to recreate the impact_myadmin user

```
createuser -h localhost -U postgres
```

2. Create, delete, and recreate the aci database (idk why but I had to do this)

```
psql -h localhost -U postgres
create database aci; drop database aci; create database aci;
```

3. Import the database dump file

```
psql -h localhost -U postgres aci < path/to/file
```

4. Start/Restart Passenger

```
passenger start
```
or
```
passenger-config restart-app
```
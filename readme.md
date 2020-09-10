[https://github.com/Mojotatan/aci](https://github.com/Mojotatan/aci)

## Tech Used
* Database is Postgres
* Everything else is Javascript (Node.js)
* DB Definition: Sequelize
* Server: Express (+ Forever)
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

**How to set up on a Remote Server**
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

6. Install [Forever](https://www.npmjs.com/package/forever) and start a daemon.

7. [Follow this tutorial to set up SSL](https://medium.com/@yash.kulshrestha/using-lets-encrypt-with-express-e069c7abe625)
```
//chmod certbot-auto a+x
sudo ./certbot-auto certonly --webroot -w ./public -d maclogin.com
```

8. After you successfully generate web certificates, create symbolic links to them:
```
mkdir .ssl
ln -s /path/to/cert /path/to/web/directory/.ssl/fullchain.pem
ln -s /path/to/key /path/to/web/directory/.ssl/privkey.pem
```

9. TODO: automate certificate renewal
```
certbot-auto renew
```

10. Set up a cron job to automatically backup the database:
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

3. Restart Forever

```
forever restartall
```

**How to make changes to the database while live**
1. Export the database into a dump file.

```
pg_dump aci > path/to/file
```

2. Edit the database schema in the dump file to match the new changes.

3. Wipe the database.

```
psql -h localhost -U postgres
drop database aci; create database aci;
```

4. Import the dump file into the database.

```
psql -h localhost -U postgres aci < path/to/file
```
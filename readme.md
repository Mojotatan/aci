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

2. Create secret files

```
touch .devCert
touch .devMail
```

Put any plain text in .devCert and the password for the server's email in .devMail

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

3. Get the files

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

6. Configure Passenger on cpanel if you haven't already

7. Start Passenger
Database is Postgres.
Everything else is Javascript (Node.js).
DB Definition: Sequelize
Server: Express (+ Passenger via DreamHost)
Front End Framework: React-Redux

Sample Control Flow:
User enters username + password and clicks log in
Server checks database and for a successful u/pw match, sends back an access token
User receives access token and uses it to make API requests for applications (+buyouts, customers, etc)
Server checks token and queries database, sending back applications that match User's credentials
Redux tracks the applications and the access token for as long as User is logged in
React renders different components which allow User to view and edit applications

tl;dr
>|             <- Backend | Frontend ->                      |
>Database <-> Server API <-> Redux <-> React <-> Rendered HTML



File Structure

-------- | --------
~Backend~ | ./server/
Database | ./server/db/
Server | app.js
API | ./server/api/

~Media~ ./public/
Styles ./public/assets/css/
Images ./public/assets/img/

~Frontend~ ./browser/
Redux Store ./browser/store/
React Containers ./browser/containers/ <!-- Containers are aware of state -->
React Components ./browser/components/ <!-- Components are purely for rendering elements -->


How to set up a dev environment
> git clone https://github.com/Mojotatan/aci.git <!-- make sure to find or create secrets -->
> npm install
<!-- make sure to create a database named 'aci' in postgress.app -->
> npm run seed-dev
> npm run build-dev <!-- keep this running in another tab in terminal -->
> npm run start-dev <!-- default port is 1337; go to localhost:1337 -->


How to set up on a dreamhost
Install PostgresQL <!-- make sure to actually start it, too -->
Check that Node.js is reasonably up to date <!-- this app was built in v7.8.0 -->
> git clone https://github.com/Mojotatan/aci.git <!-- make sure to find or create secrets -->
> npm install
> npm run build
Configure Passenger on cpanel if you haven't already
Start Passenger
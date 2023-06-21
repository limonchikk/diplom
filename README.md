Cервис для подачи документов для иностранных граждан

Backend (node 16):

- npm ci
- docker-compose up -d --build postgres
- npm run migration:run
- npm run start

Frontend:

- npm i
- npm run start

Api url: ./src/constants.js

Endpoints (./src/app/routes.js):

- /
- /login
- /admin-panel

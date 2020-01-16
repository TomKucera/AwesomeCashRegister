Zdroje:
- https://medium.com/free-code-camp/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c
- https://www.freecodecamp.org/news/create-a-fullstack-react-express-mongodb-app-using-docker-c3e3e21c4074/

----------------------------
MySql: lokální
----------------------------
- root password: ToKu2043
- 'sa' password: ToKu2043
- 'CashRegister' password: CR01
- windows service name: MySQL80

//"start": "node ./bin/www"

Knex:
- https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261
- knex migrate:make create_users_table
- knex migrate:latest

Node.js upgrade: stáhnout a nainstalovat nový Node.js ... https://nodejs.org/en/download/releases/

------------------------------------------------------------------------------------------
Vytvoření šablony FE aplikace s TypeScriptem: yarn create react-app my-app --template typescript [https://create-react-app.dev/docs/adding-typescript/]
------------------------------------------------------------------------------------------
yarn add react-router-dom @types/react-router-dom   [přidání typů pro 'react-router-dom']
yarn add styled-components @types/styled-components [přidání typů pro 'styled-components']
yarn add redux react-redux @types/react-redux       [přidání typů pro 'react-redux']

yarn add redux-thunk redux-devtools
------------------------------------------------------------------------------------------

TODO: BE - debuging při použití nodemon:
https://medium.com/create-a-server-with-nodemon-express-typescript/create-a-server-with-nodemon-express-typescript-f7c88fb5ee71


NEXT CHALLENGEs:
- specifikovat ve SWAGGERu primitivní API (stačí pro entitu 'Customer')
- vygenerovat ze SWAGGERu a zaimplementovat jej do API (serverové) části
- otestovat funkčnost (PostMan + FE)
- nasadit aplikaci (AWS/Azure)
- zkusit implementovat API v GoLang (dát do nové části 'API_GO')
- zahrnout testy do API i Clienta (Jest, Cypress, ... ?)

Path aliases nastavit v ts.config: 
"paths": {
      //"@app-model-types": ["src/model/types"],
      "@model/*": ["src/model/*"]
    },

Zasílání emailů z BE:
- npm install nodemailer
- https://www.w3schools.com/nodejs/nodejs_email.asp

# Electron Module
The electron module is the wrapper for the webapp for cross-platform support.

## Getting Started
Once the repository is downloaded run `npm install`. If there are errors installing
node modules verify you are using the correct version of NodeJS in the `package.json`.

Now build the webapp module (see it's readme) and copy the `example.env` file from 
the electron module and name it `.env`. Set the `WEBAPP_INDEX` value to your 
webpack build index file: `dist/indext.html`. Your `.env` should look something 
like this:

```
WEBAPP_INDEX=[path_to_repo]/BattleCry/webapp/dist/index.html
```

Now run the electron npm script `npm run dev` to start the electron application. Every
change to the webapp or electron application will require the corresponding project
to be rebuilt.
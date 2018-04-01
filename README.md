# Simple Chat Client

Example application implementing [Simple Chat Client Core](https://github.com/zbicin/simple-chat-client-core).

## How to use?

Clone the repo and install dependencies:
```
git clone git@github.com:zbicin/simple-chat-client.git
cd simple-chat-client
npm install
```

...and run the client:
```
npm start
```

By default the app runs on port 3000. If you wish to change it, use either the `--port` argument: 

```
npm start -- --port 1234
```

or `SIMPLE_CHAT_CLIENT_PORT` environmental variable:

```
export SIMPLE_CHAT_CLIENT_PORT=1234
npm start
```

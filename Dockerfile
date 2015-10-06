FROM hypriot/rpi-iojs:latest

RUN npm install node-tweet-stream

WORKDIR /app
COPY src/ ./

CMD ["node", "app.js"]

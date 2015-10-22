FROM hypriot/rpi-iojs:latest

RUN sudo echo "Europe/London" > /etc/timezone
RUN sudo dpkg-reconfigure -f noninteractive tzdata

RUN npm install node-tweet-stream

WORKDIR /app
COPY src/ ./

CMD ["node", "app.js"]

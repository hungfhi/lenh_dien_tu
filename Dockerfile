FROM node:16.20.0
WORKDIR /home/node/dev.lenhdientu.com
#RUN  apk add vim
#RUN  apk add git
#RUN  npm install -g yarn
COPY . .
RUN yarn install
RUN yarn build
RUN chown -R node:node .
USER node
RUN rm -rf .git/
EXPOSE 3001
CMD ["npm", "start"]

FROM node:14-alpine

WORKDIR /usr/src/app
 
COPY package*.json ./
COPY .babelrc ./

RUN npm install

COPY . .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; \
        then npm run build; \
        fi
 
ENV PORT 3050
EXPOSE $PORT

CMD ["node", "dist/index.js"]

FROM node

WORKDIR /build

COPY package.json /build

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
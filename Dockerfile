# make a file called Docker 
FROM node:16-alpine

# sets a folder
RUN mkdir -p /frontend

# sets working directory
WORKDIR /frontend

# copy the package
COPY package*.json ./

# runs npm install
RUN npm install

COPY . .

# exposes port 3000
EXPOSE 3000

# runs the comand npm start
CMD npm run dev




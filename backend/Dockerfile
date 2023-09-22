# Koristi zvanični Node.js Docker image kao osnovu
FROM node:16

# Postavi radni direktorijum u kontejneru
WORKDIR /app

# Kopiraj package.json i package-lock.json i instaliraj zavisnosti
COPY package*.json ./
RUN npm install

# Kopiraj sve preostale fajlove iz projekta u kontejner
COPY . .

# Izloži port na kojem aplikacija radi (promenite na odgovarajući port ako je potrebno)
EXPOSE 3000

# Komanda za pokretanje aplikacije
CMD ["npm", "run", "start:dev"]

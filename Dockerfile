# Utiliser une image Node.js pour exécuter l'application
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Exposer le port
EXPOSE 5000

# Lancer l'application
CMD ["npm", "start"]

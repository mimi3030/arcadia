# Comment déployer ce projet en local avec la base de données déployée sur neon.tech

1. Avoir Node.js installé sur votre machine
2. Avoir npm installé sur votre machine
3. Cloner le projet sur votre machine
4. Installer les dépendances avec la commande `npm install`
5. Récuperer le fichier `.env` et le placer à la racine du projet
6. Lancer la commande `npx prisma generate` pour générer les fichiers nécessaires à l'ORM
7. Lancer le serveur de développement avec la commande `npm run dev`
8. Le serveur est accessible à l'adresse `http://localhost:3000`

# Comment déployer ce projet en local avec la base de données locale

1. Avoir Node.js installé sur votre machine
2. Avoir npm installé sur votre machine
3. Cloner le projet sur votre machine
4. Installer les dépendances avec la commande `npm install`
5. Récuperer le fichier `.env` et le placer à la racine du projet
6. Modifier le fichier `.env` pour utiliser une base de données locale (DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database])
7. Lancer la commande `npx prisma generate` pour générer les fichiers nécessaires à l'ORM
8. Lancer la commande `npm run update-db` pour créer les tables dans la base de données
9. Lancer le serveur de développement avec la commande `npm run dev`
10. Le serveur est accessible à l'adresse `http://localhost:3000`
11. Pour autogenerer des données dans la base de données, rendez-vous sur la page `http://localhost:3000/api/seed`
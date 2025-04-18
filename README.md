# Comment compiler et exécuter ce calendrier en local

0. Vous devez disposer de NPM et de Node.JS pour exécuter vos commandes. Voir: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
1. Commencer par cloner le code source à l'adresse suivante: https://github.com/legrandBenjo/nufi-calendar-pdf-generator.git
2. Exécuter ensuite le script suivant à la racine du projet pour installer toutes les dépendances nécessaires:

## Installation des dépendances présentes dans le fichier package.json

In the project directory, you can run:

### `npm install`

3. Si vous n'avez pas d'erreur, alors vous pouvez lancer le projet avec la commande suivante:

### `npm start`

Voilà, votre projet est prêt et vous pouvez y accéder à l'adresse suivante:
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Comment ajouter une nouvelle langue dans la liste (exemple: Duala, Bassa, Medumba etc..)

Imaginons que vous souhaitez ajouter une nouvelle langue dans la drop-down list pour obtenir son calendrier sous format PDF.
Vous devez d'abord avoir ce calendrier en CSV pour pouvoir l'importer dans l'application.

## Obtenir le calendrier en CSV

Clonez le projet suivant: https://github.com/tchamna/Bamileke/blob/main/CalendrierBamilekeCalendarNufi.ipynb

Modifiez et adaptez-le pour pouvoir produire en sortie le calendrier en langue choisie sous format CSV.

**Note: N'hésitez pas à contacter Resulam pour du support à l'adresse suivante: contact@resulam.com**


## Obtenir le calendrier en PDF

Une fois que vous avez un calendrier sous format CSV, vous pouvez maintenant utiliser ce projet calendargenerator pour l'obtenir sous format PDF.
Pour celà, repartir du point 1 ci-dessus et adapter le code en conséquence.
Le fichier comportant le calendrier en CSV doit être présent dans le dossier public/data.

**Note: N'hésitez pas à contacter Resulam pour du support à l'adresse suivante: contact@resulam.com**
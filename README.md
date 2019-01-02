# brag

> A tool for biomedical ranking

## Avant de commencer :

Cloner le [serveur BRAG](https://github.com/lydianish/brag-gs.git) et le faire tourner localement.

## Pour installer :

```bash
# faire une copie locale du répertoire 
git clone https://github.com/lydianish/brag.git

# se placer dans le répertoire du projet 
cd brag

# installer les dépendances NodeJs du projet 
npm install
```
## Pour lancer l'appli en local :

```bash
# faire tourner l'appli sur localhost:8080 (développement)
npm run dev

# créer l'application (production)
npm run build

# faire tourner l'appli sur localhost:8080 (production)
npm run start
```

## Pour tester l'appli en local :

```bash
# lancer tous les tests unitaires
npm run test

# lancer un fichier de tests unitaires
npm run ava tests/example.js
```
## Pour mettre à jour la documentation :

```bash
# générer la documentation (dans le répertoire jsdoc)
# ouvrir le fichier index.html dans un navigateur pour la visualiser
npm run jsdoc
```

## Pour mettre à jour la liste des journaux :

1. Mettre la nouvelle liste de journaux dans un fichier CSV 

2. Modifier le script `src/utils/parsecsv.js` :

- Changer la déclaration du chemin du fichier CSV :
```js
const IMPACT_FACTOR_CSV_FILE_PATH = 'chemin/vers/nouveau/fichier.csv';
```
- Vérifier que les colonnes à extraire et le délimiteur utilisé dans le nouveau fichier CSV :
```js
// en-têtes du fichier de départ : Rank, Title, Total Cites, Impact Factor, Eigenfactor Score
.fromPath(filepath, {headers : [ ,"Title", ,"ImpactFactor", ,], delimiter: ';'})
```
3. Lancer le script :
```bash
node src/utils/parsecsv.js > src/assets/journals.js
# ne pas changer l'emplacement du fichier de sortie (src/assets/journals.js)
```


/**
 * @fileOverview Définition des méthodes utilisées pour trier la liste d'articles.
*/

/**
 * trie les articles du paramètre articles en fonction du paramètre sortBy
 * @param {Array} articles la liste d'articles
 * @param {Object} sortBy objet décrivant l'attribut et l'ordre selon lequel trier
 * @returns {Array} la liste triée
 * @example const sortedArticles = sortArticles (articles, {field: 'title', descending: 'true'});
*/
export function sortArticles (articles, sortBy) {
    const f = sortBy.field;
    const d = sortBy.descending;
    const a = [...articles];
    switch (f) {
        case 'title': 
            return d ? a.sort(compareTitle).reverse() : a.sort(compareTitle);
        case 'authors[0].lastName': 
            return d ? a.sort(compareAuthor).reverse() : a.sort(compareAuthor);
        case 'journal.title': 
            return d ? a.sort(compareJournal).reverse() : a.sort(compareJournal);
        case 'journal.impactFactor': 
            return d ? a.sort(compareIF).reverse() : a.sort(compareIF);
        case 'journal.year': 
            return d ? a.sort(compareYear).reverse() : a.sort(compareYear);
        case 'citationCount': 
            return d ? a.sort(compareCites).reverse() : a.sort(compareCites);
        default: 
            return a;
    }
}

function compareTitle (a, b) {
    const valA = a['title'] || '';
    const valB = b['title'] || '';
    return compareStrings(valA, valB);
}

function compareAuthor (a, b) {
    const valA = a['authors'][0]['lastName'] || '';
    const valB = b['authors'][0]['lastName'] || '';
    return compareStrings(valA, valB);
}

function compareJournal (a, b) {
    const valA = a['journal']['title'] || '';
    const valB = b['journal']['title'] || '';
    return compareStrings(valA, valB);
}

function compareIF (a, b) {
    const valA = Number(a['journal']['impactFactor'] || 0);
    const valB = Number(b['journal']['impactFactor'] || 0);
    return compareNumbers(valA, valB);
}

function compareYear (a, b) {
    const valA = Number(a['journal']['year'] || 0);
    const valB = Number(b['journal']['year'] || 0);
    return compareNumbers(valA, valB);
}

function compareCites (a, b) {
    const valA = Number(a['citationCount'] || 0);
    const valB = Number(b['citationCount'] || 0);
    return compareNumbers(valA, valB);
}

/**
 * compare deux nombres
 * @param {number} valA le premier nombre
 * @param {number} valB le deuxieme nombre
 * @returns {number} 0 si valA = valB, un nombre négatif si valA < valB, un nombre positif si valA > valB
 */
function compareNumbers (valA, valB) {
    return valA - valB;
}

/**
 * compare deux chaines de caractères selon l'ordre lexicographique en ignorant la casse.
 * @param {string} valA la première chaine de caractères
 * @param {string} valB la deuxième chaine de caractères
 * @returns {number} 0 si valA = valB, un nombre négatif si valA < valB, un nombre positif si valA > valB
 */
function compareStrings (valA, valB) {
    return valA.toLocaleLowerCase().localeCompare(valB.toLocaleLowerCase());
}


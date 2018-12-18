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
    return compareStrings(a, b, 'title');
}

function compareAuthor (a, b) {
    return compareStrings(a, b, 'authors[0].lastName');
}

function compareJournal (a, b) {
    return compareStrings(a, b, 'journal.title');
}

function compareIF (a, b) {
    return compareNumbers(a, b, 'journal.impactFactor');
}

function compareYear (a, b) {
    return compareNumbers(a, b, 'journal.year');
}

function compareCites (a, b) {
    return compareNumbers(a, b, 'citationCount');
}

function compareNumbers (a, b, field) {
    return Number(a[field] || 0) - Number(b[field] || 0);
}

function compareStrings (a, b, field) {
    const valA = a[field] || '';
    const valB = b[field] || '';
    return valA.toLowerCase().localeCompare(valB.toLowerCase());
}


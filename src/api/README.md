## Diagramme des Classes

*Article* : 
```js
{
    title: String,
    journal: Journal,
    pagination: String,
    authors: Array(Author),
    citationCount: Number
}
```
*Journal* :
```js
{
        title: String,
        volume: Number,
        issue: Number,
        year: Number,
        month: Number
}
```
*Author* :
```js
{
    lastName: String,
    foreName: String,
    initials: String,
    affiliation: Array(String)
}
```
*SearchedAuthor* hérite de *Author* et a en plus :
```js
{
    searchTerm: String,
    hIndex: Number,
    publicationCount: Number,
    citationCount: Number,
    articles: Array(Article) // or maybe a Set?
}
```

## Exemple


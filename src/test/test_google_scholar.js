'use strict'
let google = require('node-g-search');
let scholar = require('google-scholar-extended');

var searchTerm = 'sophie limou'

searchAuhtorGS (searchTerm)

/* functions */
async function searchAuhtorGS (searchTerm) {
    try {
        const res1 = await google.search(searchTerm + ' google scholar user profile')
        const res2 = username(searchTerm, res1.data)
        const res3 = await scholar.profile(res2)
        console.log(res3)
    } catch(error) {
        console.log(error);
      }
}

function profileURL (searchTerm, datalist) {
    let namelist = searchTerm.split(/\s+/)
    return datalist.find((element) => {
        return element.title.includes('- Google Scholar Citations') 
            && (namelist.find((name) => {
            return element.title.toLowerCase().includes(name.toLowerCase())
        }))
    })
}

function extractUser (href) {
    return href.split(/=|&/)[1]
}

function username(searchTerm, datalist) {
    let url = profileURL (searchTerm, datalist)
    return extractUser(url.href)
}
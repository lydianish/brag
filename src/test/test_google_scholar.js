'use strict'
let google = require('node-g-search');
let scholar = require('google-scholar-extended');

var searchTerm = 'sophie limou'
 
google.search(searchTerm + ' google scholar user profile')
  .then(res => {
    return username(searchTerm, res.data)
}).then (res => {
    return scholar.profile(res)
}). then(res => { console.log(res.next())})


/*var google = require('google-query');

google.search("sophie limou google scholar user profile",1,function(url_list){
    console.log(url_list);
});*/

function profileURL (searchTerm, datalist) {
    let namelist = searchTerm.split(/\s+/)
    return datalist.find((element) => {
        return element.title.includes('- Google Scholar Citations') 
            && (namelist.find((name) => {
            return element.title.toLowerCase().includes(name.toLowerCase())
        }))
    })
}

function user (href) {
    return href.split(/=|&/)[1]
}

function username(searchTerm, datalist) {
    let url = profileURL (searchTerm, datalist)
    return user(url.href)
}
export default function (searchTerm) {
    return sampleAuthor;
    //throw 'Search function not yet defined!';
}

const sampleAuthor = {
    lastName: 'Limou',
    foreName: 'Sophie',
    initials: 'S',
    affiliation: [
        'Centre de Recherche en Transplantation et Immunologie UMR 1064, INSERM, Université de Nantes, Nantes, France; Institut de Transplantation Urologie Néphrologie (ITUN), CHU Nantes, Nantes, France; Ecole Centrale de Nantes, Nantes, France.'
    ],
    articles: [
        {
            title: 'Genetic screening of male patients with primary hypogammaglobulinemia can guide diagnosis and clinical management.',
            journal: {
                title: 'Human immunology',
                volume: 79,
                issue: 7,
                year: 2018, 
                month: 'Jul',
            },
            pagination: '571-577',
            authors: [
                {
                    lastName: 'Vince',
                    foreName: 'Nicolas',
                    initials: 'N',
                    affiliation: [
                        'EA3963, Université Paris 7 Denis Diderot, Centre Hayem, Hôpital Saint-Louis, 1 Avenue Claude Vellefaux, 75010 Paris, France; Centre de Recherche en Transplantation et Immunologie UMR 1064, INSERM, Université de Nantes, Nantes, France; Institut de Transplantation Urologie Néphrologie (ITUN), CHU Nantes, Nantes, France. Electronic address: nicolas.vince@univ-nantes.fr.'                    ],
                },
                {
                    lastName: 'Limou',
                    foreName: 'Sophie',
                    initials: 'S',
                    affiliation: [
                        'Centre de Recherche en Transplantation et Immunologie UMR 1064, INSERM, Université de Nantes, Nantes, France; Institut de Transplantation Urologie Néphrologie (ITUN), CHU Nantes, Nantes, France; Ecole Centrale de Nantes, Nantes, France.'
                    ],
                }
            ],
            citationCount: 22
        }

    ],
}
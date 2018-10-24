export default function (searchTerm) {
    return sampleAuthor;
    //throw 'Search function not yet defined!';
}

const sampleAuthor = {
    lastName: 'Limou',
    foreName: 'Sophie',
    initials: 'S',
    affiliation: [
        'Centre de Recherche en Transplantation et Immunologie UMR 1064, INSERM, Université de Nantes, Nantes, France',
        'Institut de Transplantation Urologie Néphrologie (ITUN), CHU Nantes, Nantes, France',
        'Ecole Centrale de Nantes, Nantes, France'
    ],
    articles: [
        {
            title: 'Genetic screening of male patients with primary hypogammaglobulinemia can guide diagnosis and clinical management.',
            journal: {
                title: 'Human immunology',
                volume: 79,
                issue: 7,
                year: 2016, 
                month: 'Jul',
                impactFactor: 1.994
            },
            pagination: '571-577',
            authors: [
                {
                    lastName: 'Vince',
                    foreName: 'Nicolas',
                    initials: 'N',
                    affiliation: [
                        'EA3963, Université Paris 7 Denis Diderot, Centre Hayem, Hôpital Saint-Louis, 1 Avenue Claude Vellefaux, 75010 Paris, France; Centre de Recherche en Transplantation et Immunologie UMR 1064, INSERM, Université de Nantes, Nantes, France; Institut de Transplantation Urologie Néphrologie (ITUN), CHU Nantes, Nantes, France. Electronic address: nicolas.vince@univ-nantes.fr.'
                                        ],
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
            citationCount: 0
        },
        {
            title: 'APOL1 Nephropathy Risk Variants and Incident Cardiovascular Disease Events in Community-Dwelling Black Adults.',
            journal: {
                title: 'Circulation. Genomic and precision medicine',
                volume: 11,
                issue: 6,
                year: 2018, 
                month: 'Jun',
                impactFactor: 18.880
            },
            pagination: 'e002098',
            authors: [
                {
                    lastName: 'Gutiérrez',
                    foreName: 'Orlando M',
                    initials: 'OM',
                    affiliation: [
                        'Department of Medicine, University of Alabama at Birmingham, Birmingham, AL (O.M.G.).'
                    ],
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
            citationCount: 1
        }

    ],
}
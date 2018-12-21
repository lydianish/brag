import test from 'ava';
import { getTitle, transformAuthor, transformArticle } from '../../src/utils/searchAuthor';

test('split PubMed article title', t => {
    const title1 = { 
        i: { _text: 'NPHS2' },
        _text: ' V260E Is a Frequent Cause of Steroid-Resistant Nephrotic Syndrome in Black South African Children.' 
    };
    const title2 = { 
        _text: '23rd Nantes Actualités Transplantation: "Genomics and Immunogenetics of Kidney and Inflammatory Diseases - Lessons for Transplantation".' 
    };
    const title3 = { 
        _text: 'Genetic screening of male patients with primary hypogammaglobulinemia can guide diagnosis and clinical management.' 
    };
    const title4 = { 
        _text: 
            [ 'Renal and Cardiovascular Morbidities Associated with ',
            ' Status among African-American and Non-African-American Children with Focal Segmental Glomerulosclerosis.' ],
       i: { _text: 'APOL1' } 
    };
    
    t.deepEqual(getTitle(title1), 
        [ 'NPHS2',
        '',
        'V260E',
        'Is',
        'a',
        'Frequent',
        'Cause',
        'of',
        'Steroid',
        'Resistant',
        'Nephrotic',
        'Syndrome',
        'in',
        'Black',
        'South',
        'African',
        'Children' ]
    );
    t.deepEqual(getTitle(title2), 
        [ '23rd',
        'Nantes',
        'Actualités',
        'Transplantation',
        '',
        '',
        'Genomics',
        'and',
        'Immunogenetics',
        'of',
        'Kidney',
        'and',
        'Inflammatory',
        'Diseases',
        '',
        '',
        'Lessons',
        'for',
        'Transplantation',
        '' ]
    );
    t.deepEqual(getTitle(title3), 
        [ 'Genetic',
        'screening',
        'of',
        'male',
        'patients',
        'with',
        'primary',
        'hypogammaglobulinemia',
        'can',
        'guide',
        'diagnosis',
        'and',
        'clinical',
        'management' ]
    );
    t.deepEqual(getTitle(title4), 
        [ 'Renal',
        'and',
        'Cardiovascular',
        'Morbidities',
        'Associated',
        'with',
        '',
        '',
        'Status',
        'among',
        'African',
        'American',
        'and',
        'Non',
        'African',
        'American',
        'Children',
        'with',
        'Focal',
        'Segmental',
        'Glomerulosclerosis',
        'APOL1' ]
    );
});

test('transform PubMed author object', t => {
    const author1 = { _attributes: { ValidYN: 'Y' },
        LastName: { _text: 'Asharam' },
        ForeName: { _text: 'Kareshma' },
        Initials: { _text: 'K' },
        AffiliationInfo: { Affiliation: { _text: 'University of KwaZulu-Natal, Durban, South Africa.' } } 
    };
    const author2 = { 
        _attributes: { ValidYN: 'Y' },
        LastName: { _text: 'David' },
        ForeName: { _text: 'Victor A' },
        Initials: { _text: 'VA' },
        AffiliationInfo: 
            { Affiliation: 
                { _text: 'Basic Research Laboratory, Center for Cancer Research, National Cancer Institute, Frederick, Maryland, USA.' } 
            } 
    };

    t.deepEqual(transformAuthor(author1), { lastName: 'Asharam', foreName: 'Kareshma', initials: 'K' });
    t.deepEqual(transformAuthor(author2), { lastName: 'David', foreName: 'Victor A', initials: 'VA' });
});

test('transform PubMed article object', t => {
    const article = { MedlineCitation: 
        { _attributes: { Status: 'MEDLINE', Owner: 'NLM' },
        PMID: { _attributes: { Version: '1' }, _text: '29709555' },
        DateCompleted: 
        { Year: { _text: '2018' },
            Month: { _text: '10' },
            Day: { _text: '11' } },
        DateRevised: 
        { Year: { _text: '2018' },
            Month: { _text: '12' },
            Day: { _text: '02' } },
        Article: 
        { _attributes: { PubModel: 'Print-Electronic' },
            Journal: 
            { ISSN: { _attributes: { IssnType: 'Electronic' }, _text: '1879-1166' },
                JournalIssue: 
                { _attributes: { CitedMedium: 'Internet' },
                Volume: { _text: '79' },
                Issue: { _text: '7' },
                PubDate: { Year: { _text: '2018' }, Month: { _text: 'Jul' } } },
                Title: { _text: 'Human immunology' },
                ISOAbbreviation: { _text: 'Hum. Immunol.' } },
            ArticleTitle: 
            { _text: 'Genetic screening of male patients with primary hypogammaglobulinemia can guide diagnosis and clinical management.' },
            Pagination: { MedlinePgn: { _text: '571-577' } },
            ELocationID: 
            [ { _attributes: { EIdType: 'pii', ValidYN: 'Y' },
                _text: 'S0198-8859(18)30138-1' },
                { _attributes: { EIdType: 'doi', ValidYN: 'Y' },
                _text: '10.1016/j.humimm.2018.04.014' } ],
            Abstract: 
            { AbstractText: 
                { _text: 'The precise diagnosis of an immunodeficiency is sometimes difficult to assess, especially due to the large spectrum of phenotypic variation reported among patients. Common variable immunodeficiency disorders (CVID) do not have, for a large part, an identified genetic cause. The identification of a causal genetic mutation is important to confirm, or in some cases correct, the diagnosis. We screened >150 male patients with hypogammaglobulinemia for mutations in three genes involved in pediatric X-linked primary immunoglobulin deficiency: CD40LG, SH2D1A and BTK. The SH2D1A screening allowed to reclassify two individuals with an initial CVID presentation as XLP after mutations identification. All these mutations were associated with a lack of protein expression. In addition, 4 patients with a primary diagnosis of CVID and one with a primary IgG subclass deficiency were requalified as XLA after identifying BTK mutations. Interestingly, two out of these 5 patients carried a damaging coding BTK mutation associated with a lower, but detectable, BTK expression in monocytes, suggesting that a dysfunctional protein explains the disease phenotype in these patients. In conclusion, our results advocate to include SH2D1A and BTK in newly developed targeted NGS genetic testing, to contribute to providing the most appropriate medical treatment and genetic counselling.' },
                CopyrightInformation: 
                { _text: 'Copyright © 2018 American Society for Histocompatibility and Immunogenetics. Published by Elsevier Inc. All rights reserved.' } },
            AuthorList: 
            { _attributes: { CompleteYN: 'Y' },
                Author: 
                [ { _attributes: { ValidYN: 'Y' },
                    LastName: { _text: 'Vince' },
                    ForeName: { _text: 'Nicolas' },
                    Initials: { _text: 'N' },
                    AffiliationInfo: 
                    { Affiliation: 
                        { _text: 'EA3963, Université Paris 7 Denis Diderot, Centre Hayem, Hôpital Saint-Louis, 1 Avenue Claude Vellefaux, 75010 Paris, France; Centre de Recherche en Transplantation et Immunologie UMR 1064, INSERM, Université de Nantes, Nantes, France; Institut de Transplantation Urologie Néphrologie (ITUN), CHU Nantes, Nantes, France. Electronic address: nicolas.vince@univ-nantes.fr.' } } },
                { _attributes: { ValidYN: 'Y' },
                    LastName: { _text: 'Mouillot' },
                    ForeName: { _text: 'Gaël' },
                    Initials: { _text: 'G' },
                    AffiliationInfo: 
                    { Affiliation: 
                        { _text: 'Laboratoire Central d\'Immunologie Cellulaire et Tissulaire, Hôpital Pitié Salpêtrière et INSERM UMR-S945, Bâtiment CERVI, Paris, France.' } } },
                { _attributes: { ValidYN: 'Y' },
                    LastName: { _text: 'Malphettes' },
                    ForeName: { _text: 'Marion' },
                    Initials: { _text: 'M' },
                    AffiliationInfo: 
                    { Affiliation: 
                        { _text: 'EA3963, Université Paris 7 Denis Diderot, Centre Hayem, Hôpital Saint-Louis, 1 Avenue Claude Vellefaux, 75010 Paris, France; Département d\'Immunologie Clinique, Hôpital Saint-Louis, AP-HP, 1 Avenue Claude Vellefaux, 75010 Paris, France.' } } },
                { _attributes: { ValidYN: 'Y' },
                    LastName: { _text: 'Limou' },
                    ForeName: { _text: 'Sophie' },
                    Initials: { _text: 'S' },
                    AffiliationInfo: 
                    { Affiliation: 
                        { _text: 'Centre de Recherche en Transplantation et Immunologie UMR 1064, INSERM, Université de Nantes, Nantes, France; Institut de Transplantation Urologie Néphrologie (ITUN), CHU Nantes, Nantes, France; Ecole Centrale de Nantes, Nantes, France.' } } },
                { _attributes: { ValidYN: 'Y' },
                    LastName: { _text: 'Boutboul' },
                    ForeName: { _text: 'David' },
                    Initials: { _text: 'D' },
                    AffiliationInfo: 
                    { Affiliation: 
                        { _text: 'EA3963, Université Paris 7 Denis Diderot, Centre Hayem, Hôpital Saint-Louis, 1 Avenue Claude Vellefaux, 75010 Paris, France.' } } },
                { _attributes: { ValidYN: 'Y' },
                    LastName: { _text: 'Guignet' },
                    ForeName: { _text: 'Angélique' },
                    Initials: { _text: 'A' },
                    AffiliationInfo: 
                    { Affiliation: 
                        { _text: 'EA3963, Université Paris 7 Denis Diderot, Centre Hayem, Hôpital Saint-Louis, 1 Avenue Claude Vellefaux, 75010 Paris, France.' } } },
                { _attributes: { ValidYN: 'Y' },
                    LastName: { _text: 'Bertrand' },
                    ForeName: { _text: 'Véronique' },
                    Initials: { _text: 'V' },
                    AffiliationInfo: 
                    { Affiliation: 
                        { _text: 'Laboratoire Central d\'Immunologie Cellulaire et Tissulaire, Hôpital Pitié Salpêtrière et INSERM UMR-S945, Bâtiment CERVI, Paris, France.' } } },
                { _attributes: { ValidYN: 'Y' },
                    LastName: { _text: 'Pellet' },
                    ForeName: { _text: 'Philippe' },
                    Initials: { _text: 'P' },
                    AffiliationInfo: 
                    { Affiliation: 
                        { _text: 'Laboratoire Central d\'Immunologie Cellulaire et Tissulaire, Hôpital Pitié Salpêtrière et INSERM UMR-S945, Bâtiment CERVI, Paris, France.' } } },
                { _attributes: { ValidYN: 'Y' },
                    LastName: { _text: 'Gourraud' },
                    ForeName: { _text: 'Pierre-Antoine' },
                    Initials: { _text: 'PA' },
                    AffiliationInfo: 
                    { Affiliation: 
                        { _text: 'Centre de Recherche en Transplantation et Immunologie UMR 1064, INSERM, Université de Nantes, Nantes, France; Institut de Transplantation Urologie Néphrologie (ITUN), CHU Nantes, Nantes, France.' } } },
                { _attributes: { ValidYN: 'Y' },
                    LastName: { _text: 'Debré' },
                    ForeName: { _text: 'Patrice' },
                    Initials: { _text: 'P' },
                    AffiliationInfo: 
                    { Affiliation: 
                        { _text: 'Laboratoire Central d\'Immunologie Cellulaire et Tissulaire, Hôpital Pitié Salpêtrière et INSERM UMR-S945, Bâtiment CERVI, Paris, France.' } } },
                { _attributes: { ValidYN: 'Y' },
                    LastName: { _text: 'Oksenhendler' },
                    ForeName: { _text: 'Eric' },
                    Initials: { _text: 'E' },
                    AffiliationInfo: 
                    { Affiliation: 
                        { _text: 'Département d\'Immunologie Clinique, Hôpital Saint-Louis, AP-HP, 1 Avenue Claude Vellefaux, 75010 Paris, France.' } } },
                { _attributes: { ValidYN: 'Y' },
                    LastName: { _text: 'Théodorou' },
                    ForeName: { _text: 'Ioannis' },
                    Initials: { _text: 'I' },
                    AffiliationInfo: 
                    { Affiliation: 
                        { _text: 'Laboratoire Central d\'Immunologie Cellulaire et Tissulaire, Hôpital Pitié Salpêtrière et INSERM UMR-S945, Bâtiment CERVI, Paris, France.' } } },
                { _attributes: { ValidYN: 'Y' },
                    LastName: { _text: 'Fieschi' },
                    ForeName: { _text: 'Claire' },
                    Initials: { _text: 'C' },
                    AffiliationInfo: 
                    { Affiliation: 
                        { _text: 'EA3963, Université Paris 7 Denis Diderot, Centre Hayem, Hôpital Saint-Louis, 1 Avenue Claude Vellefaux, 75010 Paris, France; Département d\'Immunologie Clinique, Hôpital Saint-Louis, AP-HP, 1 Avenue Claude Vellefaux, 75010 Paris, France.' } } },
                { _attributes: { ValidYN: 'Y' },
                    CollectiveName: { _text: 'DEFI Study Group' } } ] },
            Language: { _text: 'eng' },
            PublicationTypeList: 
            { PublicationType: { _attributes: { UI: 'D016428' }, _text: 'Journal Article' } },
            ArticleDate: 
            { _attributes: { DateType: 'Electronic' },
                Year: { _text: '2018' },
                Month: { _text: '04' },
                Day: { _text: '27' } } },
        MedlineJournalInfo: 
        { Country: { _text: 'United States' },
            MedlineTA: { _text: 'Hum Immunol' },
            NlmUniqueID: { _text: '8010936' },
            ISSNLinking: { _text: '0198-8859' } },
        ChemicalList: 
        { Chemical: 
            [ { RegistryNumber: { _text: '0' },
                NameOfSubstance: { _attributes: { UI: 'D015415' }, _text: 'Biomarkers' } },
                { RegistryNumber: { _text: '0' },
                NameOfSubstance: 
                { _attributes: { UI: 'C526581' },
                    _text: 'CD40LIg fusion protein' } },
                { RegistryNumber: { _text: '0' },
                NameOfSubstance: 
                { _attributes: { UI: 'D011993' },
                    _text: 'Recombinant Fusion Proteins' } },
                { RegistryNumber: { _text: '0' },
                NameOfSubstance: 
                { _attributes: { UI: 'C114953' },
                    _text: 'SH2D1A protein, human' } },
                { RegistryNumber: { _text: '0' },
                NameOfSubstance: 
                { _attributes: { UI: 'D000071179' },
                    _text: 'Signaling Lymphocytic Activation Molecule Associated Protein' } },
                { RegistryNumber: { _text: 'EC 2.7.10.1' },
                NameOfSubstance: 
                { _attributes: { UI: 'D011505' },
                    _text: 'Protein-Tyrosine Kinases' } },
                { RegistryNumber: { _text: 'EC 2.7.10.2' },
                NameOfSubstance: 
                { _attributes: { UI: 'D000077329' },
                    _text: 'Agammaglobulinaemia Tyrosine Kinase' } },
                { RegistryNumber: { _text: 'EC 2.7.10.2' },
                NameOfSubstance: 
                { _attributes: { UI: 'C000625949' },
                    _text: 'BTK protein, human' } } ] },
        CitationSubset: { _text: 'IM' },
        MeshHeadingList: 
        { MeshHeading: 
            [ { DescriptorName: 
                { _attributes: { UI: 'D000077329', MajorTopicYN: 'N' },
                    _text: 'Agammaglobulinaemia Tyrosine Kinase' } },
                { DescriptorName: 
                { _attributes: { UI: 'D000361', MajorTopicYN: 'N' },
                    _text: 'Agammaglobulinemia' },
                QualifierName: 
                { _attributes: { UI: 'Q000175', MajorTopicYN: 'Y' },
                    _text: 'diagnosis' } },
                { DescriptorName: 
                { _attributes: { UI: 'D015415', MajorTopicYN: 'N' },
                    _text: 'Biomarkers' },
                QualifierName: 
                { _attributes: { UI: 'Q000378', MajorTopicYN: 'N' },
                    _text: 'metabolism' } },
                { DescriptorName: 
                { _attributes: { UI: 'D002675', MajorTopicYN: 'N' },
                    _text: 'Child, Preschool' } },
                { DescriptorName: 
                { _attributes: { UI: 'D004252', MajorTopicYN: 'N' },
                    _text: 'DNA Mutational Analysis' } },
                { DescriptorName: 
                { _attributes: { UI: 'D005817', MajorTopicYN: 'N' },
                    _text: 'Genetic Counseling' } },
                { DescriptorName: 
                { _attributes: { UI: 'D005820', MajorTopicYN: 'N' },
                    _text: 'Genetic Testing' } },
                { DescriptorName: 
                { _attributes: { UI: 'D006801', MajorTopicYN: 'N' },
                    _text: 'Humans' } },
                { DescriptorName: 
                { _attributes: { UI: 'D007223', MajorTopicYN: 'N' },
                    _text: 'Infant' } },
                { DescriptorName: 
                { _attributes: { UI: 'D008297', MajorTopicYN: 'N' },
                    _text: 'Male' } },
                { DescriptorName: 
                { _attributes: { UI: 'D009000', MajorTopicYN: 'N' },
                    _text: 'Monocytes' },
                QualifierName: 
                { _attributes: { UI: 'Q000502', MajorTopicYN: 'Y' },
                    _text: 'physiology' } },
                { DescriptorName: 
                { _attributes: { UI: 'D009154', MajorTopicYN: 'N' },
                    _text: 'Mutation' },
                QualifierName: 
                { _attributes: { UI: 'Q000235', MajorTopicYN: 'N' },
                    _text: 'genetics' } },
                { DescriptorName: 
                { _attributes: { UI: 'D010641', MajorTopicYN: 'N' },
                    _text: 'Phenotype' } },
                { DescriptorName: 
                { _attributes: { UI: 'D011505', MajorTopicYN: 'N' },
                    _text: 'Protein-Tyrosine Kinases' },
                QualifierName: 
                { _attributes: { UI: 'Q000235', MajorTopicYN: 'Y' },
                    _text: 'genetics' } },
                { DescriptorName: 
                { _attributes: { UI: 'D011993', MajorTopicYN: 'N' },
                    _text: 'Recombinant Fusion Proteins' },
                QualifierName: 
                { _attributes: { UI: 'Q000235', MajorTopicYN: 'Y' },
                    _text: 'genetics' } },
                { DescriptorName: 
                { _attributes: { UI: 'D000071179', MajorTopicYN: 'N' },
                    _text: 'Signaling Lymphocytic Activation Molecule Associated Protein' },
                QualifierName: 
                { _attributes: { UI: 'Q000235', MajorTopicYN: 'Y' },
                    _text: 'genetics' } } ] },
        KeywordList: 
        { _attributes: { Owner: 'NOTNLM' },
            Keyword: 
            [ { _attributes: { MajorTopicYN: 'N' }, _text: 'BTK' },
                { _attributes: { MajorTopicYN: 'N' }, _text: 'CD40L' },
                { _attributes: { MajorTopicYN: 'N' }, _text: 'CVID' },
                { _attributes: { MajorTopicYN: 'N' },
                _text: 'Immunodeficiency' },
                { _attributes: { MajorTopicYN: 'N' }, _text: 'SAP' } ] } },
    PubmedData: 
        { History: 
        { PubMedPubDate: 
            [ { _attributes: { PubStatus: 'received' },
                Year: { _text: '2017' },
                Month: { _text: '11' },
                Day: { _text: '14' } },
                { _attributes: { PubStatus: 'revised' },
                Year: { _text: '2018' },
                Month: { _text: '04' },
                Day: { _text: '25' } },
                { _attributes: { PubStatus: 'accepted' },
                Year: { _text: '2018' },
                Month: { _text: '04' },
                Day: { _text: '26' } },
                { _attributes: { PubStatus: 'pubmed' },
                Year: { _text: '2018' },
                Month: { _text: '5' },
                Day: { _text: '2' },
                Hour: { _text: '6' },
                Minute: { _text: '0' } },
                { _attributes: { PubStatus: 'medline' },
                Year: { _text: '2018' },
                Month: { _text: '10' },
                Day: { _text: '12' },
                Hour: { _text: '6' },
                Minute: { _text: '0' } },
                { _attributes: { PubStatus: 'entrez' },
                Year: { _text: '2018' },
                Month: { _text: '5' },
                Day: { _text: '1' },
                Hour: { _text: '6' },
                Minute: { _text: '0' } } ] },
        PublicationStatus: { _text: 'ppublish' },
        ArticleIdList: 
        { ArticleId: 
            [ { _attributes: { IdType: 'pubmed' }, _text: '29709555' },
                { _attributes: { IdType: 'pii' },
                _text: 'S0198-8859(18)30138-1' },
                { _attributes: { IdType: 'doi' },
                _text: '10.1016/j.humimm.2018.04.014' } ] } } 
    };
    t.deepEqual(transformArticle(article), { title: 
        [ 'Genetic',
          'screening',
          'of',
          'male',
          'patients',
          'with',
          'primary',
          'hypogammaglobulinemia',
          'can',
          'guide',
          'diagnosis',
          'and',
          'clinical',
          'management' ],
       journal: 
        { title: 'Human immunology',
          volume: '79',
          issue: '7',
          year: '2018',
          month: 'Jul',
          impactFactor: 1.994 },
       pagination: '571-577',
       authors: 
        [ { lastName: 'Vince', foreName: 'Nicolas', initials: 'N' },
          { lastName: 'Mouillot', foreName: 'Gaël', initials: 'G' },
          { lastName: 'Malphettes', foreName: 'Marion', initials: 'M' },
          { lastName: 'Limou', foreName: 'Sophie', initials: 'S' },
          { lastName: 'Boutboul', foreName: 'David', initials: 'D' },
          { lastName: 'Guignet', foreName: 'Angélique', initials: 'A' },
          { lastName: 'Bertrand', foreName: 'Véronique', initials: 'V' },
          { lastName: 'Pellet', foreName: 'Philippe', initials: 'P' },
          { lastName: 'Gourraud', foreName: 'Pierre-Antoine', initials: 'PA' },
          { lastName: 'Debré', foreName: 'Patrice', initials: 'P' },
          { lastName: 'Oksenhendler', foreName: 'Eric', initials: 'E' },
          { lastName: 'Théodorou', foreName: 'Ioannis', initials: 'I' },
          { lastName: 'Fieschi', foreName: 'Claire', initials: 'C' },
          { lastName: '', foreName: '', initials: '' } ],
       citationCount: '',
       pmid: '29709555' }
    );
});
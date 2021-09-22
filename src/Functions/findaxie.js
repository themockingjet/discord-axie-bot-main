//
//
//
const fetch = require('node-fetch');

async function findCommonAxie(_class = null, _parts = null, _bCount = null, _stats = null) {
        
    let axclasses = (_class != null) ? _class: null;
    let axparts = (_parts != null)  ? _parts: null;
    let axbrdcount = (_bCount != null)  ? _bCount: null;
    let axStats = (_stats != null)  ? _stats : [27,27,27,27];
    
    const query = `query GetAxieLatest(
        $auctionType: AuctionType
        $criteria: AxieSearchCriteria
        $from: Int
        $sort: SortBy
        $size: Int
        $owner: String
      ) {
        axies(
          auctionType: $auctionType
          criteria: $criteria
          from: $from
          sort: $sort
          size: $size
          owner: $owner
        ) {
          total
          results {
            ...AxieRowData
            __typename
          }
          __typename
        }
      }
      
      fragment AxieRowData on Axie {
        id
        image
        class
        name
        genes
        owner
        class
        stage
        title
        breedCount
        level
        parts {
          ...AxiePart
          __typename
        }
        stats {
          ...AxieStats
          __typename
        }
        auction {
          ...AxieAuction
          __typename
        }
        __typename
      }
      
      fragment AxiePart on AxiePart {
        id
        name
        class
        type
        specialGenes
        stage
        abilities {
          ...AxieCardAbility
          __typename
        }
        __typename
      }
      
      fragment AxieCardAbility on AxieCardAbility {
        id
        name
        attack
        defense
        energy
        description
        backgroundUrl
        effectIconUrl
        __typename
      }
      
      fragment AxieStats on AxieStats {
        hp
        speed
        skill
        morale
        __typename
      }
      
      fragment AxieAuction on Auction {
        startingPrice
        endingPrice
        startingTimestamp
        endingTimestamp
        duration
        timeLeft
        currentPrice
        currentPriceUSD
        suggestedPrice
        seller
        listingIndex
        state
        __typename
    }`;

    const axGraph = await fetch('https://axieinfinity.com/graphql-server-v2/graphql', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                },
                                body: JSON.stringify({
                                    "operationName": "GetAxieLatest",
                                    "variables": {
                                        "from": 0,
                                        "size": 1,
                                        "sort": "PriceAsc",
                                        "auctionType": "Sale",
                                        "criteria": {
                                            hp: [axStats[0] , 61],
                                            morale: [axStats[1] , 61],
                                            speed: [axStats[2] , 61],
                                            skill: [axStats[3] , 61],
                                            breedCount: axbrdcount,
                                            parts: axparts,
                                            classes: axclasses
                                        }
                                    },
                                    query
                                })
                            })
                            .then(r => r.json());

    return axGraph;
}

module.exports = {findCommonAxie};
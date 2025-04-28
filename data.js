/**
 * DATABOUNTY Competition Leaderboard Data
 * Contains team information and scores for AI and security categories
 * 
 * Fields:
 * - id: Unique identifier for the team
 * - name: Team name
 * - aiScore: Score in the AI category
 * - securityScore: Score in the security category
 * - finalScore: Combined weighted score (AI * 0.65 + Security * 0.35)
 */
const teamsData = [
    {
        id: "l8b7p3dc146619f",
        name: "5srna",
        aiScore: 18.896,
        securityScore: 40,
        finalScore: (18.896 * 0.65) + (40 * 0.35)
    },
    {
        id: "bxkh1x8m3u176tr",
        name: "Data Saiyans",
        aiScore: 76.825,
        securityScore: 40,
        finalScore: (76.825 * 0.65) + (40 * 0.35)
    },
    {
        id: "15sq6m50b2ul219",
        name: "Sh5mo",
        aiScore: 45.828,
        securityScore: 40,
        finalScore: (45.828 * 0.65) + (40 * 0.35)
    },
    {
        id: "tbe3j67kac28b12",
        name: "0-Dai",
        aiScore: 28.966,
        securityScore: 30,
        finalScore: (28.966 * 0.65) + (30 * 0.35)
    },
    {
        id: "754k826870v18og",
        name: "mohajimoun",
        aiScore: 42.575,
        securityScore: 20,
        finalScore: (42.575 * 0.65) + (20 * 0.35)
    },
    {
        id: "5943u65x5sy759z",
        name: "AM1N3S",
        aiScore: 59.817,
        securityScore: 20,
        finalScore: (59.817 * 0.65) + (20 * 0.35)
    },
    {
        id: "t17uq3086g8pp1u",
        name: "Red Cat",
        aiScore: 91.249,
        securityScore: 20,
        finalScore: (91.249 * 0.65) + (20 * 0.35)
    },
    {
        id: "j3ls1r88tow59b5",
        name: "Sqrt(9)",
        aiScore: 29.444,
        securityScore: 20,
        finalScore: (29.444 * 0.65) + (20 * 0.35)
    },
    {
        id: "ut349167t38t866",
        name: "Anonymous",
        aiScore: 54.377,
        securityScore: 20,
        finalScore: (54.377 * 0.65) + (20 * 0.35)
    },
    {
        id: "507x4933ln818t5",
        name: "DeepSecure",
        aiScore: 27.189,
        securityScore: 20,
        finalScore: (27.189 * 0.65) + (20 * 0.35)
    },
    {
        id: "30658q587l3k0u5",
        name: "Hashiras",
        aiScore: 50.988,
        securityScore: 20,
        finalScore: (50.988 * 0.65) + (20 * 0.35)
    },
    {
        id: "w3ncb9h6q9d72x7",
        name: "Awsoms",
        aiScore: 54.581,
        securityScore: 20,
        finalScore: (54.581 * 0.65) + (20 * 0.35)
    },
    {
        id: "39cjm55f38m24p4",
        name: "Zero-Day Bounty",
        aiScore: 17.883,
        securityScore: 20,
        finalScore: (17.883 * 0.65) + (20 * 0.35)
    },
    {
        id: "3gi982nwys22n97",
        name: "khar9ana",
        aiScore: 0,
        securityScore: 10,
        finalScore: (0 * 0.65) + (10 * 0.35)
    },
    {
        id: "brooties",
        name: "Brooties",
        aiScore: 88.654,
        securityScore: 15*0.35,
        finalScore: (88.654 * 0.65) + (15 * 0.35)
    },
    {
        id: "soissontdis",
        name: "SOISSONT'DIS",
        aiScore: 62.822,
        securityScore: 15,
        finalScore: (62.822 * 0.65) + (15 * 0.35)
    },
    {
        id: "elmadanis",
        name: "El Madanis",
        aiScore: 24.862,
        securityScore: 0,
        finalScore: (24.862 * 0.65) + (0 * 0.35)
    }
]; 

// Calculate and round the final scores for better display
teamsData.forEach(team => {
    team.finalScore = parseFloat(team.finalScore.toFixed(2));
}); 
let games = [
    {
        id: '1',
        title: "Mario",
        paltform: ['Switch']
    },
    {
        id: '2',
        title: "Pokemon",
        paltform: ['PSS','Xbox']
    },
    {
        id: '3',
        title: "Contra",
        paltform: ['PC']
    },
    {
        id: '4',
        title: "Elden",
        paltform: ['Xbox','PC']
    },
]

let authors = [
    {
        id: '1',
        name: "mario",
        verified: true
    },
    {
        id: '2',
        name: "yoshi",
        verified: false
    },
    {
        id: '3',
        name: "Peach",
        verified: true
    },
]

let reviews = [
    {
        id: '1',
        rating: 9,
        content: 'lorem ipsum',
        author_id: '1',
        game_id: '2'
    },
    {
        id: '2',
        rating: 10,
        content: 'lorem ipsum',
        author_id: '2',
        game_id: '3'
    },
    {
        id: '3',
        rating: 7,
        content: 'lorem ipsum',
        author_id: '4',
        game_id: '5'
    },
    {
        id: '4',
        rating: 5,
        content: 'lorem ipsum',
        author_id: '5',
        game_id: '6'
    }
]

export default { games, authors, reviews}
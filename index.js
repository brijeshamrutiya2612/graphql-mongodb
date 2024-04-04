import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import authRoute from './routes/authRoute.js'
import os from 'os'
import axios from 'axios'
import { typeDefs } from './schema/schema.js'
import db from "./Db/db.js";

console.log(os.cpus().length)
dotenv.config()

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors({ origin: true }))

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors({ origin: true }))

////// ----------- Start GraphQl ---------------- ///
const resolvers = {
    Query: {
        games() {
            return db.games
        },
        game(_,args){
            return db.games.find((game)=> game.id === args.id)
        },
        authors() {
            return db.authors
        },
        reviews() {
            return db.reviews
        },
        review(_,args){
            return db.reviews.find((review)=> review.id === args.id)
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log('Server ready at port',)


////// ----------- End GraphQl ---------------- ///


// app.use("/api", authRoute);
// app.get("/", (req, res) => {
//     res.send("Hello World")
// })

/// ---------- connectivity ----------- ///

// const connectWithDB = async () => {
//     try {
//         await mongoose.connect(process.env.CONNECT_CONNECTION).then(() => {
//             console.log("Database successfully connected")
//         })
//     } catch (error) {
//         // console.log(error)
//         console.log("something went wrong with DB")
//     }
// }

// connectWithDB()


// app.listen(process.env.PORT || 5000, () => {
//     console.log(`Server running on this ${process.env.PORT}`)
// })
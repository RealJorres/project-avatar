import express from "express"
import cors from "cors"
import Chance from "chance"

const app = express();
app.use(cors());
app.use(express.json());

// create dummy data
const chance = new Chance();

const users = [...Array(250).keys()].map((id)=>{
    return{
        id,
        name: chance.name(),
        avatar: chance.avatar(),
        company: chance.company(),
        email: chance.email(),
    };
});

app.get("/api/users", (req, res)=>{
    const q = req.query.q?.toLocaleLowerCase() || '';
    const results = users.filter((user)=>user.name.toLowerCase().includes(q));

    res.send(results);
});

app.listen(8080, ()=>{
    console.log(`Server running on http://localhost:8080`);
})
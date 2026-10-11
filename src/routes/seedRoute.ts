import express from 'express';
import createTable from '../seed/createTable';
const router = express.Router()
import seedAll from './seed';

router.get("/seed", async (req, res) => {
    try{
        await createTable()
        return res.status(201).json({message: "Tables are successfully created"})
    }catch(err){
        console.log(err)
        throw err
    }
})

router.get("/seed-all", async(req, res) => {
    try{
        await seedAll()
        return res.status(201).json({message: "Table seeded"})
    }catch(err){
        console.log(err)
        throw err
    }
})

export default router

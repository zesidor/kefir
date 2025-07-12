import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
try {
    const client = await clientPromise;
    const db = client.db("fingerpickingdb");

    const { params } = req.query;
    if (!params || params.length < 2) {
        return res.status(400).json({ error: "Invalid request parameters" });
    }

    const [key, scale, tonality] = params as string[];

    const kdata = await db
    
        .collection("stringdata")
        .findOne({ key, scale, tonality });
        

    if (!kdata) {
        return res.status(404).json({ error: "Data not found" });
    }

    res.json(kdata);
    } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
    }
}
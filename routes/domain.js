import express from "express";
import { addDomain, getDomain, deleteDomain, getHostedZone, getRecords, addRecord } from "../controllers/domain.js";

const router = express.Router();


router.post('/add-domain' , addDomain)
router.post('/get-domain', getDomain )
router.post('/delete-domain', deleteDomain)
router.post('/get-hosted-zone', getHostedZone)
router.post('/get-records', getRecords)
router.post('/add-record', addRecord)

export default router;
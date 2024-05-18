import express from "express";
import { addDomain, getDomain, deleteDomain, getHostedZone, getRecords } from "../controllers/domain.js";

const router = express.Router();


router.post('/add-domain' , addDomain)
router.post('/get-domain', getDomain )
router.post('/delete-domain', deleteDomain)
router.post('/get-hosted-zone', getHostedZone)
router.post('/get-records', getRecords)
// router.post('/update-domain', updateDomain)

export default router;
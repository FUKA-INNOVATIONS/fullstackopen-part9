import diagnoseData from "../data/diagnoseData";
import { DiagnoseEntry } from "../types";
const diagnoses: Array<DiagnoseEntry> = diagnoseData

const getEntries = (): Array<DiagnoseEntry> => {
    return diagnoses
}

export default {
    getEntries
}
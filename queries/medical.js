const db = require('../db/dbConfig')

const getMedicals = async (user_id) => {
    try {
        const medicals = await db.any("SELECT * FROM medical WHERE user_id=$1", user_id)
        return medicals

    } catch (err) {
        return err
    }
}

const createMedical = async (medical) => {
    try {
        const { medical_history, blood_type, allergies, medication } = medical
        const newMedical = await db.one("INSERT INTO medical (medical_history, blood_type, allergies, medication) VALUES ($1, $2, $3, $4) RETURNING *",
          [medical_history, blood_type, allergies, medication]
        )
        return newMedical
   
    } catch (error) {
        return error
    }

}

const updateMedical = async (medical_id, medical) => {
    try {
        const { medical_history, blood_type, allergies, medication } = medical
        const updateMedical = await db.one(
          "UPDATE medical SET medical_history=$1, blood_type=$2, allergies=$3, medication=$4 WHERE medical_id=$5 RETURNING * ",
          [medical_history, blood_type, allergies, medication]
        );
        
    } catch (error) {
        return error
    }
}




module.exports  = { getMedicals, createMedical}
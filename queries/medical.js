const db = require('../db/dbconfig')

const getMedicals = async (user_id) => {
    try {
        const medicals = await db.any(
          "SELECT * FROM medical WHERE user_id=$1", user_id);
        return medicals

    } catch (err) {
        return err
    }
}

const getmedical = async (id) => {
  try {
    const oneMedical = await db.one("SELECT * FROM medical WHERE id=$1", id);
    return oneMedical;
  } catch (error) {
    return error;
  }
};

const newMedical = async (medical) => {
    try {
     
        const newMedical = await db.one(
            "INSERT INTO medical (medical_history, blood_type, allergies, medication, user_id) VALUES ($1, $2, $3, $4, $5) RETURNIN *",
            [
                medical.medical_history,
                medical.blood_type,
                medical.allergies,
                medical.medication,
                medical.user_id
            ]
        );
        return newMedical
   
    } catch (error) {
        return error
    }

};

const deleteMedical = async (id) => {
  try {
    const deletedMedical = await db.one(
      "DELETE FROM medical WHERE id=$1 RETURNING *",
      id
    );
    return deletedMedical;
  } catch (error) {
    return error;
  }
};


const updateMedical = async (medical) => {
  try {
    const updatedMedical = await db.one(
      "UPDATE medical SET medical_history=$1, blood_type=$2, allergies=$3, medication=$4, user_id=$5 WHERE id=$6  RETURNING * ",
      [
        medical.medical_history,
        medical.blood_type,
        medical.allergies,
        medical.medication,
        user_id,
      ]
    );
    return updatedMedical;
  } catch (error) {
    return error;
  }
};









module.exports  = { getMedicals, getmedical, newMedical, deleteMedical, updateMedical}
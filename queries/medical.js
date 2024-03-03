const db = require('../db/dbConfig')

const getMedicals = async (user_id) => {
    try {
        const medicals = await db.any("SELECT * FROM medical WHERE user_id=$1", user_id)
        return medicals
    } catch (err) {
        return err
    }
}

const getMedical = async (id) => {
  try {
    const oneMedical = await db.one("SELECT * FROM medical WHERE id=$1", id);
    return oneMedical;
  } catch (error) {
    return error;
  }
};

const newMedical = async (medical) => {
    try {
        const { medical_history, blood_type, allergies, medication } = medical
        const newMedical = await db.one("INSERT INTO medical (medical_history, blood_type, allergies, medication) VALUES ($1, $2, $3, $4) RETURNING *",
          [medical_history, blood_type, allergies, medication]
        )
        return newMedical
   
    } catch (error) {
        return error
    }

};

const deleteMedical = async (id) => {
  try {
    const deletedMedical = await db.none(
      "DELETE FROM medical WHERE medical_id=$1 RETURNING *",
      id
    );
    return deletedMedical;
  } catch (error) {
    return error;
  }
};


const updateMedical = async (id, medical) => {
  const { medical_history, blood_type, allergies, medication } = medical;
  try {
    const updatedMedical = await db.one(
      "UPDATE medical SET medical_history=$1, blood_type=$2, allergies=$3, medication=$4 WHERE medical_id=$5 ",
      [
        medical_history,
        blood_type,
        allergies,
        medication,
        id
      ]
    );
    return updatedMedical;
  } catch (error) {
    return error;
  }
};









module.exports  = { getMedicals, getMedical, newMedical, deleteMedical, updateMedical}
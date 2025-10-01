// src/utils/dataHelpers.js

export const parseWorkoutData = (data) => {
  // Asegúrate de que los datos existan y que sea un objeto o un array.
  if (!data) return data;

  // Si es un array, mapea cada elemento.
  if (Array.isArray(data)) {
    return data.map(parseWorkoutData);
  }

  // Si es un objeto, revisa si tiene _id y lo renombra a id.
  if (typeof data === 'object' && data !== null) {
    const newData = { ...data };

    // Mapea _id a id para que coincida con tu código existente.
    if (newData._id) {
      newData.id = newData._id.toString();
      delete newData._id;
    }

    // Procesa el campo userId si también es un ObjectId.
    if (
      newData.userId &&
      typeof newData.userId === 'object' &&
      newData.userId.toString
    ) {
      newData.userId = newData.userId.toString();
    }

    // Si hay ejercicios, procesa cada uno.
    if (newData.exercises && Array.isArray(newData.exercises)) {
      newData.exercises = newData.exercises.map((exercise) => {
        // En los ejercicios, también puedes tener ObjectIds
        const newExercise = { ...exercise };
        if (newExercise._id) {
          newExercise.id = newExercise._id.toString();
          delete newExercise._id;
        }
        return newExercise;
      });
    }

    return newData;
  }

  return data;
};

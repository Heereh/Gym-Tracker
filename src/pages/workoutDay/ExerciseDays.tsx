import './ExerciseDaysStyles.css';
import CustomButton from '../../component/iu/CustomButton/CustomButton';
import { Trash } from 'lucide-react';
import { useGymStore } from '../../store/GymStore';
import CardExercise from '../../component/iu/CardExercise/CardExercise';
import { useNavigate, useParams } from 'react-router';
import { getWorkoutDaysById, updateWorkoutDay } from '../../api/workoutService';
import { useEffect, useState } from 'react';
import ExerciseModal, {
  type ExerciseFormData,
} from '../../component/iu/modal/Modal';

const ExerciseDays = () => {
  const { id } = useParams();
  const { addExercise, removeExercise, updateExercise } = useGymStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const workout = useGymStore((state) =>
    state.workouts.find((w) => w._id === id),
  );

  const dayId = workout?._id;

  const EXERCISE_LIMIT = 8;
  const canAddExercise = workout?.exercises.length >= EXERCISE_LIMIT;

  const handleSaveExercise = async (formData: ExerciseFormData) => {
    if (!workout) return;
    try {
      const newExercises = [...workout.exercises, formData];

      const updatedDayData = {
        ...workout,
        exercises: newExercises,
      };

      const response = await updateWorkoutDay(dayId, updatedDayData);

      addExercise(
        response.exercises[response.exercises.length - 1],
        workout._id,
      );

      setIsModalOpen(false);
      alert('¡Ejercicio guardado exitosamente!');
    } catch (error) {
      console.error('Error al guardar el ejercicio:', error);
      alert('Hubo un error al guardar el ejercicio. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="workout__container">
      <div className="workout__title-container">
        <h2 className="workout__title">{workout?.dayOfWeek}</h2>
      </div>
      <div className="workout__container-body">
        {workout?.exercises.length === 0 ? (
          <p>Crea tu primera rutina haciendo click en 'Agregar Ejercicio'</p>
        ) : (
          workout?.exercises.map((exercise, index) => (
            <CardExercise
              key={exercise.id}
              id={exercise.id}
              name={exercise.name}
              exerciseNumber={index + 1}
            ></CardExercise>
          ))
        )}
        <CustomButton
          size="small"
          backgroundColor="primary"
          appearance="outline"
          onClick={() => setIsModalOpen(true)}
          disabled={canAddExercise}
        >
          Agregar ejercicio
        </CustomButton>
        <ExerciseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveExercise}
          title="Crear Ejercicio"
        ></ExerciseModal>
      </div>
      <div>
        <CustomButton>Guardar Rutina</CustomButton>
      </div>
    </div>
  );
};

export default ExerciseDays;

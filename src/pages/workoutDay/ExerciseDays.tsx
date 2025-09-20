import './ExerciseDaysStyles.css';
import CustomButton from '../../component/iu/CustomButton/CustomButton';
import { Trash } from 'lucide-react';
import { useGymStore } from '../../store/GymStore';
import CardExercise from '../../component/iu/CardExercise/CardExercise';
import { useNavigate, useParams } from 'react-router';

const ExerciseDays = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addExercise, removeExercise, updateExercise } = useGymStore();

  const workout = useGymStore((state) =>
    state.workouts.find((w) => w.id === id),
  );

  const EXERCISE_LIMIT = 8;
  const canAddExercise = workout.exercises.length > EXERCISE_LIMIT;
  const handleCreateExercise = () => {
    if (canAddExercise) {
      alert(`No puedes agregar más de ${EXERCISE_LIMIT} ejercicios por día`);
      return;
    }
    const newExercise = {
      id: Date.now().toString(),
      name: '',
      sets: 0,
      reps: '',
      weight: 0,
      nota: '',
    };
    addExercise(newExercise, id);
  };

  return (
    <div className="workout__container">
      <div className="workout__title-container">
        <h2 className="workout__title">Lunes</h2>
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
          onClick={handleCreateExercise}
          disabled={canAddExercise}
        >
          Agregar ejercicio
        </CustomButton>
      </div>
      <div>
        <CustomButton>Guardar Rutina</CustomButton>
      </div>
    </div>
  );
};

export default ExerciseDays;

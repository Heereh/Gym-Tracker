import React from 'react';
import CustomButton from '../CustomButton/CustomButton';
import { Trash } from 'lucide-react';
import './CardExericseStyle.css';
import { useGymStore } from '../../../store/GymStore';
import { useParams } from 'react-router';

interface ExerciseProps {
  id: string;
  name: string;
  exerciseNumber: number;
  /* sets: number;
  reps: string;
  weight: number;
  note: string; */
}

const CardExercise = ({
  id: exerciseId,
  name,
  exerciseNumber,
}: /* sets,
  reps,
  weight,
  note, */
ExerciseProps) => {
  const { removeExercise, updateExercise } = useGymStore();
  const { id: workoutId } = useParams();
  const workout = useGymStore((state) =>
    state.workouts.find((w) => w.id === workoutId),
  );

  const handleDeleteExercise = () => {
    if (workout.exercises.length === 1) {
      alert('No puedes eliminar el último ejercicio');
      return;
    }
    removeExercise(workoutId, exerciseId);
  };

  return (
    <div className="workout__card">
      <div className="workout__card-header">
        <h2 className="workout__card-title">Ejercicio {exerciseNumber}</h2>
        <CustomButton
          size="small"
          backgroundColor="danger"
          appearance="ghost"
          onClick={handleDeleteExercise}
        >
          <Trash />
        </CustomButton>
      </div>
      <div className="workout__card-body">
        <div className="exercise__name-container">
          <span className="exercise__name">{name}</span>
          <input
            className="exercise__input btn-card"
            placeholder="Nombre del ejercicio"
            type="text"
          />
        </div>
        <div className="exercise__detail-container">
          <div className="detail-item">
            <span id="series" className="detail-item__title">
              Series
            </span>
            <input
              id="series"
              className="detail-item__input btn-card"
              type="number"
              placeholder="0"
              min="0"
            />
          </div>
          <div className="detail-item">
            <span id="reps" className="detail-item__title">
              Reps
            </span>
            <input
              className="detail-item__input btn-card"
              type="text"
              id="reps"
              placeholder="Reps"
            />
          </div>
          <div className="detail-item">
            <span id="weight" className="detail-item__title">
              Peso (kg)
            </span>
            <input
              className="detail-item__input btn-card "
              type="number"
              id="weight"
              min="0"
            />
          </div>
        </div>
        <div className="workout__card-note">
          <span className="card-note">Nota</span>
          <input className="card-note-input btn-card" type="text" />
        </div>
      </div>
    </div>
  );
};

export default CardExercise;

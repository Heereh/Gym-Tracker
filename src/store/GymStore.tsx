import { create } from 'zustand';
import { persist } from 'zustand/middleware';
/* import {
  type Workout as WorkoutTypes,
  type Exercise as ExerciseTypes,
} from '../types'; */

export type WorkoutTypes = {
  id: string;
  day: string;
  exercises: ExerciseTypes[];
};

export type ExerciseTypes = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight: number;
  nota: string;
};

interface GymTrackerStore {
  workouts: WorkoutTypes[];
  addWorkoutDay: (workoutDay: WorkoutTypes) => void;
  removeWorkoutDay: (workoutId: string) => void;
  updateWorkoutDay: (
    workoutId: string,
    updateData: Partial<WorkoutTypes>,
  ) => void;
  addExercise: (exercise: ExerciseTypes, workoutId: string) => void;
  removeExercise: (exerciseId: string, workoutId: string) => void;
  updateExercise: (
    workoutId: string,
    exerciseId: string,
    updateData: Partial<ExerciseTypes>,
  ) => void;
}

export const useGymStore = create(
  persist<GymTrackerStore>(
    (set) => ({
      workouts: [
        {
          id: Date.now().toString(),
          day: 'Lunes',
          exercises: [
            {
              id: Date.now().toString(),
              name: 'Sentadilla',
              sets: 0,
              reps: '',
              weight: 0,
              nota: '',
            },
          ],
        },
      ],
      addWorkoutDay: (newWorkout: WorkoutTypes) => {
        set((state) => ({
          workouts: [...state.workouts, newWorkout],
        }));
      },
      removeWorkoutDay: (workoutId) => {
        set((state) => ({
          workouts: state.workouts.filter((w) => w.id !== workoutId),
        }));
      },
      updateWorkoutDay: (workoutId, updateData) => {
        set((state) => ({
          workouts: state.workouts.map((workout) =>
            workout.id === workoutId ? { ...workout, ...updateData } : workout,
          ),
        }));
      },

      addExercise: (newExercise, workoutId) => {
        set((state) => ({
          workouts: state.workouts.map((workout) =>
            workout.id === workoutId
              ? { ...workout, exercises: [...workout.exercises, newExercise] }
              : workout,
          ),
        }));
      },
      removeExercise: (workoutId, exerciseId) => {
        set((state) => ({
          workouts: state.workouts.map((workout) => {
            if (workout.id === workoutId) {
              return {
                ...workout,
                exercises: workout.exercises.filter(
                  (ex) => ex.id !== exerciseId,
                ),
              };
            }
            return workout;
          }),
        }));
      },
      updateExercise: (workoutId, exerciseId, updateData) => {
        set((state) => ({
          workouts: state.workouts.map((workout) => {
            if (workout.id === workoutId) {
              return {
                ...workout,
                exercises: workout.exercises.map((exercise) =>
                  exercise.id === exerciseId
                    ? { ...exercise, ...updateData }
                    : exercise,
                ),
              };
            }
            return workout;
          }),
        }));
      },
    }),
    { name: 'gym-tracker' },
  ),
);

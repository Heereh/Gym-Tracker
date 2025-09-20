export type User = {
  id: number;
  name: string;
};


export type Workout = {
  id: number;
  day: string;
  name: string;
  exercises: Exercise[];
};

export type Exercise = {
  id: number;
  name: string;
  sets: number;
  reps: string;
  weight: number;
  nota: string;
};

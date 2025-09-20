import CustomButton from '../iu/CustomButton/CustomButton';
import './DashboardStyles.css';
import { Calendar, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useGymStore } from '../../store/GymStore';

const allDays = [
  { key: 'Lunes', name: 'Lunes' },
  { key: 'Martes', name: 'Martes' },
  { key: 'Miercoles', name: 'Miercoles' },
  { key: 'Jueves', name: 'Jueves' },
  { key: 'Viernes', name: 'Viernes' },
  { key: 'Sabado', name: 'Sabado' },
  { key: 'Domingo', name: 'Domingo' },
];
const Dashboard = () => {
  useNavigate();
  const { addWorkoutDay } = useGymStore();
  const workouts = useGymStore((state) => state.workouts);

  const existingDays = workouts.map((w) => w.day);
  const availableDays = allDays.filter(
    (day) => !existingDays.includes(day.key),
  );

  const handleCreateWorkout = () => {
    if (availableDays.length === 0) {
      return;
    }
    const nextDay = availableDays[0];

    const newWorkout = {
      id: crypto.randomUUID(),
      day: nextDay.key,
      exercises: [],
    };

    addWorkoutDay(newWorkout);
  };

  return (
    <section className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-logo">
          <Calendar />
        </div>
        <div className="header-title__container">
          <h2 className="title">Rutina semanal</h2>
        </div>
      </div>
      <div className="card-container">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <Link
              className="card"
              key={workout.id}
              to={`/workoutDay/${workout.id}`}
            >
              <div className="card-header">
                <p className="day-name">{workout.day}</p>
                <p className="card-description">Toca para planificar</p>
              </div>
              <div className="icon-container">
                <ChevronRight className="icon" />
              </div>
            </Link>
          ))
        ) : (
          <p>Crea tu primera rutina haciendo click en 'Agregar Día'</p>
        )}
      </div>
      <div className="btn-container">
        <CustomButton
          size="small"
          backgroundColor="primary"
          appearance="outline"
          onClick={handleCreateWorkout}
          disabled={availableDays.length === 0}
        >
          Agregar Día
        </CustomButton>
      </div>
    </section>
  );
};

export default Dashboard;

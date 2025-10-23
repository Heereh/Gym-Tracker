import CustomButton from "../iu/CustomButton/CustomButton";
import "./DashboardStyles.css";
import { Calendar, ChevronRight, User } from "lucide-react";
import { Link } from "react-router";
import { useGymStore } from "../../store/GymStore";
import { createWorkoutDay, getAllWorkouts } from "../../api/workoutService";
import { useEffect } from "react";
import { useAuthStore } from "../../store/GymUserStore";

const allDays = [
  { key: "Lunes", name: "Lunes" },
  { key: "Martes", name: "Martes" },
  { key: "Miercoles", name: "Miercoles" },
  { key: "Jueves", name: "Jueves" },
  { key: "Viernes", name: "Viernes" },
  { key: "Sabado", name: "Sabado" },
  { key: "Domingo", name: "Domingo" },
];
const Dashboard = () => {
  const { addWorkoutDay, setWorkouts } = useGymStore();
  const workouts = useGymStore((state) => state.workouts);
  const user = useAuthStore((state) => state.user?.id);
  const username = useAuthStore((state) => state.user?.username);

  const existingDays = workouts.map((w) => w.dayOfWeek);
  const availableDays = allDays.filter(
    (day) => !existingDays.includes(day.key),
  );

  const handleCreateWorkout = async () => {
    if (availableDays.length === 0) {
      return;
    }
    const nextDay = availableDays[0];

    try {
      const newWorkout = await createWorkoutDay(nextDay.key);
      addWorkoutDay(newWorkout);
      /* navigate(`/workoutDay/`); */
    } catch (error) {
      console.error("Error al crear el día:", error);
      alert("Hubo un error al crear el día. Por favor, inténtalo de nuevo.");
    }
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const workoutsFromApi = await getAllWorkouts();
        setWorkouts(workoutsFromApi);
      } catch (error) {
        console.error("Error al obtener las rutinas:", error);
      }
    };
    if (user) {
      fetchWorkouts();
    }
  }, [user, setWorkouts]);

  return (
    <section className="dashboard-container">
      <div className="dashboard-toast">
        <div className="container-toast">
          <div className="toast-welcome">
            <User />
            <p>
              Bienvenido/a, <span id="username">{username}</span> a tu gimnasio!
            </p>
          </div>
          <div className="user-toast-text">
            <span>
              Planifica y rastrea tus rutinas de entrenamiento semanales
            </span>
          </div>
        </div>
      </div>
      <div className="dashboard-header">
        <div className="header-logo">
          <Calendar />
        </div>
        <div className="header-title__container">
          <h2 className="title">Rutina Semanal</h2>
        </div>
      </div>
      <div className="card-container">
        {workouts.length >= 0 ? (
          workouts.map((workout) => (
            <Link
              className="card"
              key={workout._id}
              to={`/workoutDay/${workout._id}`}
            >
              <div className="card-header">
                <p className="day-name">{workout.dayOfWeek}</p>
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

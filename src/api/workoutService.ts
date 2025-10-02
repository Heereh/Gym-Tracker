import { useAuthStore } from '../store/GymUserStore';
import { parseWorkoutData } from '../utils/workoutTransformer';
import authApi from './apiClient';

export const createWorkoutDay = async (data) => {
  try {
    const dayData = {
      dayOfWeek: data,
      workoutName: 'Mi rutina de ejercicios',
    };

    const response = await authApi.post(`/days`, dayData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error;
  }
};

export const getAllWorkouts = async () => {
  try {
    const response = await authApi.get('/days');
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error;
  }
};

export const updateWorkoutDay = async (dayId, UpdatedData) => {
  try {
    const response = await authApi.put(`/days/${dayId}`, UpdatedData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error;
  }
};

export const getWorkoutDaysById = async (dayId) => {
  try {
    const response = await authApi.get(`/days/${dayId}`);
    parseWorkoutData(response.data);
    return parseWorkoutData;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteExercise = async (dayId, exerciseId) => {
  try {
    await authApi.delete(`/days/${dayId}/exercises/${exerciseId}`);
    return true;
  } catch (error) {
    throw error.response?.data || error;
  }
};

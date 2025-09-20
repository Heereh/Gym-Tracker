import { ErrorMessage, Field, Form, Formik } from 'formik';
import { registerValidationSchema } from '../../formik/ValidationSchema';
import { type registerInitialValues } from '../../formik/initialValues';
import CustomButton from '../../component/iu/CustomButton/CustomButton';
import './signUpStyles.css';
import React from 'react';
import { LoaderCircle } from 'lucide-react';
import { useAuthStore } from '../../store/GymUserStore';
import { useNavigate } from 'react-router';

const initialValues: registerInitialValues = {
  username: '',
  email: '',
  password: '',
};

const RegisterForm = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    // 1. Aquí iría la llamada real a tu API para el registro.
    // Ej: const response = await myApiClient.register(values);

    // Simulación de una respuesta exitosa de la API
    setTimeout(() => {
      // 2. Extrae los datos del usuario y el token de la respuesta de la API.
      const userDataFromApi = {
        user: {
          id: Date.now(),
          email: values.email,
          username: values.username,
          name: values.username, // Usamos el username como nombre, como en tu LoginForm.
        },
        token: 'fake-jwt-token-from-register',
      };

      // 3. Llama a la acción 'login' para actualizar el estado global.
      login(userDataFromApi);

      setSubmitting(false);

      // 4. Redirige al usuario a la página principal, que ahora estará accesible.
      navigate('/');

      // Opcional: una alerta para confirmar
      alert(`¡Registro exitoso para ${values.username}!`);
    }, 1500);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="form" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="name-register">Nombre</label>
            <Field
              id="name-register"
              type="text"
              name="username"
              placeholder="Tu nombre"
              required
            />
            <ErrorMessage name="username" component="div" className="error" />
          </div>
          <div className="formGroup">
            <label htmlFor="email-register">Email</label>
            <Field
              id="email-register"
              name="email"
              type="email"
              placeholder="nombre@ejemplo.com"
              required
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="formGroup">
            <label htmlFor="password-register">Contraseña</label>
            <Field
              id="password-register"
              name="password"
              type="password"
              required
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <CustomButton type="submit" disabled={isSubmitting} size="mediun">
            {isSubmitting && <LoaderCircle className="loadingIcon" />}
            Crear Cuenta
          </CustomButton>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { loginValidationSchema } from '../../formik/ValidationSchema';
import { type initialValuesLogin } from '../../formik/initialValues';
import CustomButton from '../../component/iu/CustomButton/CustomButton';
import { LoaderCircle } from 'lucide-react';
import './signUpStyles.css';
import { useAuthStore } from '../../store/GymUserStore';
import { useNavigate } from 'react-router';

const initialValues: initialValuesLogin = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    // Aquí iría tu llamada a la API
    // const response = await myApiClient.login(values);

    // Simulación de una respuesta exitosa
    setTimeout(() => {
      const userDataFromApi = {
        user: { id: 1, email: values.email, name: 'testuser' },
        token: 'fake-jwt-token-12345',
      };

      // Llamamos a la acción 'login' para guardar los datos en el store
      login(userDataFromApi);
      setSubmitting(false);

      // Redirigimos al usuario a la página principal
      navigate('/');
    }, 1500);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="form">
          <div className="formGroup">
            <label htmlFor="email-login">Email</label>
            <Field
              id="email-login"
              name="email"
              type="email"
              placeholder="nombre@ejemplo.com"
              required
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="formGroup">
            <label htmlFor="password-login">Contraseña</label>
            <Field
              id="password-login"
              name="password"
              type="password"
              required
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <CustomButton type="submit" disabled={isSubmitting} size="mediun">
            {isSubmitting && <LoaderCircle className="loadingIcon" />}
            Iniciar Sesión
          </CustomButton>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

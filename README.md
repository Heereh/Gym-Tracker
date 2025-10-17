



<div align="center">
  
![Estado del proyecto](https://img.shields.io/badge/status-beta-orange)
![Licencia MIT](https://img.shields.io/badge/license-MIT-green)

  
## 🏋️ Zylo - Tu Rastreador de Rutinas de Gimnasio 

Zylo es una aplicación web de seguimiento de fitness diseñada para ayudarte a gestionar, registrar y progresar en tus rutinas de levantamiento de pesas. Olvídate de las hojas de papel o las notas dispersas; Zylo centraliza la gestión de tus entrenamientos, series y pesos.

</div>

<br></br>

## 🌟 Contenido y Funcionalidades (Interfaz)

Este repositorio contiene la capa de presentación de la aplicación.
- *Interfaz de Autenticación*: Vistas para el registro y el inicio de sesión.
- *Gestión de Rutinas*: Vistas y componentes para visualizar la lista de días de entrenamiento.
- *Edición de Ejercicios*: Componentes para añadir, editar y eliminar ejercicios (la lógica de estas acciones llama a la API externa).

<br></br>

## 🚀 Instalación y Ejecución Local
#### NOTA IMPORTANTE: Para que la aplicación sea completamente funcional, requiere un Backend API externo que gestione la autenticación y la base de datos (MongoDB).

### Prerrequisitos 
- Node.js (versión LTS recomendada)
- npm o Yarn


### Instalacion
  1. **Clona el repositorio**

     ``` bash
     
     git clone https://github.com/Heereh/Zylo.git
     cd Zylo
     
      ```
 2. **Instala dependencias**
    ```bash
    
    npm install

    ```
3. **Backend**
    -Crea un archivo .env en la raíz del proyecto y establece la URL base de tu API Backend Operativa:
   ```bash
   
    NOMBRE_API=https://tu-url-de-backend.com/api/v1 
   # Ejemplo local: http://localhost:3000/api/v1

   ```
4. **Inicia la aplicación cliente:**
   ```bash
   
    npm run dev 
    #La aplicación se abrirá en http://localhost:5000 (o similar)
   
   ```
<div align="center"> 

<br></br>
  
## 🤝 **¿Cómo contribuir?**
¡Las contribuciones son bienvenidas! Si deseas mejorar la interfaz de usuario, el rendimiento del frontend o la lógica de la presentación, sigue estos pasos:
</div>

1. Haz un Fork del proyecto.
2. Crea una nueva rama para tu feature: (`git checkout -b feature/MiNuevaFuncionalidad`).
3. Realiza tus cambios y haz commit a tu rama (`git checkout -b feature/MiNuevaFuncionalidad`).
4. Sube tus cambios a tu fork: (`git push origin feature/MiNuevaFuncionalidad`).
5. Abre un Pull Request detallando tus cambios y las pruebas realizadas.
6. Asegúrate de que todo el código nuevo cumpla con los estándares de TypeScript para mantener la robustez del proyecto.

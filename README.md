🌎 Web Project - Installation and Deployment Guide  
🌎 Proyecto Web - Guía de Instalación y Despliegue  

---

📖 **Description | Descripción**  

This project is a web platform that can be run **locally** or **deployed on AWS S3** as a static website.  

Este proyecto es una plataforma web que puede ejecutarse **localmente** o **desplegarse en AWS S3** como un sitio web estático.  

---

🚀 **Installation and Execution Guide | Guía de Instalación y Ejecución**  

🔹 **1️⃣ Run Locally | Ejecutar en Local**  

📌 **Requirements | Requisitos**  

Before running the project, make sure you have installed:  
Antes de ejecutar el proyecto, asegúrate de tener instalado:  

- **Git** → [Download | Descargar](https://git-scm.com/downloads)  
- **A web browser | Un navegador web** (Chrome, Firefox, Edge)  
- **Optional | Opcional:** A local server such as **Live Server** in VS Code.  
  Un servidor local como **Live Server** en VS Code.  

📌 **Step-by-Step Installation | Instalación Paso a Paso**  

1. **Clone the repository | Clonar el repositorio**  
   ```sh
   git clone https://github.com/your-user/web-project.git
   ```
2. **Go to the project directory | Acceder al directorio del proyecto**  
   ```sh
   cd web-project
   ```
3. **Open the Project | Abrir el Proyecto**  
   - **Option 1 | Opción 1:** Open `index.html` directly in a browser.  
     Abrir `index.html` directamente en un navegador.  
   - **Option 2 | Opción 2:** Use **Live Server** in VS Code:  
     - Open the project in **VS Code**.  
       Abre el proyecto en **VS Code**.  
     - Install the **Live Server** extension.  
       Instala la extensión **Live Server**.  
     - Right-click on `index.html` and select **"Open with Live Server"**.  
       Haz clic derecho en `index.html` y selecciona **"Open with Live Server"**.  

---

🔹 **2️⃣ Deploy on AWS S3 | Desplegar en AWS S3**  

📌 **AWS S3 Setup | Configuración en AWS S3**  

1. **Create an S3 Bucket | Crear un Bucket en S3**  
   - Go to **AWS S3** and create a bucket.  
     Ve a **AWS S3** y crea un bucket.  
   - **Disable "Block Public Access"** to allow public access.  
     **Desactiva "Bloquear acceso público"** para permitir acceso público.  
   - In the **Properties** tab, enable **Static Website Hosting**.  
     En la pestaña **Properties**, habilita **Static Website Hosting**.  
   - Set the index document as `index.html`.  
     Define el documento de índice como `index.html`.  

2. **Upload files to the bucket | Subir los archivos al bucket**  
   ```sh
   aws s3 cp . s3://YOUR_BUCKET_NAME --recursive
   ```

3. **Configure permissions in S3 | Configurar permisos en S3**  
   - Go to the **Permissions** tab and in **Bucket Policy**, add this policy:  
     Ve a la pestaña **Permissions** y en **Bucket Policy**, agrega esta política:  
     ```json
     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Effect": "Allow",
           "Principal": "*",
           "Action": "s3:GetObject",
           "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
         }
       ]
     }
     ```

4. **Get the Public URL | Obtener la URL pública**  
   - In **Static Website Hosting**, copy the URL provided by AWS.  
     En **Static Website Hosting**, copia la URL que AWS proporciona.  
   - ✅ Done! Your site is now accessible on the internet.  
     ✅ ¡Listo! Tu sitio ahora está accesible en internet. 🚀  

---

📁 **Project Structure | Estructura del Proyecto**  

| 📂 Folder/File | 📌 Description | 📌 Descripción |
|---------------|--------------|--------------|
| `index.html` | Main page with the website structure. | Página principal con la estructura del sitio web. |
| `js/contacts.js` | Script that manages the contacts API. | Script que gestiona la API de contactos. |
| `css/styles.css` | Website CSS styles. | Estilos CSS del sitio web. |
| `.gitattributes` | Git settings. | Configuraciones de Git. |

---

📝 **Key Files Explanation | Explicación de Archivos Clave**  

📌 **`contacts.js` (Contact Management | Gestión de Contactos)**  

This script handles the interaction with the API, allowing **loading, adding, and displaying contacts**.  
Este script maneja la interacción con la API, permitiendo **cargar, agregar y mostrar contactos**.  

🔹 **Key Functions | Funciones Clave**  

1. `fetchContacts()` → Fetches the list of contacts from the API.  
   Obtiene la lista de contactos desde la API.  
2. `renderContacts(data)` → Displays the contacts in the HTML table.  
   Muestra los contactos en la tabla HTML.  
3. `addContact(event)` → Sends a new contact to the API.  
   Envía un nuevo contacto a la API.  

---

🛠 **Troubleshooting | Solución de Problemas**  

| **Problem (English)** | **Solution (English)** | **Problema (Español)** | **Solución (Español)** |
|----------------------|----------------------|----------------------|----------------------|
| Contacts do not load | Check if the API is active. | No carga contactos | Verifica que la API esté activa. |
| Contact is not added | Check the console (`F12 > Console`). | Contacto no se agrega | Revisa la consola (`F12 > Console`). |
| CSS is not applied | Ensure `styles.css` is in the correct folder. | CSS no se aplica | Asegúrate de que `styles.css` esté en la carpeta correcta. |
| CORS error | Configure server permissions or use a proxy. | Error de CORS | Configura permisos en el servidor o usa un proxy. |
| `index.html` not found in AWS S3 | Ensure the file is in the bucket root. | No se encuentra `index.html` en AWS S3 | Verifica que el archivo esté en la raíz del bucket. |


📌 **README.md (Español e Inglés)**

```markdown
# 🌎 Proyecto Web - Guía de Instalación y Despliegue

## 📖 Descripción | Description

Este proyecto es una plataforma web que puede ejecutarse **localmente** o **desplegarse en AWS S3** como un sitio web estático.

This project is a web platform that can be run **locally** or **deployed on AWS S3** as a static website.

---

# 🚀 **Guía de Instalación y Ejecución | Installation and Execution Guide**

## 🔹 **1️⃣ Ejecutar en Local | Run Locally**
### 📌 **Requisitos | Requirements**
Antes de ejecutar el proyecto, asegúrate de tener instalado:  
Before running the project, make sure you have installed:
- **Git** → [Descargar | Download](https://git-scm.com/downloads)
- **Un navegador web | A web browser** (Chrome, Firefox, Edge)
- **Opcional | Optional:** Un servidor local como **Live Server** en VS Code.

### 📌 **Instalación Paso a Paso | Step-by-Step Installation**
1. **Clonar el repositorio | Clone the repository:**
   ```sh
   git clone https://github.com/tu-usuario/proyecto-web.git
   ```
2. **Acceder al directorio del proyecto | Go to the project directory:**
   ```sh
   cd proyecto-web
   ```
3. **Abrir el Proyecto | Open the Project:**
   - **Opción 1 | Option 1:** Abrir `index.html` directamente en un navegador.  
     Open `index.html` directly in a browser.
   - **Opción 2 | Option 2:** Usar **Live Server** en VS Code:
     - Abre el proyecto en **VS Code**.  
       Open the project in **VS Code**.
     - Instala la extensión **Live Server**.  
       Install the **Live Server** extension.
     - Haz clic derecho en `index.html` y selecciona **"Open with Live Server"**.  
       Right-click on `index.html` and select **"Open with Live Server"**.

---

## 🔹 **2️⃣ Desplegar en AWS S3 | Deploy on AWS S3**
### 📌 **Configuración en AWS S3 | AWS S3 Setup**
1. **Crear un Bucket en S3 | Create an S3 Bucket:**
   - Ve a **AWS S3** y crea un bucket.  
     Go to **AWS S3** and create a bucket.
   - **Desactiva "Bloquear acceso público"** para permitir acceso público.  
     **Disable "Block Public Access"** to allow public access.
   - En la pestaña **Properties**, habilita **Static Website Hosting**.  
     In the **Properties** tab, enable **Static Website Hosting**.
   - Define el documento de índice como `index.html`.  
     Set the index document as `index.html`.

2. **Subir los archivos al bucket | Upload files to the bucket:**
   ```sh
   aws s3 cp . s3://NOMBRE_DEL_BUCKET --recursive
   ```

3. **Configurar permisos en S3 | Configure permissions in S3:**
   - Ve a la pestaña **Permissions** y en **Bucket Policy**, agrega esta política:  
     Go to the **Permissions** tab and in **Bucket Policy**, add this policy:
     ```json
     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Effect": "Allow",
           "Principal": "*",
           "Action": "s3:GetObject",
           "Resource": "arn:aws:s3:::NOMBRE_DEL_BUCKET/*"
         }
       ]
     }
     ```

4. **Obtener la URL pública | Get the Public URL:**
   - En **Static Website Hosting**, copia la URL que AWS proporciona.  
     In **Static Website Hosting**, copy the URL provided by AWS.
   - ¡Listo! Tu sitio ahora está accesible en internet. 🚀  
     Done! Your site is now accessible on the internet. 🚀  

---

# 📁 **Estructura del Proyecto | Project Structure**
| 📂 Carpeta/Archivo | 📌 Descripción | 📌 Description |
|-------------------|--------------|--------------|
| `index.html` | Página principal con la estructura del sitio web. | Main page with the website structure. |
| `js/contacts.js` | Script que gestiona la API de contactos. | Script that manages the contacts API. |
| `css/estilos.css` | Estilos CSS del sitio web. | Website CSS styles. |
| `.gitattributes` | Configuraciones de Git. | Git settings. |

---

# 📝 **Explicación de Archivos Clave | Explanation of Key Files**

## **📌 `contacts.js` (Gestión de Contactos | Contact Management)**
Este script maneja la interacción con la API, permitiendo **cargar, agregar y mostrar contactos**.  
This script handles the interaction with the API, allowing **loading, adding, and displaying contacts**.

### 🔹 **Funciones Clave | Key Functions**
1. **`fetchContacts()`** → Obtiene la lista de contactos desde la API.  
   Fetches the list of contacts from the API.
2. **`renderContacts(data)`** → Muestra los contactos en la tabla HTML.  
   Displays the contacts in the HTML table.
3. **`addContact(event)`** → Envía un nuevo contacto a la API.  
   Sends a new contact to the API.

### 🔹 **Código Explicado | Code Explanation**
```javascript
const API_URL = "https://api-url.com/contacts";

// 🚀 Obtener lista de contactos | Fetch the list of contacts
async function fetchContacts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error en la solicitud");

        const data = await response.json();
        renderContacts(data);
    } catch (error) {
        console.error("❌ Error al obtener contactos:", error);
    }
}

// 🎨 Renderizar contactos en la tabla | Render contacts in the table
function renderContacts(data) {
    const tableBody = document.querySelector("#contactsTable tbody");
    tableBody.innerHTML = "";

    data.forEach(contact => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${contact.firstname}</td>
            <td>${contact.lastname}</td>
            <td>${contact.email}</td>
        `;
        tableBody.appendChild(row);
    });
}

// 📝 Agregar un nuevo contacto | Add a new contact
async function addContact(event) {
    event.preventDefault();

    const firstname = document.querySelector("#firstname").value;
    const lastname = document.querySelector("#lastname").value;
    const email = document.querySelector("#email").value;

    const contactData = { firstname, lastname, email };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contactData)
        });

        if (!response.ok) throw new Error("Error al agregar contacto");

        fetchContacts();
    } catch (error) {
        console.error("❌ Error al agregar contacto:", error);
    }
}

// 🎯 Cargar contactos al inicio | Load contacts on start
document.addEventListener("DOMContentLoaded", fetchContacts);
document.querySelector("#contactForm").addEventListener("submit", addContact);
```

---

# 🛠 **Solución de Problemas | Troubleshooting**
| Problema | Solución | Solution |
|----------|----------------|----------------|
| No carga contactos | Verifica que la API esté activa. | Check if the API is active. |
| Contacto no se agrega | Revisa la consola (`F12 > Console`). | Check the console (`F12 > Console`). |
| CSS no se aplica | Asegúrate de que `estilos.css` esté en la carpeta correcta. | Ensure `estilos.css` is in the correct folder. |

---

# 📞 **Contacto | Contact**
📩 **Email:** soporte@example.com  
🌎 **Sitio Web | Website:** [https://example.com](https://example.com)  
```

---

🚀 **Este README cumple con todo lo que necesitas para ejecutarlo en local y en AWS S3 en español e inglés.** Si necesitas algún ajuste, dime y lo mejoramos aún más. 😃🔥

/*const API_URL = "https://sa-tech-assessment.replit.app/api/assessment/contacts"; // Reemplaza con la URL de tu backend en AWS*/

// 📌 Obtener y mostrar contactos en la tabla
async function fetchContacts() {
    const tableBody = document.querySelector("#contactsTable tbody");
    tableBody.innerHTML = "<tr><td colspan='3'>Cargando...</td></tr>"; // Mostrar mensaje de carga
    axios.get('https://cors-anywhere.herokuapp.com/https://sa-tech-assessment.replit.app/api/assessment/contacts', {
        responseType: 'json',
      })
        .then(function(data) {
          if(data.status==200) {
            tableBody.innerHTML = "";
            console.log("result", data)
            if (!data.data.results) {
                tableBody.innerHTML = "<tr><td colspan='3'>No hay contactos disponibles.</td></tr>";
            } else {
                data.data.results.slice(0, 15).forEach(contact => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${contact.properties.firstname || "N/A"}</td>
                        <td>${contact.properties.lastname || "N/A"}</td>
                        <td>${contact.properties.email || "N/A"}</td>
                    `;
                    tableBody.appendChild(row);
                });
            }
          }
        })
        .catch(function(err) {
            tableBody.innerHTML = "<tr><td colspan='3'>Error al obtener data.</td></tr>";
        })
        .then(function() {
          //loading.style.display = 'none';
        });
}


// 📌 Enviar un nuevo contacto a la API externa
document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita el envío por defecto del formulario

    const newContact = {
        properties: {
            firstname: document.getElementById("firstname").value,
            lastname: document.getElementById("lastname").value,
            email: document.getElementById("email").value
        }
    };

    await axios.post('https://cors-anywhere.herokuapp.com/https://sa-tech-assessment.replit.app/api/assessment/contacts', {
        newContact
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newContact)
      }).then(function(data) {
        console.log("data post:", data)
        console.log("✅ Contacto agregado:", data);
        alert("¡Contacto agregado con éxito!");
      })
      .catch(function(err) {
        console.error("❌ Error al agregar contacto:", err);
        alert("Error al agregar el contacto.");
      })
      .then(function() {
        //loading.style.display = 'none';
      });

    
});

// 📌 Evento para el botón "Conoce nuestro equipo"
document.getElementById("loadContactsBtn").addEventListener("click", function(event) {
    event.preventDefault(); // Evitar que el enlace cambie de página
    fetchContacts();
});

// 📌 Evento para el botón "Actualizar contactos"
document.getElementById("refreshContactsBtn").addEventListener("click", function() {
    fetchContacts();
});

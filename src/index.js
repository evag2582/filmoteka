//Clave de la API: 4037711053de8efe03398288380ebc9e

// Token de acceso de lectura a la API: 

// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDM3NzExMDUzZGU4ZWZlMDMzOTgyODgzODBlYmM5ZSIsInN1YiI6IjY1MzhhMmNhMGZiMTdmMDBmZWIwZTg4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UxYhSmIFVn6tD_sMBEEmpjwh8WjvI_HmrbH0Ps04Qsc

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            navLinks.forEach((item) => {
                item.classList.remove("active");
            });
            event.target.classList.add("active");
        });
    });
});

const ordena = (()=>{
    'use strict'
    function ordenarTabla(tabla, indiceCol, esNum){
        const filas = Array.from(tabla.rows).slice(1);
        const direccion = tabla.dataset.sortOrder === 'asc' ? 'desc' : 'asc';
    
        filas.sort((filaA, filaB)=>{
            const celdaA = filaA.cells[indiceCol].innerText.trim().toLowerCase();
            const celdaB = filaB.cells[indiceCol].innerText.trim().toLowerCase();
    
            if(esNum){
                return direccion === 'asc' ? celdaA - celdaB : celdaB - celdaA;
            } else {
                return direccion === 'asc' ? celdaA.localeCompare(celdaB) : celdaB.localeCompare(celdaA);
            }
        });
    
        tabla.tBodies[0].append(...filas);
        tabla.dataset.sortOrder = direccion;
    }
    
    document.addEventListener('DOMContentLoaded', ()=>{
        const tabla = document.querySelector('table');
        const encabezados = document.querySelectorAll('th');

        encabezados.forEach((encabezado, i) => {
            const link = encabezado.querySelector('a');
            if(link){
                link.addEventListener('click', (evento) => {
                    evento.preventDefault(); 
                    const esNum = !isNaN(tabla.rows[1].cells[i].innerText.trim());
                    ordenarTabla(tabla, i, esNum);
                });
            };
        });
    });
    
})();
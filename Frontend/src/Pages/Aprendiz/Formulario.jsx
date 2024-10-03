import React, { useState } from 'react';
import jsPDF from 'jspdf';
import LayoutPrincipal1 from '../../Layouts/LayoutPrincipal1.jsx';
import Layoutcontenido3 from '../../Layouts/Layoutcontenido3.jsx';
import BotonPrincipal from '../../Components/BotonPrincipal';
import InputField from '../../Components/Input.jsx'; // Asegúrate de que la ruta sea correcta
import ButtonComponent from '../../Components/Botonpdf.jsx'; // Asegúrate de que la ruta sea correcta
import TextArea from '../../Components/TextArea.jsx';

const ReportForm = () => {
  const [report, setReport] = useState({
    title: '',
    description: '',
    projectStatus: '',
    tasksCompleted: '',
    tasksPending: '',
    observations: '',
    conclusions: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Configuración de fuentes y colores
    doc.setFont("helvetica");
    const primaryColor = [0, 102, 204];
    const secondaryColor = [100, 100, 100];
    
    // Encabezado
    doc.setFontSize(24);
    doc.setTextColor(...primaryColor);
    doc.text('Company Name', 20, 20);
    
    doc.setFontSize(18);
    doc.setTextColor(...secondaryColor);
    doc.text('Reporte de Avance de Proyecto', 20, 30);
    
    // Línea separadora
    doc.setDrawColor(...primaryColor);
    doc.line(20, 35, 190, 35);
    
    // Contenido principal
    doc.setFontSize(12);
    doc.setTextColor(0);
    
    const startY = 45;
    const lineHeight = 10;
    let currentY = startY;
    
    const addField = (label, value) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, 20, currentY);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(value, 150);
      doc.text(lines, 60, currentY);
      currentY += lineHeight * lines.length;
    };
    
    addField("Título", report.title);
    addField("Descripción", report.description);
    addField("Estado del Proyecto", report.projectStatus);
    addField("Tareas Completadas", report.tasksCompleted);
    addField("Tareas Pendientes", report.tasksPending);
    addField("Observaciones", report.observations);
    addField("Conclusiones", report.conclusions);
    
    // Pie de página
    doc.setFontSize(10);
    doc.setTextColor(...secondaryColor);
    doc.text('Generado por Company Name', 20, 280);
    doc.text('www.companywebsite.com', 20, 285);
    
    // Agregar número de página
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(`Página ${i} de ${pageCount}`, 190, 285, { align: 'right' });
    }
    
    doc.save('report.pdf');
  };
  return (
    <LayoutPrincipal1 title="Formulario de Reporte">
      <Layoutcontenido3 title="Formulario de Reporte">


     <div className="w-full md:w-1/2">
        <div className="flex flex-col p-[5%] Flex-box">
          <h1 className="text-2xl font-bold mb-4">Formulario de Reporte</h1>
          <form className="">
          
              <InputField
                type="text"
                id="title"
                name="title"
                Text="Título:"
                placeholder="Ingrese el título"
                value={report.title}
                onChange={handleChange}
              />
         
              <TextArea
                id="description"
                name="description"
                placeholder="Ingrese la descripción"
                Text="Descripción:"
                value={report.description}
                onChange={handleChange}
              />
       
         
              <InputField
                type="text"
                Text="Estado del Proyecto:"
                id="projectStatus"
                name="projectStatus"
                placeholder="Ingrese el estado del proyecto"
                value={report.projectStatus}
                onChange={handleChange}
              />
          
              <TextArea
                id="tasksCompleted"
                name="tasksCompleted"
                placeholder="Ingrese las tareas completadas"
                Text="Tareas Completadas:"
                value={report.tasksCompleted}
                onChange={handleChange}
              />
            
            </form>
          </div>
          </div>

          <div className="w-full md:w-1/2">
        <div className="flex flex-col p-[5%] Flex-box mt-[2.6em] ">
          <form className="">
          
              <TextArea
                id="tasksPending"
                name="tasksPending"
                placeholder="Ingrese las tareas pendientes"
                Text="Tareas Pendientes:"
                value={report.tasksPending}
                onChange={handleChange}
              />
      
        
              <TextArea
                id="observations"
                name="observations"
                placeholder="Ingrese observaciones"
                Text="Observaciones:"
                value={report.observations}
                onChange={handleChange}
              />
      
              <TextArea
                id="conclusions"
                name="conclusions"
                placeholder="Ingrese conclusiones"
                Text="Conclusiones:"
                value={report.conclusions}
                onChange={handleChange}
              />
            
            <div className=" m-[10px] flex justify-end   ">
           <ButtonComponent
            Text="Generar PDF"
            id="generatePDF"
               onClick={generatePDF} // Asegúrate de que la función se pasa correctamente
               
              /> </div>

          </form>
          
        
          </div>
      
          </div>
          <div className="flex flex-col w-full items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 ">
          
          <div className=" ">
            <a href="/Aprendiz/VistaProyectos">
              <BotonPrincipal Text="Volver" />
              </a>
            </div>
            <div className="mb-10  ">
            <a href="/Aprendiz/Reporte">
              <BotonPrincipal Text="Siguiente" />
              </a>
            </div>
          
        </div>
          
      
      </Layoutcontenido3>
    </LayoutPrincipal1>
  );
};

export default ReportForm;

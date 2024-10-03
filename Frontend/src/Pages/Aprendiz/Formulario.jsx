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
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter'
    });
  
    // Configuración de fuentes y colores
    doc.setFont("times", "normal");
    const primaryColor = [0, 0, 0]; // Negro para texto principal
    const secondaryColor = [100, 100, 100]; // Gris para detalles secundarios
  
    // Función para agregar una nueva página
    const addPage = () => {
      doc.addPage();
      addHeader();
      return 1; // Volver a la parte superior de la página
    };
  
    // Función para agregar el encabezado en cada página
    const addHeader = () => {
      doc.setFontSize(12);
      doc.setFont("times", "bold");
      doc.text('REPORTE DE AVANCE DE PROYECTO', doc.internal.pageSize.width / 2, 0.5, { align: 'center' });
      doc.setFont("times", "normal");
      doc.setFontSize(10);
      doc.text('Company Name', doc.internal.pageSize.width / 2, 0.7, { align: 'center' });
      doc.line(0.5, 0.8, doc.internal.pageSize.width - 0.5, 0.8);
    };
  
    // Iniciar la primera página
    addHeader();
  
    // Contenido principal
    doc.setFontSize(12);
    doc.setTextColor(...primaryColor);
  
    let yPosition = 1.2; // Comenzar debajo del encabezado
    const lineHeight = 0.25;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 0.5;
  
    const addField = (label, value) => {
      if (yPosition + lineHeight > pageHeight - 1) {
        yPosition = addPage();
      }
      doc.setFont("times", "bold");
      doc.text(`${label}:`, margin, yPosition);
      doc.setFont("times", "normal");
      const maxWidth = doc.internal.pageSize.width - margin * 2;
      const lines = doc.splitTextToSize(value, maxWidth - 1.5);
      doc.text(lines, margin + 1.5, yPosition);
      yPosition += lineHeight * (lines.length + 0.5);
    };
  
    addField("Título", report.title);
    addField("Descripción", report.description);
    addField("Estado del Proyecto", report.projectStatus);
    addField("Tareas Completadas", report.tasksCompleted);
    addField("Tareas Pendientes", report.tasksPending);
    addField("Observaciones", report.observations);
    addField("Conclusiones", report.conclusions);
  
    // Pie de página
    const addFooter = (pageNumber) => {
      doc.setFontSize(10);
      doc.setTextColor(...secondaryColor);
      doc.text('Generado por Company Name', margin, pageHeight - 0.3);
      doc.text('www.companywebsite.com', doc.internal.pageSize.width - margin, pageHeight - 0.3, { align: 'right' });
      doc.text(pageNumber.toString(), doc.internal.pageSize.width / 2, pageHeight - 0.3, { align: 'center' });
    };
  
    // Agregar números de página y pie de página
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      addFooter(i);
    }
  
    doc.save('Reporte_de_Avance_de_Proyecto.pdf');
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

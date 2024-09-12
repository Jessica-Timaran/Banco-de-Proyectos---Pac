import React, { useState } from 'react';
import jsPDF from 'jspdf';
import LayoutPrincipal from '../../layouts/LayoutPrincipal.jsx';
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
  
    doc.setFontSize(24);
    doc.setTextColor(0, 102, 204);
    doc.text('Company Name', 20, 20);
  
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('Reporte de Avance de Proyecto', 20, 40);
  
    doc.setFontSize(14);
    doc.text(`Título: ${report.title}`, 20, 60);
    doc.text(`Descripción: ${report.description}`, 20, 70);
    doc.text(`Estado del Proyecto: ${report.projectStatus}`, 20, 80);
    doc.text(`Tareas Completadas: ${report.tasksCompleted}`, 20, 90);
    doc.text(`Tareas Pendientes: ${report.tasksPending}`, 20, 100);
    doc.text(`Observaciones: ${report.observations}`, 20, 110);
    doc.text(`Conclusiones: ${report.conclusions}`, 20, 120);
  
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('Generado por Company Name', 20, 280);
    doc.text('www.companywebsite.com', 20, 285);
  
    doc.save('report.pdf');
  };

  return (
    <LayoutPrincipal title="Formulario de Reporte">
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
    </LayoutPrincipal>
  );
};

export default ReportForm;

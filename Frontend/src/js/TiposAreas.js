useEffect(() => {
    const handleCardClick = async (e) => {
      e.preventDefault();
      const tipoId = e.currentTarget.closest('.card-container').dataset.tipoId;
  
      if (tipoId && projectId) {
        try {
          console.log('Enviando solicitud para actualizar el proyecto...');
          const response = await fetch('http://localhost:4000/api/update-proyecto', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ projectId, tipoId }),
          });
  
          if (!response.ok) {
            throw new Error('Error updating proyecto: ' + response.statusText);
          }
  
          const result = await response.json();
          console.log('Proyecto actualizado correctamente:', result);
  
          const redirectUrl = `/Services/${projectId}-${tipoId}?projectId=${projectId}`;
          console.log('Redirigiendo a:', redirectUrl);
          window.location.href = redirectUrl;
        } catch (error) {
          console.error('Error al actualizar el proyecto:', error);
        }
      } else {
        console.error('Faltan ID del tipo o del proyecto.', { tipoId, id: projectId });
      }
    };
  
    document.querySelectorAll('.card-link').forEach(link => {
      link.addEventListener('click', handleCardClick);
    });
  
    return () => {
      document.querySelectorAll('.card-link').forEach(link => {
        link.removeEventListener('click', handleCardClick);
      });
    };
  }, [projectId]);
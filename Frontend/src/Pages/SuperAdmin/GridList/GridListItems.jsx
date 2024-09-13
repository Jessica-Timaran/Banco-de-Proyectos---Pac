import { useState, useEffect } from 'react';
import Loader from '../../../Components/Loader';
import { useParams } from 'react-router-dom';

const GridListItems = () => {
  const { idarea, idtiposdearea } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/superAdmin/items/${idarea}/${idtiposdearea}`);
        if (!response.ok) {
          throw new Error(`Error fetching items: ${response.statusText}`);
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    if (idarea && idtiposdearea) {
      fetchItems();
    }
  }, [idarea, idtiposdearea]);

  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#A3E784]">
          <tr>
            <th className="px-6 py-3 text-left text-gray-900">Item</th>
          </tr>
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <td colSpan="2" className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center justify-center h-full">
                  <Loader />
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.iditemsarea}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-gray-900">{item.items}</span>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default GridListItems;
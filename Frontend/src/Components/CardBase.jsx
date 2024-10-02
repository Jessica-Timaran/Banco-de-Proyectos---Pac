import { Card, Metric, Text, Flex, ProgressBar } from '@tremor/react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export function CardBase({ title, progressText, buttonTex, route }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <Card className='max-w-sm 2xl:w-full 2xl:h-full md:w-57'>
      <Text>{title}</Text>
        <Text>{progressText}</Text>
      <Flex className='mt-4'>
      <button
          className='text-verde bg-transparent border-none cursor-pointer'
          onClick={handleClick}
        >
          <u>{buttonTex}</u>
        </button>
      </Flex>
    </Card>
  );
}

CardBase.propTypes = {
  title: PropTypes.string.isRequired,
  progressText: PropTypes.string.isRequired,
  buttonTex: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};


export default CardBase;
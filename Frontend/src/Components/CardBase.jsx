import { Card, Metric, Text, Flex, ProgressBar } from '@tremor/react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export function CardBase({ title, metricValue, progressText, buttonTex, route }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <Card className='max-w-sm 2xl:w-full 2xl:h-full md:w-44'>
      <Text>{title}</Text>
      <Metric>{metricValue}</Metric>
      <Flex className='mt-4'>
        <Text>{progressText}</Text>
        <button
          className='text-Verde bg-transparent border-none cursor-pointer'
          onClick={handleClick}
        >
          <u>{buttonTex}</u>
        </button>
      </Flex>
      <ProgressBar value={20} color='transparent' className="hidden" />
    </Card>
  );
}

CardBase.propTypes = {
  title: PropTypes.string.isRequired,
  metricValue: PropTypes.string.isRequired,
  progressText: PropTypes.string.isRequired,
  buttonTex: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};


export default CardBase;
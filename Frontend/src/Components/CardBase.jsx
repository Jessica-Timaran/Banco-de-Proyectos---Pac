import { Card, Metric, Text, Flex, ProgressBar, Button } from '@tremor/react';

export function CardBase({title, metricValue, progressText, buttonTex}) {
  return (
    <Card className='max-w-sm 2xl:w-full 2xl:h-full md:w-44'>
      <Text>{title}</Text>
      <Metric>{metricValue}</Metric>
      <Flex className='mt-4'>
        <Text>{progressText}</Text>
        
        <a className='text-green-500' href=""><u>Ver detalle</u></a>
      </Flex>
      <ProgressBar value={20} color='transparent' className="hidden" />
    </Card>
  );

}
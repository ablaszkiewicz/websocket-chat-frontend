import { Flex, Text } from '@chakra-ui/react';
import { Props } from 'framer-motion/types/types';

interface props {
  message: string;
}

export const SystemMessageListItem = (props: Props) => {
  return (
    <Flex>
      <Text fontSize={'xs'} color={'gray.500'}>
        {props.message}
      </Text>
    </Flex>
  );
};

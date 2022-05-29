import { AddIcon } from '@chakra-ui/icons';
import { Button, Center, Flex, Text, VStack } from '@chakra-ui/react';
import { useStore } from '../../zustand/store';
import { RoomListItem } from './RoomListItem';

export const RoomsPanel = () => {
  const sessionKey = useStore((store) => store.sessionKey);
  return (
    <VStack
      w={'100%'}
      borderRadius={'5'}
      flexGrow={1}
      overflowY={'auto'}
      css={scrollbarStyle}
      backgroundColor={'gray.900'}
      shadow={'inner'}
      spacing={1}
      p={1}
    >
      <RoomListItem name={'CBC'} />
      <RoomListItem name={'EBC'} />
      <Text>{sessionKey}</Text>
    </VStack>
  );
};

const scrollbarStyle = {
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'gray',
    borderRadius: '24px',
  },
};

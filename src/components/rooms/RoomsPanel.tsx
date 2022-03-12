import { AddIcon } from '@chakra-ui/icons';
import { Button, Center, Flex, VStack } from '@chakra-ui/react';
import { RoomListItem } from './RoomListItem';

export const RoomsPanel = () => {
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
      <RoomListItem />
      <Button leftIcon={<AddIcon />} variant={'ghost'} w={'100%'}>
        Add room
      </Button>
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

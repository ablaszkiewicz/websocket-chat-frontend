import { ArrowForwardIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Button, Flex, HStack, IconButton, Spacer, Text, VStack } from '@chakra-ui/react';

interface Props {
  name: string;
}

export const RoomListItem = (props: Props) => {
  return (
    <Flex backgroundColor={'gray.800'} w={'100%'} p={2} borderRadius={5}>
      <VStack align={'baseline'} spacing={0}>
        <Text>{props.name}</Text>
        <Text fontSize={'xs'}>0 users</Text>
      </VStack>

      <Spacer />
      <IconButton aria-label='Join' icon={<ArrowForwardIcon />} h={'100%'} />
    </Flex>
  );
};

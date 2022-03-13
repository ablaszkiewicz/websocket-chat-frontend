import { SettingsIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Text, Spacer } from '@chakra-ui/react';
import { useStore } from '../../zustand/store';

export const SettingsHeader = () => {
  const username = useStore((store) => store.username);
  return (
    <Flex w={'100%'} px={2} borderRadius={5}>
      <Text my={'auto'} ml={2}>
        {username}
      </Text>
      <Spacer />
      <IconButton aria-label='Settings' icon={<SettingsIcon />} variant={'ghost'} />
    </Flex>
  );
};

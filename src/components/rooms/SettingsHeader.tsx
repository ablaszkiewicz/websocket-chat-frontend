import { SettingsIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Text, Spacer, VStack, useDisclosure, Skeleton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useStore } from '../../zustand/store';
import { SettingsModal } from '../settings/SettingsModal';

export const SettingsHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const username = useStore((store) => store.username);

  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSkeleton(false);
    }, 500);
  }, [username]);

  return (
    <>
      <SettingsModal isOpen={isOpen} onClose={onClose} />
      <Flex w={'100%'} p={2} backgroundColor={'gray.800'} borderRadius={5}>
        <VStack align={'baseline'} spacing={0}>
          <Skeleton isLoaded={!showSkeleton} mb={1}>
            <Text>{username ? username : 'placeholder'}</Text>
          </Skeleton>

          <Skeleton isLoaded={!showSkeleton}>
            <Text fontSize={'xs'} color={'gray.400'}>
              Connected as a guest
            </Text>
          </Skeleton>
        </VStack>

        <Spacer />
        <IconButton my={'auto'} aria-label='Settings' icon={<SettingsIcon />} onClick={onOpen} variant={'ghost'} />
      </Flex>
    </>
  );
};

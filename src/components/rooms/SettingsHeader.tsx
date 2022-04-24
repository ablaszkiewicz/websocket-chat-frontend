import { SettingsIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Text, Spacer, VStack, useDisclosure, Skeleton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useStore } from '../../zustand/store';
import { SettingsLoginModal } from '../settings/SettingsLoginModal';
import { SettingsLogoutModal } from '../settings/SettingsLogoutModal';

export const SettingsHeader = () => {
  const { isOpen: loginIsOpen, onOpen: loginOnOpen, onClose: loginOnClose } = useDisclosure();
  const { isOpen: logoutIsOpen, onOpen: logoutOnOpen, onClose: logoutOnClose } = useDisclosure();
  const username = useStore((store) => store.username);
  const isGuest = useStore((store) => store.isGuest);

  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (!username) return;

    setTimeout(() => {
      setShowSkeleton(false);
    }, 500);
  }, [username]);

  const openModal = () => {
    if (isGuest) {
      loginOnOpen();
    } else {
      logoutOnOpen();
    }
  };

  return (
    <>
      <SettingsLoginModal isOpen={loginIsOpen} onClose={loginOnClose} />
      <SettingsLogoutModal isOpen={logoutIsOpen} onClose={logoutOnClose} />
      <Flex w={'100%'} p={2} backgroundColor={'gray.800'} borderRadius={5} shadow={'inner'}>
        <VStack align={'baseline'} spacing={0}>
          <Skeleton isLoaded={!showSkeleton} mb={1}>
            <Text>{username ? username : 'placeholder'}</Text>
          </Skeleton>

          <Skeleton isLoaded={!showSkeleton}>
            <Text fontSize={'xs'} color={'gray.400'}>
              {isGuest ? 'Connected as a guest' : 'Logged in'}
            </Text>
          </Skeleton>
        </VStack>

        <Spacer />
        <IconButton
          my={'auto'}
          aria-label='Settings'
          icon={<SettingsIcon />}
          onClick={() => openModal()}
          variant={'ghost'}
        />
      </Flex>
    </>
  );
};

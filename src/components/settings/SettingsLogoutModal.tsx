import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsLogoutModal = (props: Props) => {
  const [loginLoading, setLoginLoading] = useState(false);
  const { loginAsGuest } = useAuth();

  const logout = async () => {
    setLoginLoading(true);
    await loginAsGuest();
    setLoginLoading(false);
    props.onClose();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay backdropFilter='auto' backdropBlur='2px' />
      <ModalContent>
        <ModalHeader>Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>You are already logged in</ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' isLoading={loginLoading} onClick={() => logout()}>
            Logout
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

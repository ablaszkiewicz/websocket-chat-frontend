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

export const SettingsLoginModal = (props: Props) => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, register } = useAuth();

  const tryRegister = async () => {
    setRegisterLoading(true);
    const succeeded = await register(username, password);

    if (succeeded) {
      await login(username, password);
      setRegisterLoading(false);
      props.onClose();
    }
  };

  const tryLogin = async () => {
    setLoginLoading(true);
    const succeeded = await login(username, password);

    setLoginLoading(false);
    if (succeeded) {
      props.onClose();
    }
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay backdropFilter='auto' backdropBlur='2px' />
      <ModalContent>
        <ModalHeader>Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={2}>
            <FormLabel>Username</FormLabel>
            <Input placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' isLoading={registerLoading} mr={3} onClick={() => tryRegister()}>
            Register
          </Button>
          <Button colorScheme='blue' isLoading={loginLoading} onClick={() => tryLogin()}>
            Login
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

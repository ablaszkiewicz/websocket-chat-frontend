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

export const SettingsModal = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const tryLogin = async () => {
    setLoading(true);
    const succeeded = await login(username, password);

    setLoading(false);
    if (succeeded) {
      props.onClose();
    }
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay backdropFilter='auto' backdropBlur='2px' />
      <ModalContent>
        <ModalHeader>Logowanie / rejestracja</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={2}>
            <FormLabel>Nazwa użytkownika</FormLabel>
            <Input placeholder='Nazwa użytkownika...' value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Hasło</FormLabel>
            <Input placeholder='Hasło...' value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' disabled mr={3}>
            Zarejestruj
          </Button>
          <Button colorScheme='blue' isLoading={loading} onClick={() => tryLogin()}>
            Zaloguj
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

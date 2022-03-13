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
} from '@chakra-ui/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = (props: Props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay backdropFilter='auto' backdropBlur='2px' />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Halo</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

import { Flex, Heading, Spacer } from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
export const Navbar = () => {
  return (
    <Flex>
      <Heading>Websocket chat</Heading>
      <Spacer />
      <ColorModeSwitcher justifySelf='flex-end' />
    </Flex>
  );
};

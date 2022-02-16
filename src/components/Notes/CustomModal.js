import React from 'react';
import {
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
  } from '@chakra-ui/react'

const CustomModal = (props) => {
  return (
    <div>
    <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            {props.children}
        </ModalBody>

        <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={props.close}>
            Close
        </Button>
        <Button variant='ghost'>Secondary Action</Button>
    </ModalFooter>
</ModalContent></div>
  )
};

export default CustomModal;

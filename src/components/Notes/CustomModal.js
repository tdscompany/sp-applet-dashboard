import React from 'react';
import {
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
  } from '@chakra-ui/react'
  import { ContractIcon } from '../CreateIcon/CreateIcon';

const CustomModal = (props) => {
  return (
    <div>
    <ModalContent>
        <ModalHeader>{props.mHeader}</ModalHeader>
        <ModalBody>
            {props.children}
        </ModalBody>

        <ModalFooter>
        <Button colorScheme='#F16F96' mr={3} onClick={props.saveNote}>
            {props.primaryBtn}
        </Button>
        <ContractIcon className='contract-icon' onClick={props.close} />
    </ModalFooter>
</ModalContent></div>
  )
};

export default CustomModal;

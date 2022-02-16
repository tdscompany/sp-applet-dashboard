import React from 'react';
import {
    Modal,
    ModalOverlay,
    useDisclosure,
    Textarea
  } from '@chakra-ui/react'
  import { ExpandIcon } from '../CreateIcon/CreateIcon';
  import { CopyIcon, DeleteIcon } from '@chakra-ui/icons'
import CustomModal from './CustomModal';

const Notes = () => {

    const [notes, setNotes] = React.useState([]);
    const [noteInput, setNoteInput] = React.useState('');
    const inputEl = React.useRef()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleSave = () => {
        setNotes([...notes, noteInput]);
        setNoteInput('');
        if(isOpen) onClose()
        inputEl.current.focus();
    }

  return (
    <div className="notesWrapper">
        <h2>Notas</h2>
        {notes.map(note => (
                <p key={note}>{note}</p>))}
        <div className="notes">
            {/* { notes.length > 0 ? notes.map(note => (
                <p key={note}>{note}</p>
            )) : 
                <input 
                    ref={note}
                    type="text"
                    value={noteInput}
                    className="notesInput"
                    onChange={({target}) => setNoteInput(target.value)}
                />
            } */}
            

            <Textarea 
                    ref={inputEl}
                    type="text"
                    value={noteInput}
                    className="notesTArea"
                    onChange={({target}) => setNoteInput(target.value)}
                    placeholder='clique para adicionar uma nota sobre o comparativo'
                    resize='none'
            />
            <ExpandIcon className='expand-icon' onClick={onOpen}/> 
        </div>
        <button onClick={handleSave}> Salvar nota </button>

        <Modal isOpen={isOpen} onClose={onClose}  isCentered={true} className='note-modal'>
            <ModalOverlay
                bg='blackAlpha.300'
                backdropFilter='blur(10px)'
            />
            <CustomModal
                close={onClose}
                saveNote={handleSave}
                primaryBtn='Salvar nota'
                mHeader={<div className='header-icons'>
                            <CopyIcon w={23} h={23}/>
                            <DeleteIcon w={23} h={23}/>
                        </div>}
            >
                <Textarea 
                    ref={inputEl}
                    type="text"
                    value={noteInput}
                    className="modalTArea"
                    onChange={({target}) => setNoteInput(target.value)}
                    placeholder='clique para adicionar uma nota sobre o comparativo'
                    resize='none'
            />
            </CustomModal>
        </Modal>
    </div>
  )
};

export default Notes;
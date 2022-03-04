import React from 'react';
import {
    Modal,
    ModalOverlay,
    useDisclosure,
    Textarea,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
} from '@chakra-ui/react'
import { ExpandIcon } from '../CreateIcon/CreateIcon';
import { CopyIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons'
import CustomModal from './CustomModal';

import {getDatabaseData, getDatabaseUsers, getDatabaseNotes, writeFirstUserNote, pushDataToExistingComparison, pushDataToNewComparison } from './DatabaseConnection';
import { getUserComparisons, getComparisonsMatch } from './Comparisons';
import './index.scss';

const Notes = ({ selectedProj }) => {

    const [noteInput, setNoteInput] = React.useState('');
    const [comparisonMatch, setComparisonMatch] = React.useState([]);
    const [existingNotes, setExistingNotes] = React.useState([]);

    const inputEl = React.useRef();

    const { isOpen: isTxtModalOpen, onOpen: onTxtModalOpen, onClose: onTxtModalClose } = useDisclosure();
    const { isOpen: isNoteModalOpen, onOpen: onNoteModalOpen, onClose: onNoteModalClose } = useDisclosure();
    const { isOpen: isAllNoteModalOpen, onOpen: onAllNoteModalOpen, onClose: onAllNoteModalClose } = useDisclosure();
    
    React.useEffect(() => {
        const databaseData  = getDatabaseData();
        const usersDb = getDatabaseUsers(databaseData);
        const userComparisons = getUserComparisons(usersDb, databaseData);
        setComparisonMatch(getComparisonsMatch(userComparisons, selectedProj));
    }, [selectedProj]);
    
    React.useEffect(() => {
        getDatabaseNotes(comparisonMatch, setExistingNotes);
    }, [comparisonMatch]);


    const handleSave = () => {
        if(!getDatabaseData()) {
            writeFirstUserNote(noteInput, selectedProj);
        } else if (comparisonMatch.length > 0){
            pushDataToExistingComparison(noteInput, comparisonMatch);
        } else { 
            pushDataToNewComparison(noteInput, selectedProj);
        }
        setNoteInput('');
        if(isTxtModalOpen) onTxtModalClose();
        inputEl.current.focus();
    }

    const [ firstNote ] = existingNotes;

  return (
    <div className="notesWrapper">
        <h2>Notas</h2>
            {existingNotes.length > 0 
            ? 
                <div className='existing-note notes'>
                    <span key={0}>{firstNote?.date?.slice(0, 5)}</span>
                    <p key={1}>{firstNote?.note?.slice(0, 45)}...</p>
                    <ExpandIcon className='expand-icon' onClick={onNoteModalOpen}/> 
                </div>
            : 
            <div className="tArea notes">
                    <Textarea 
                        ref={inputEl}
                        type="text"
                        value={noteInput}
                        className="notesTArea"
                        onChange={({target}) => setNoteInput(target.value)}
                        placeholder='clique para adicionar uma nota sobre o comparativo'
                        resize='none'
                    />
                    <ExpandIcon className='expand-icon' onClick={onTxtModalOpen}/> 
                </div>
            }
            
        <button className='save_notes' onClick={handleSave}> Salvar nota </button>
        <Menu>
            <MenuButton className='add-see_notes' as={IconButton}
            aria-label='Options'
            icon={<AddIcon />}
            />
            <MenuList >
                <MenuItem onClick={onTxtModalOpen}>nova nota</MenuItem>
                <MenuItem onClick={onAllNoteModalOpen}>notas salvas</MenuItem>
            </MenuList>
        </Menu>

        <Modal isOpen={isTxtModalOpen} onClose={onTxtModalClose}  isCentered={true} className='note-modal'>
            <ModalOverlay
                bg='blackAlpha.300'
                backdropFilter='blur(10px)'
            />
            <CustomModal
                close={onTxtModalClose}
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

        <Modal isOpen={isNoteModalOpen} onClose={onNoteModalClose}  isCentered={true} className='note-modal'>
            <ModalOverlay
                bg='blackAlpha.300'
                backdropFilter='blur(10px)'
            />
            <CustomModal
                close={onNoteModalClose}
                saveNote={handleSave}
                primaryBtn='Salvar nota'
                mHeader={<div className='header-icons'>
                            <CopyIcon w={23} h={23}/>
                            <DeleteIcon w={23} h={23}/>
                        </div>}
            >
                {existingNotes.length > 0 ? <p key={1}>{firstNote.note}</p> : '' }
            </CustomModal>
        </Modal>
        <Modal isOpen={isAllNoteModalOpen} onClose={onAllNoteModalClose}  isCentered={true} className='note-modal'>
            <ModalOverlay
                bg='blackAlpha.300'
                backdropFilter='blur(10px)'
            />
            <CustomModal
                close={onAllNoteModalClose}
                saveNote={handleSave}
                primaryBtn='Salvar nota'
                class='hidden'
                // mHeader={<div className='header-icons'>
                //             <CopyIcon w={23} h={23}/>
                //             <DeleteIcon w={23} h={23}/>
                //         </div>}
            >
                <div className='flex-cards'>
                    {existingNotes.map(note => (
                        <div className='existing-note notes'>
                            <span key={note.date}>{note?.date?.slice(0, 5)}</span>
                            <p key={note.note}>{note?.note?.slice(0, 45)}...</p>
                            <ExpandIcon className='expand-icon' onClick={onNoteModalOpen}/>
                        </div>
                    ))}
                </div>
            </CustomModal>
        </Modal>
    </div>
  )
};

export default Notes;
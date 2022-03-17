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
import {getDatabaseNoteData, getDatabaseUsers, getDatabaseNotes, writeFirstUserNote, pushDataToExistingComparison, pushDataToNewComparison } from '../../services/DatabaseConnection';
import { getUserComparisons, getComparisonsMatch } from './Comparisons';
import './index.scss';
const Notes = ({ selectedProj }) => {

    const [noteInput, setNoteInput] = React.useState('');
    const [comparisonMatch, setComparisonMatch] = React.useState([]);
    const [existingNotes, setExistingNotes] = React.useState([]);
    const [noteId, setNoteId] = React.useState(0);

    const inputEl = React.useRef();

    const { isOpen: isTxtModalOpen, onOpen: onTxtModalOpen, onClose: onTxtModalClose } = useDisclosure();
    const { isOpen: isNoteModalOpen, onOpen: onNoteModalOpen, onClose: onNoteModalClose } = useDisclosure();
    const { isOpen: isAllNoteModalOpen, onOpen: onAllNoteModalOpen, onClose: onAllNoteModalClose } = useDisclosure();
    
    React.useEffect(() => {
        const databaseData  = getDatabaseNoteData();
        const usersDb = getDatabaseUsers(databaseData);
        const userComparisons = getUserComparisons(usersDb, databaseData);
        setComparisonMatch(getComparisonsMatch(userComparisons, selectedProj));
    }, [selectedProj]);
    
    React.useEffect(() => {
        getDatabaseNotes(comparisonMatch, setExistingNotes);
    }, [comparisonMatch]);

    const handleSave = () => {
        if(!getDatabaseNoteData()) {
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

    const copyContent = content => navigator.clipboard.writeText(content);
    const expandNoteModal = id => {
        setNoteId(id);
        onNoteModalOpen();
    }

    const [ firstNote ] = existingNotes;

  return (
    <div className="notesWrapper">
        {/* <RadioGroup value={scrollBehavior} onChange={setScrollBehavior}>
            <Stack direction='row'>
                <Radio value='inside'>inside</Radio>
                <Radio value='outside'>outside</Radio>
            </Stack>
        </RadioGroup> */}

        <h2>Notas</h2>
            {existingNotes.length > 0 
            ? 
                <div className='existing-note notes'>
                    <span key={0}>{firstNote?.date?.slice(0, 5)}</span>
                    <p key={1}>{firstNote?.note?.slice(0, 45)}{firstNote.length > 44 ? '...' : ''}</p>
                     
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
                </div>
            }
            
        {existingNotes.length > 0 ?
            <ExpandIcon className='expand-icon_note-modal' onClick={() => expandNoteModal(0)}/>
        :
            <ExpandIcon className='expand-icon' onClick={onTxtModalOpen}/>
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
                            <CopyIcon w={23} h={23} onClick={() => copyContent(inputEl.current.value)}/>
                            <DeleteIcon w={23} h={23} onClick={() => setNoteInput('')}/>
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
                            <CopyIcon w={23} h={23} onClick={() => copyContent(existingNotes[noteId].note)}/>
                            {/* <DeleteIcon w={23} h={23}/> */}
                        </div>}
                class='hidden'
            >
                {existingNotes.length > 0 ? <p key={1}>{existingNotes[noteId].note}</p> : '' }
            </CustomModal>
        </Modal>
        <Modal isOpen={isAllNoteModalOpen} onClose={onAllNoteModalClose}  isCentered={true} className='note-modal' scrollBehavior='inside' size='5xl'>
            <ModalOverlay
                bg='blackAlpha.300'
                backdropFilter='blur(10px)'
            />
            <CustomModal
                close={onAllNoteModalClose}
                saveNote={handleSave}
                primaryBtn='Salvar nota'
                class='hidden'
            >
                <div className='flex-cards'>
                    {existingNotes.map((note, id) => (
                        <div>
                            <div className='existing-note notes'>
                                <span key={note.date}>{note?.date?.slice(0, 5)}</span>
                                <p key={note.note}>{note?.note?.slice(0, 40)}{note?.note?.length > 40 ? '...' : ''}</p>
                            </div>
                            <ExpandIcon className='expand-icon_modal' onClick={() => expandNoteModal(id)}/>
                        </div>
                    ))}
                </div>
            </CustomModal>
        </Modal>
    </div>
  )
};

export default Notes;
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
import { getDatabase, ref, set, onValue, push } from "firebase/database";
import { app } from '../../services/firebase';
import './index.scss';

const Notes = ({ selectedProj }) => {

    const [usersDb, setUsersDb] = React.useState([]);
    const [noteInput, setNoteInput] = React.useState('');
    const [dbData, setDbData] = React.useState();
    const [userComparisons, setUserComparisons] = React.useState([]);
    const [comparisonMatch, setComparisonMatch] = React.useState([]);
    const [existingNotes, setExistingNotes] = React.useState([]);
    const inputEl = React.useRef();
    const { isOpen: isTxtModalOpen, onOpen: onTxtModalOpen, onClose: onTxtModalClose } = useDisclosure();
    const { isOpen: isNoteModalOpen, onOpen: onNoteModalOpen, onClose: onNoteModalClose } = useDisclosure();
    const userId = localStorage.getItem("userId");
    const date = new Date;

    React.useEffect(() => {
        const db = getDatabase(app);

        const readNoteRef = ref(db, 'notes/');
        onValue(readNoteRef, (snapshot) => {
            const data = snapshot.val();
            setDbData(data);
            for (const user in data) {
                setUsersDb(usersDb => [...usersDb, user]);
            }
        });
    }, [selectedProj]);

    React.useEffect(() => {
        if(usersDb.includes(userId)) {
            const comparisons = Object.keys(dbData[userId]);
            const comparisonsArr = comparisons.map(comparison =>  comparison.split(','));
            setUserComparisons(comparisonsArr);
        }
    }, [dbData, usersDb]);

    React.useEffect(() => {
        const sameLength = userComparisons.filter(comp => comp.length === selectedProj.length);
        // console.log(sameLength)
        const match = sameLength.filter(comparison => comparison.sort().join(',') === selectedProj.sort().join(','));
        // console.log(match)
        if (match.length >= 1 ) {
            // console.log('rodou aqui >=1')
            setComparisonMatch([]);
            setComparisonMatch(match);
        };
        if (match.length === 0) setComparisonMatch([]);
        // console.log('userComparison rodou ', userComparisons);
    }, [userComparisons]);

    React.useEffect(() => {
        if (comparisonMatch.length === 1) {
            const db = getDatabase(app);
            
            const readNoteRef = ref(db, `notes/${userId}/${comparisonMatch.sort().join(',')}`);
            console.log(readNoteRef, 'entrou aqui');
            onValue(readNoteRef, (snapshot) => {
                console.log(snapshot.val(), 'entrou aqui');
                const data = snapshot.val();
                // console.log(data)
                for (const note in data) {
                    if (Object.hasOwnProperty.call(data, note)) {
                        const notes = data[note];
                        setExistingNotes(currValue => [...currValue, notes]);
                    }
                }
                setExistingNotes(data);
            });
            // console.log('comparisonMatch rodou ', comparisonMatch);
        } else {
            setExistingNotes([]);
        }
    }, [comparisonMatch]);

    React.useEffect(() => {
        console.log('existingNotes rodou ', existingNotes);
        const obj = Object.values(existingNotes)[0]
        if(obj) console.log( Object.values(existingNotes)[0].note);
    }, [existingNotes])

    const handleSave = () => {
            if(!dbData) {
                console.log('ran: push data to new user');
                writeFirstUserNote(noteInput);
            } else if (comparisonMatch.length > 0){
                console.log('ran: push data to existing comparison');
                pushDataToExistingComparison(noteInput);
            } else { 
                console.log('ran: push data to new comparison');
                
                pushDataToNewComparison(noteInput);
            }
            setNoteInput('');
            if(isTxtModalOpen) onTxtModalClose();
        inputEl.current.focus();
    }

    const writeFirstUserNote = (note) => {
        const db = getDatabase(app);
        set(ref(db, `notes/${userId}/${selectedProj.sort().join(',')}/0`), {
            note,
            date: date.toLocaleDateString()
        });
    };

    const pushDataToExistingComparison = (note) => {
        const db = getDatabase();
        push(ref(db, `notes/${userId}/${comparisonMatch.sort().join(',')}`), {
            note, 
            date: date.toLocaleDateString()
        });
    };

    const pushDataToNewComparison = (note) => {
        const db = getDatabase();
        push(ref(db, `notes/${userId}/${selectedProj.sort().join(',')}`), {
            note,
            date: date.toLocaleDateString()
        });
    };

  return (
    <div className="notesWrapper">
        <h2>Notas</h2>
            {Object.values(existingNotes).length > 0 
            ? 
                <div className='existing-note notes'>
                    <span key={0}>{Object.values(existingNotes)[0].date.slice(0, 5)}</span>
                    <p key={1}>{Object.values(existingNotes)[0].note.slice(0, 45)}...</p>
                    <ExpandIcon className='expand-icon' onClick={onNoteModalOpen}/> 
                </div>
            : 
                <div className="notes">
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
            
        <button onClick={handleSave}> Salvar nota </button>

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
                {Object.values(existingNotes).length > 0 ? <p key={1}>{Object.values(existingNotes)[0].note}</p> : '' }
            </CustomModal>
        </Modal>
    </div>
  )
};

export default Notes;
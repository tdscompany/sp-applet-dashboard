import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  Modal,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { Line } from 'react-chartjs-2';
import { getDatabaseIndexData } from '../../services/DatabaseConnection';
import CustomModal from '../Notes/CustomModal';

const LineChart = () => {
    const chart = React.useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const databaseData  = getDatabaseIndexData(localStorage.getItem('id'))

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Balanço índices no tempo',
            },
        },
    };

    const labels = Object.keys(databaseData);
    const dbData = Object.values(databaseData);

    const data = {
        labels,
        datasets: [
            {
            label: 'Pessoa ativas na jornada',
            data: dbData.map(value => value.activeParticipants),
            borderColor: '#006FB9',
            backgroundColor: '#006fb97c',
            },
            {
            label: 'Engajamento nos debates',
            data: dbData.map(value => value.debatesEngagements),
            borderColor: '#A6CDE7',
            backgroundColor: '#a6cde77c',
            },
            {
            label: 'Engajamento nas questões',
            data: dbData.map(value => value.divergencesEngagements),
            borderColor: '#7AB4DB',
            backgroundColor: '#7ab4db7c',
            },
            {
            label: 'Engajamento nas divergencias',
            data: dbData.map(value => value.questionsEngagements),
            borderColor: '#DBEBF5',
            backgroundColor: '#DBEBF57c',
            },
        ],
    }

    function addId () {
      console.log(chart.current);
      chart.current.setAttribute('id', 'openIndex');
    }


  return (
    <>
      <Line className='timeIndexes' options={options} data={data} ref={chart} onClick={onOpen}/>
      <Modal isOpen={isOpen} onClose={onClose}  isCentered={true} className='note-modal'>
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px)'
            />
            <CustomModal
              close={onClose}
              class='hidden'>
              <Line className='openedIndexes' options={options} data={data} ref={chart}/>
            </CustomModal>
      </Modal>
    </>
  )
};

export default LineChart;
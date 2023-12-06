import React, { useState} from 'react';
import { List, ListItem, ListItemText, Collapse, IconButton, TextField, Button, Box } from '@mui/material';
import { Add as AddIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon, Delete as DeleteIcon } from '@mui/icons-material';
import ShoppingItem from './ShoppimgItem';
import { Delete as MuiDeleteIcon } from '@mui/icons-material';
import Icon from '@mui/material/Icon';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useHistory, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const ShoppingList = ({ lists, items, onAddList, onAddItem, onEditList, onDeleteList, onEditItem, onDeleteItem }) => {
  const [openList, setOpenList] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const [newListName, setNewListName] = useState('');
  const [showInput, setShowInput] = useState(false);

  const navigate = useNavigate()

  const handleClickList = (listId) => {
    setOpenList((prev) => (prev === listId ? null : listId));
  };

  const handleAddList = () => {
    onAddList(newListName);
    setNewListName('');
    setShowInput(false);
  };
  const onSelectList = (id) => {
      localStorage.setItem('selectedListId', id);
      console.log(id)
      
      navigate(`/`);
  };

  const handleSelectList = (listId) => {
    console.log("asd")
    // Используем navigate для программного перехода на страницу Home с выбранным списком
    navigate(`/`);
  };

  const handleDeleteList = (listId) => {
    
    // Предотвращаем перенаправление при удалении списка
    onDeleteList(listId);
    

  };

return (
  <Box sx={{ display: 'flex', gap: '50px', flexDirection: 'column', alignItems: 'center' , width: '100%', hight : '100%', maxWidth: '700px', margin: '0 auto'}}>
   
      <List sx={{ width: '600px', marginLeft: '17%' }}>
        {lists.map((list) => (
            <Box
            key={list.id}
            sx={{display:"flex" , alignItems: 'center'}}
          >
              <Box 
                onClick={() => onSelectList(list.id)}
              sx={{
                  border: '1px solid black',
                  borderRadius: '30px',
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '5px',
                  background:  "#604833",
                  color: '#dfd7ba',
                  textAlign: 'center',
                  height: '60px',
                  width: '500px',
                  "&:hover": {
                    background: "#604833", // Цвет фона при наведении курсора
                  },
            }}>
                 <span style={{ marginLeft: '10px', marginRight: '10px' }}>
                    {list.name}
                  </span>
              </Box>
                <Button onClick={(e) => handleDeleteList(list.id)} sx={{ marginTop: '-10px', width: '5px', height: '20px' ,"&:hover": {
      backgroundColor: 'transparent' },}}>
                   <DeleteIcon sx={{ alignItems: 'center', color: "black", marginRight: '130px'}} />
                </Button>
 
            </Box>
        ))}
      </List>
      {showInput && (
        <Box>
          <TextField label="" value={newListName} onChange={(e) => setNewListName(e.target.value)}
          InputProps={{
            style: {
              borderRadius: '30px',
              border: '1px solid black',
                // Цвет выделения при фокусе
              
            }
             // Это свойство отключает стандартное подчеркивание
          }}
          sx={{
            backgroundColor: '#604833', // Задаем фон
            borderRadius: '30px',
            border: '1px solid black',
            width: '450px', 
            
            marginLeft: '10px',
            
            }} />
          <Button
            variant="fab"
            color="primary"
            onClick={handleAddList}
            sx={{  marginTop: '5px', backgroundColor: '#fff7e2ee', width: '40px', height: '50px', borderRadius: '60px', }}
            style={{ fontSize: '30px' }}
            startIcon={<AddCircleIcon sx={{  color: "#604833", alignItems: 'center',  marginLeft: '10px', width: '40px', height: '50px' }} />}
          >
          </Button>
        </Box>
      )}
      {!showInput && (
        <Button
          variant="fab"
          color="primary"
          onClick={() => setShowInput(true)}
          sx={{
            marginTop: '0px',
            backgroundColor: '#fff7e2ee',
            width: '30px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            
          }}
          style={{ fontSize: '50px' }}
          startIcon={<AddCircleIcon sx={{  color: "#604833", alignItems: 'center',  marginLeft: '10px', width: '50px', height: '50px' }} />}
        >
        </Button>
      )}
    </Box>
);
};


export default ShoppingList;

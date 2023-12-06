import React, { useState, useEffect } from 'react';
import { List, Box, ListItem, ListItemText, Collapse, TextField, Button, IconButton, Container } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon, Delete as DeleteIcon } from '@mui/icons-material';
import ShoppingItem from '../components/ShoppimgItem';
import { Delete as MuiDeleteIcon } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const Home = ({ lists, items, onAddItem, onEditList, onDeleteList, onEditItem, onDeleteItem }) => {
  const [selectedList, setSelectedList] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const { listId } = useParams();
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemName, setEditingItemName] = useState('');


  const onSelectList = (list) => {
    setSelectedList(list);
  };
  useEffect(() => {
    // Извлекаем сохраненный идентификатор списка из localStorage
    const selectedListId = localStorage.getItem('selectedListId');
    if (selectedListId) {
      const selected = lists.find((list) => list.id === parseInt(selectedListId, 10));
      onSelectList(selected);
    }
  }, [lists]);


  const handleItemClick = (list) => {
    onSelectList(list);
    setSelectedList(list); // Обновление состояния выбранного списка
  };

  const handleAddItem = () => {
    if (selectedList && selectedList.id) {
      onAddItem(selectedList.id, newItemName);
      setNewItemName('');
      setIsAddingItem(false);
    }
  };

  const handleEditListName = () => {
    const newName = prompt('Enter new list name:', selectedList.name);
    if (newName !== null && newName !== '') {
      onEditList(selectedList.id, newName);
    }
  };

  const handleDeleteList = () => {
    onDeleteList(selectedList.id);
    onSelectList(null);
    setSelectedList(null); // Очистка выбранного списка
  };

  const handleEditItem = (itemId, newName) => {
    onEditItem(itemId, newName);
  };

  const handleDeleteItem = (itemId) => {
    onDeleteItem(itemId);
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', alignItems: 'center' }}>
      {selectedList ? (
        <>
          <List>
            <div key={selectedList.id}>
              <ListItem button onClick={() => onSelectList(selectedList)} sx={{
                //border: '1px solid black',

                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '5px',
                height: '60px',
                background: "#604833",
                width: '550px',
                borderRadius: '30px',
                fontSize: '20px !important',
                color: '#dfd7ba',
                textAlign: 'center',
                "&:hover": {
                  background: "#604833", // Цвет фона при наведении курсора
                },

              }}>
                <ListItemText
                  primary={
                    <span
                      contentEditable={true}
                      onBlur={(e) => {
                        const newName = e.target.textContent.trim();
                        if (newName !== selectedList.name) {
                          onEditList(selectedList.id, newName);
                        }
                      }}
                    >
                      {selectedList.name}
                    </span>
                  }
                />
              </ListItem>

              <Collapse in={true} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {(items || [])
                    .filter((item) => item.listId === selectedList.id)
                    .map((item) => (
                      <div key={item.id}

                        style={{
                          display: 'center',
                          marginLeft: '40px',
                          alignItems: 'center',
                          borderRadius: '30px',
                          flexDirection: 'row',
                          background: '#dfd7ba',
                          width: '470px',
                          marginBottom: '10px',
                          height: '47px',
                          //justifyContent: 'space-between',
                          color: 'black',
                          fontFamily: 'serif',
                          gap: '10px' ,
                          
                        }}
                        sx={{"&:hover": {
                          backgroundColor: 'transparent' }}}
                      >
                        <ListItem button sx={{height:'45px', alignItems: 'center', justifyContent: 'center',}}>
                          <ListItemText 
                            primary={
                              editingItemId === item.id ? (
                                <TextField
                                  label=""
                                  value={editingItemName}
                                  onChange={(e) => setEditingItemName(e.target.value)}
                                  onBlur={() => {
                                    handleEditItem(item.id, editingItemName);
                                    setEditingItemId(null);
                                  }}
                                  
                                  autoFocus
                                  
                                  InputProps={{
                                    style: {
                                      borderRadius: '30px',
                                      border: '1px solid black',
                                      //backgroundColor: '#dfd7ba',
                                      width: '470px',
                                      height: '50px',
                                      "&:focus": {
                                        outline: 'none', // Убираем рамку при фокусе
                                      },
                                      top: 0, // Явное указание значения top
                                      left: '0%', // Установка в 50% центрирует поле по горизонтали
                                      transform: 'translateX(-3.5%)', // Добавленный паддинг слева, чтобы текст не касался границы
                                    },
                                  }}
                                  
                                  
                                />
                              ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <span
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                      setEditingItemId(item.id);
                                      setNewItemName(item.name);
                                    }}
                                  >
                                    {item.name}
                                  </span>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Button onClick={() => onDeleteItem(item.id)} sx={{ width: '5px', height: '20px'  ,"&:hover": {
      backgroundColor: 'transparent' }}}>
                                      <DeleteIcon sx={{ alignItems: 'center', color: "black" }} />
                                    </Button>
                                    <Button onClick={() => setEditingItemId(item.id)} sx={{ width: '5px', height: '20px'  ,"&:hover": {
      backgroundColor: 'transparent' }}}>
                                      <BorderColorIcon sx={{ alignItems: 'center', color: "black" }} />
                                    </Button>
                                  </div>
                                </div>
                              )
                            }
                          />
                        </ListItem>
                      </div>
                    ))}
                  <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 1, marginTop: '20px' }}>
                    {isAddingItem ? (
                      <>
                        <TextField
                          label=""
                          value={newItemName}
                          onChange={(e) => setNewItemName(e.target.value)}
                          autoFocus
                          InputProps={{
                            style: {
                              borderRadius: '30px',
                              border: '1px solid black',
                              backgroundColor: '#dfd7ba',
                              marginLeft: '40px',
                              width: '450px', 
                              height: '50px',
                              marginTop: '20px',
                                // Цвет выделения п,ри фокусе
                              
                            }
                             // Это свойство отключает стандартное подчеркивание
                          }}
                          
                        />
                        <Button
                          variant="fab"
                          color="primary"
                          onClick={handleAddItem}
                          sx={{ marginTop: '20px', marginLeft: '30px', width: '30px', height: '50px', borderRadius: '70px' ,"&:hover": {
                            backgroundColor: 'transparent' }}}
                          
                          startIcon={<AddCircleIcon sx={{ alignItems: 'center', color:  "#dfd7ba", marginLeft: '10px', width: '40px', height: '40px', border: "1px solid black", borderRadius: '30px'}} />}
                        >
                        </Button>
                      </>
                    ) : (
                      <Button variant="fab" color= "#dfd7ba" onClick={() => setIsAddingItem(true)}
                        sx={{ marginTop: '5px', marginLeft: '250px', backgroundColor: "#fff7e2ee", width: '40px', height: '50px', borderRadius: '60px' ,"&:hover": {
                          backgroundColor: 'transparent' } }}
                        style={{ fontSize: '30px' }}
                        startIcon={<AddCircleIcon sx={{ alignItems: 'center', color:  "#dfd7ba", marginLeft: '10px', width: '40px', height: '50px' }} />}
                      >
                      </Button>
                    )}
                  </Box>
                </List>
              </Collapse>
            </div>
          </List>


        </>
      ) : (
        <List>
          {lists.map((list) => (
            <div key={list.id}>
              <ListItem button onClick={() => onSelectList(list)}
                sx={{
                  border: '1px solid black',
                  borderRadius: '20px',
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '5px',
                  background: "#dfd7ba",
                  width: '400px',
                }}>
                <ListItemText primary={list.name} />
              </ListItem>
            </div>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Home;



import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, IconButton, TextField, Button, Box } from '@mui/material';
import { Add as AddIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon, Delete as DeleteIcon } from '@mui/icons-material';
import ShoppingItem from './ShoppimgItem';

const ShoppingList = ({ lists, items, onAddList, onAddItem, onEditList, onDeleteList, onEditItem, onDeleteItem }) => {
  const [openList, setOpenList] = useState(null);
  const [newListName, setNewListName] = useState('');

  const handleClickList = (listId) => {
    setOpenList((prev) => (prev === listId ? null : listId));
  };

  const handleAddList = () => {
    onAddList(newListName);
    setNewListName('');
  };

  const handleEditList = (listId, newName) => {
    onEditList(listId, newName);
  };

  const handleDeleteList = (listId) => {
    onDeleteList(listId);
    setOpenList(null); 
  };

  const deleteItem = (itemId) => {
    onDeleteItem(itemId);
  };

  return (
    <div>
        <Box sx={{ display: 'flex', gap:"20px",flexDirection:'column' , alignItems: 'center'}}>
            <TextField label="New List" value={newListName} onChange={(e) => setNewListName(e.target.value)} />
            <Button variant="contained" color="primary" onClick={handleAddList}>
                Add List
            </Button>
        </Box>
      

      <List>
        {lists.map((list) => (
          <div key={list.id}>
            <ListItem button onClick={() => handleClickList(list.id)}>
              <ListItemText primary={list.name} />
              {openList === list.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              <IconButton onClick={() => handleDeleteList(list.id)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Collapse in={openList === list.id} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ShoppingItem
                  listId={list.id}
                  items={items}
                  onAddItem={onAddItem}
                  onEditItem={onEditItem}
                  onDeleteItem={deleteItem}
                />
              </List>
            </Collapse>
            <div style={{marginTop: '10px'}}>
                <Button
                    sx={{ mr: 2 }}
                variant="outlined"
                color="primary"
                onClick={() => {
                    const newName = prompt('Enter new list name:', list.name);
                    if (newName !== null && newName !== '') {
                    handleEditList(list.id, newName);
                    }
                }}
                >
                Edit List
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => handleDeleteList(list.id)}>
                Delete List
                </Button>
            </div>
            
          </div>
        ))}
      </List>
    </div>
  );
};

export default ShoppingList;

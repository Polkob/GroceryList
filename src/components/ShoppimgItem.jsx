import React, { useState } from 'react';
import { List , Box, ListItem, ListItemText, Collapse, TextField, Button, IconButton, Container } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon, Delete as DeleteIcon } from '@mui/icons-material';

const ShoppingItem = ({ listId, items, onAddItem, onEditItem, onDeleteItem }) => {
  const [openItem, setOpenItem] = useState(null);
  const [newItemName, setNewItemName] = useState('');

  const handleClickItem = (itemId) => {
    setOpenItem((prev) => (prev === itemId ? null : itemId));
  };

  const handleAddItem = () => {
    onAddItem(listId, newItemName);
    setNewItemName('');
  };

  const handleEditItem = (itemId, newName) => {
    onEditItem(itemId, newName);
  };

  const handleDeleteItem = (itemId) => {
    onDeleteItem(itemId);
    setOpenItem(null); 
  };

  const filteredItems = items.filter((item) => item.listId === listId);

  return (
    <div>
        <Container maxWidth="sm">
            <List>
            {filteredItems.map((item) => (
            <div key={item.id} style={{display: 'flex', alignItems: 'center', flexDirection: 'row', gap:"20px"}}>
                <ListItem button onClick={() => handleClickItem(item.id)}>
                <ListItemText primary={item.name} />
                <IconButton onClick={() => handleDeleteItem(item.id)} color="secondary">
                    <DeleteIcon />
                </IconButton>
                </ListItem>
                <List component="div" disablePadding>
                </List>
                <Button
                variant="outlined"
                color="primary"
                sx={{width: '200px'}}
                onClick={() => {
                    const newName = prompt('Enter new item name:', item.name);
                    if (newName !== null && newName !== '') {
                    handleEditItem(item.id, newName);
                    }
                }}
                >
                Edit Item
                </Button>
            </div>
            ))}
        </List>

            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' , gap: 1 }}>
                <TextField label="New Item" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} />
                <Button variant="contained" color="primary" onClick={handleAddItem}>
                    Add Item
                </Button>

            </Box>
        </Container>
    


    </div>
  );
};

export default ShoppingItem;

import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import { CssBaseline } from '@mui/material';
import Home from './pages/Home';

import ShoppingList from './components/ShoppingList';

const App = () => {
  const [lists, setLists] = useState([]);
  const [items, setItems] = useState([]);

  const addList = (listName) => {
    setLists([...lists, { id: Date.now(), name: listName }]);
  };

  const addItem = (listId, itemName) => {
    setItems([...items, { id: Date.now(), listId, name: itemName }]);
  };

  const editList = (listId, newName) => {
    setLists((prevLists) =>
      prevLists.map((list) => (list.id === listId ? { ...list, name: newName } : list))
    );
  };

  const deleteList = (listId) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
    // Also delete associated items
    setItems((prevItems) => prevItems.filter((item) => item.listId !== listId));
  };

  const editItem = (itemId, newName) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === itemId ? { ...item, name: newName } : item)));
  };

  const deleteItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <BrowserRouter>
      <CssBaseline />
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage isExist={true} />} />
          <Route path="/register" element={<AuthPage isExist={false} />} />

          <Route
            path="/list"
            element={
              <ShoppingList
                lists={lists}
                items={items}
                onAddList={addList}
                onAddItem={addItem}
                onEditList={editList}
                onDeleteList={deleteList}
                onEditItem={editItem}
                onDeleteItem={deleteItem}
              />
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

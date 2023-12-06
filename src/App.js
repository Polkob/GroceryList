import React, { Fragment, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import { CssBaseline } from '@mui/material';
import Home from './pages/Home';

import ShoppingList from './components/ShoppingList';

const App = () => {
  const [lists, setLists] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
 
 
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

  const location = useLocation()

  const [user,setUser] = useState(false)

  const renderHeader = location.pathname !== "/login" && location.pathname !== "/register"



  return (
    <Fragment>
      <CssBaseline />
      <div style={{ maxWidth: '2200px', margin: '0 auto', backgroundColor: '#fff7e2ee' }}>
         {renderHeader && <Header user={user} setUser={setUser}/> }


        <Routes>
          <Route
          path="/"
          element={
            user ? (
              <Home
                lists={lists}
                items={items}
                selectedList={selectedList}
                onSelectList={setSelectedList}
                onAddItem={addItem}
                onEditList={editList}
                onDeleteList={deleteList}
                onEditItem={editItem}
                onDeleteItem={deleteItem}
              />
            ) : (
              <Navigate to="/login"/>
            )
          }
           />
          <Route path="/login" element={<AuthPage setUser={setUser} isExist={true} />} />
          <Route path="/register" element={<AuthPage setUser={setUser} isExist={false}/>} />
          <Route
            path="/list"
            element={
              <ShoppingList
                lists={lists}
                onSelectList={setSelectedList}
                onAddList={addList}
                onDeleteList={deleteList}
              />
            }
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Fragment>
  );
};

export default App;


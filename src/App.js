import React, { Component } from 'react';

import styles from './container.module.css'

import Form from './components/Form/Form';
import Contacts from './components/Contacts/Contacts';
import Filter from './components/Filter/Filter';

class App extends Component {
  state = {
    contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
    filter: '',
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
  }

  componentDidMount() {
    const localContacts = JSON.parse(localStorage.getItem('contacts'));
    if (localContacts) {
      this.setState({ contacts: localContacts })
    }
    
  }

  formSubmit = data => {
    const check = this.state.contacts.find(contact =>
      contact.name === data.name);
  
    check ?
      alert(`${data.name} is already in contacts`)
     :      
      this.setState(prevState => ({
      contacts: [...prevState.contacts, data],
    }))        
  }

  changeFilter = evt => {
    const { value } = evt.currentTarget;
    this.setState({ filter: value });
  }

  deleteContact = (contactNum) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.number !== contactNum),
    }))
    
  }

  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter));
   
    return (
      <div className={styles.container}>
        <Form option="Phonebook" submit={this.formSubmit} />
        <h2 className={styles.contactList}>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter}/>
        <Contacts list={filteredContacts} onDeleteContact={this.deleteContact}/>
      </div>
    );
  }
}

export default App;

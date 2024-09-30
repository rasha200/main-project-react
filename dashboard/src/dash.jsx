import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactMessages = ({ userRole }) => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/contacts');
                setContacts(response.data);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        fetchContacts();
    }, []);

    const deleteContact = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/contacts/${id}`);
            setContacts(contacts.filter(contact => contact.id !== id)); // Remove deleted contact from state
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    return (
        <div>
            <h1>Contact Messages</h1>
            <ul>
                {contacts.map(contact => (
                    <li key={contact.id}>
                        <p>{contact.message}</p>
                        {userRole === 'Manager' && (
                            <button onClick={() => deleteContact(contact.id)}>Delete</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactMessages;

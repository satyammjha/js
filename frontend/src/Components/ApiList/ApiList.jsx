import React, { useEffect, useState } from 'react';

const ApiList = () => {
    const [data, setData] = useState({ keys: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newKey, setNewKey] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editedKey, setEditedKey] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/keys')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const saveToLocalStorage = (keys) => {
        localStorage.setItem('apiKeys', JSON.stringify(keys));
    };

    const handleAddKey = () => {
        if (newKey.trim()) {
            fetch('http://localhost:5000/api/keys', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: newKey })
            })
                .then(response => response.json())
                .then(() => {
                    setData(prevData => ({
                        keys: [...prevData.keys, newKey]
                    }));
                    setNewKey('');
                })
                .catch(error => setError(error));
        }
    };

    const handleDeleteKey = (index) => {
        fetch(`http://localhost:5000/api/keys/${index}`, {
            method: 'DELETE'
        })
            .then(() => {
                setData(prevData => ({
                    keys: prevData.keys.filter((_, i) => i !== index)
                }));
            })
            .catch(error => setError(error));
    };

    const handleEditKey = (index) => {
        setEditIndex(index);
        setEditedKey(data.keys[index]);
    };

    const handleUpdateKey = () => {
        if (editedKey.trim()) {
            fetch(`http://localhost:5000/api/keys/${editIndex}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: editedKey })
            })
                .then(() => {
                    setData(prevData => ({
                        keys: prevData.keys.map((key, index) => index === editIndex ? editedKey : key)
                    }));
                    setEditIndex(null);
                    setEditedKey('');
                })
                .catch(error => setError(error));
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <div>
                <h1 className='ml-[40vw]'>API Keys:</h1>
                <div className='ml-[38vw] mt-[13px]'>
                    <input
                        className='p-2 rounded-lg'
                        value={newKey}
                        onChange={(e) => setNewKey(e.target.value)}
                        placeholder="Enter new API key"
                    />
                    <button onClick={handleAddKey} className='ml-5 p-2'>Add Key</button>
                </div>
            </div>
            <ul>
                {data.keys.map((key, index) => (
                    <li key={index}>
                        {editIndex === index ? (
                            <>
                                <input
                                    value={editedKey}
                                    onChange={(e) => setEditedKey(e.target.value)}
                                    placeholder="Edit key"
                                />
                                <button onClick={handleUpdateKey} className='ml-[10px] p-2'>
                                    Update
                                </button>
                                <button onClick={() => setEditIndex(null)} className='ml-[10px] p-2'>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <div className='flex ml-[7vw] mt-[10vh]'>
                                    <p className='text-[25px] bold bg-[#242424] p-3 rounded-lg ml-[60%]'>{key}</p>
                                    <button onClick={() => handleEditKey(index)} className='ml-[10px] p-2'>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteKey(index)} className='ml-[15px] p-2'>
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default ApiList;
import React, { useEffect, useState } from 'react';


const ApiList = () => {
    const API_URL = "http://localhost:5001";
    const [data, setData] = useState({ entries: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newEntry, setNewEntry] = useState({ API: '', Id: '' });
    const [editIndex, setEditIndex] = useState(null);
    const [editedEntry, setEditedEntry] = useState({ API: '', Id: '' });

    useEffect(() => {
        fetch(API_URL + '/api/keys')
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

    const handleAddEntry = () => {
        if (newEntry.API && newEntry.Id) {
            fetch(API_URL + '/api/keys', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEntry)
            })
                .then(response => response.json())
                .then(() => {
                    setData(prevData => ({
                        entries: [...prevData.entries, newEntry]
                    }));
                    setNewEntry({ API: '', Id: '' });
                })
                .catch(error => setError(error));
        }
    };

    const handleDeleteEntry = (index) => {
        fetch(`${API_URL}/api/keys/${index}`, {
            method: 'DELETE'
        })
            .then(() => {
                setData(prevData => ({
                    entries: prevData.entries.filter((_, i) => i !== index)
                }));
            })
            .catch(error => setError(error));
    };

    const handleEditEntry = (index) => {
        setEditIndex(index);
        setEditedEntry(data.entries[index]);
    };

    const handleUpdateEntry = () => {
        if (editedEntry.API && editedEntry.Id) {
            fetch(`${API_URL}/api/keys/${editIndex}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedEntry)
            })
                .then(() => {
                    setData(prevData => ({
                        entries: prevData.entries.map((entry, index) =>
                            index === editIndex ? editedEntry : entry
                        )
                    }));
                    setEditIndex(null);
                    setEditedEntry({ API: '', Id: '' });
                })
                .catch(error => setError(error));
        }
    };

    if (loading) return <p className="text-center mt-4 text-white">Loading...</p>;
    if (error) return <p className="text-center mt-4 text-red-400">Error: {error.message}</p>;

    return (
        <div className="text-white  flex items-center justify-center p-4 ">
            <div className="max-w-3xl w-full">
                <div className="mb-4 text-center">
                    <h1 className="text-xl font-semibold">API Entries:</h1>
                    {data.entries.length === 0 ? (

                        <div className="flex flex-col md:flex-row md:justify-center mt-4">
                            <input
                                className="p-2 rounded-lg border border-gray-700 bg-gray-800 text-white mb-2 md:mb-0 md:mr-2 flex-1"
                                value={newEntry.API}
                                onChange={(e) => setNewEntry(prev => ({ ...prev, API: e.target.value }))}
                                placeholder="Enter API value"
                            />
                            <input
                                className="p-2 rounded-lg border border-gray-700 bg-gray-800 text-white mb-2 md:mb-0 md:mr-2 flex-1"
                                value={newEntry.Id}
                                onChange={(e) => setNewEntry(prev => ({ ...prev, Id: e.target.value }))}
                                placeholder="Enter Merchent Id"
                            />
                            <button
                                className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                onClick={handleAddEntry}
                            >
                                Add Entry
                            </button>
                        </div>
                    ) : <h5>Api are already present you delete existing to add new</h5>}
                </div>
                <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
                    <thead>
                        <tr>
                            <th className="p-2 text-left">API</th>
                            <th className="p-2 text-left">Id</th>
                            <th className="p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.entries.map((entry, index) => (
                            <tr key={index}>
                                <td className="p-2">{entry.API}</td>
                                <td className="p-2">{entry.Id}</td>
                                <td className="p-2">
                                    <button
                                        className="bg-yellow-500 text-white p-1 rounded mr-2"
                                        onClick={() => handleEditEntry(index)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-600 text-white p-1 rounded"
                                        onClick={() => handleDeleteEntry(index)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {editIndex !== null && (
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2">Edit Entry</h2>
                        <input
                            className="p-2 rounded-lg border border-gray-700 bg-gray-800 text-white mb-2 flex-1"
                            value={editedEntry.API}
                            onChange={(e) => setEditedEntry(prev => ({ ...prev, API: e.target.value }))}
                            placeholder="Edit API value"
                        />
                        <input
                            className="p-2 rounded-lg border border-gray-700 bg-gray-800 text-white mb-2 flex-1"
                            value={editedEntry.Id}
                            onChange={(e) => setEditedEntry(prev => ({ ...prev, Id: e.target.value }))}
                            placeholder="Edit Id value"
                        />
                        <button
                            className="p-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                            onClick={handleUpdateEntry}
                        >
                            Update Entry
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApiList;
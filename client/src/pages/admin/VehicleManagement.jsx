import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import toast from 'react-hot-toast';

const VehicleManagement = () => {
    const [vehicles, setVehicles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        vehicleNumber: '',
        type: 'car',
        brand: '',
        model: '',
        capacity: 4,
        carType: 'sedan',
        busType: 'none',
    });

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await api.get('/vehicles');
            setVehicles(response.data.data.vehicles);
        } catch (error) {
            toast.error('Failed to load vehicles');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingVehicle) {
                await api.put(`/vehicles/${editingVehicle._id}`, formData);
                toast.success('Vehicle updated successfully');
            } else {
                await api.post('/vehicles', formData);
                toast.success('Vehicle created successfully');
            }
            resetForm();
            fetchVehicles();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this vehicle?')) {
            try {
                await api.delete(`/vehicles/${id}`);
                toast.success('Vehicle deleted successfully');
                fetchVehicles();
            } catch (error) {
                toast.error('Failed to delete vehicle');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            vehicleNumber: '',
            type: 'car',
            brand: '',
            model: '',
            capacity: 4,
            carType: 'sedan',
            busType: 'none',
        });
        setEditingVehicle(null);
        setShowModal(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Vehicle Management</h1>
                    <button onClick={() => setShowModal(true)} className="btn-primary">
                        Add Vehicle
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.map((vehicle) => (
                        <div key={vehicle._id} className="card">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-3xl">{vehicle.type === 'bus' ? '🚌' : '🚗'}</span>
                                <span className={`px-2 py-1 rounded-lg text-xs ${vehicle.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {vehicle.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{vehicle.name}</h3>
                            <div className="space-y-1 text-sm text-gray-600 mb-4">
                                <p>Number: {vehicle.vehicleNumber}</p>
                                <p>Brand: {vehicle.brand} {vehicle.model}</p>
                                <p>Capacity: {vehicle.capacity} seats</p>
                                <p>Type: {vehicle.type === 'bus' ? vehicle.busType : vehicle.carType}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => {
                                        setEditingVehicle(vehicle);
                                        setFormData({ ...vehicle });
                                        setShowModal(true);
                                    }}
                                    className="btn-secondary flex-1 text-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(vehicle._id)}
                                    className="btn-danger flex-1 text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                            <h2 className="text-2xl font-bold mb-4">{editingVehicle ? 'Edit' : 'Add'} Vehicle</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Vehicle Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="input-field"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Vehicle Number"
                                    value={formData.vehicleNumber}
                                    onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value.toUpperCase() })}
                                    className="input-field"
                                    required
                                />
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="input-field"
                                    required
                                >
                                    <option value="car">Car</option>
                                    <option value="bus">Bus</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Brand"
                                    value={formData.brand}
                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                    className="input-field"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Model"
                                    value={formData.model}
                                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                                    className="input-field"
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Capacity"
                                    value={formData.capacity}
                                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                                    className="input-field"
                                    min="1"
                                    required
                                />
                                {formData.type === 'car' ? (
                                    <select
                                        value={formData.carType}
                                        onChange={(e) => setFormData({ ...formData, carType: e.target.value })}
                                        className="input-field"
                                    >
                                        <option value="sedan">Sedan</option>
                                        <option value="suv">SUV</option>
                                        <option value="hatchback">Hatchback</option>
                                        <option value="luxury">Luxury</option>
                                    </select>
                                ) : (
                                    <select
                                        value={formData.busType}
                                        onChange={(e) => setFormData({ ...formData, busType: e.target.value })}
                                        className="input-field"
                                    >
                                        <option value="ac">AC</option>
                                        <option value="non-ac">Non-AC</option>
                                        <option value="sleeper">Sleeper</option>
                                        <option value="semi-sleeper">Semi-Sleeper</option>
                                    </select>
                                )}
                                <div className="flex space-x-2">
                                    <button type="submit" className="btn-primary flex-1">
                                        {editingVehicle ? 'Update' : 'Create'}
                                    </button>
                                    <button type="button" onClick={resetForm} className="btn-secondary flex-1">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VehicleManagement;

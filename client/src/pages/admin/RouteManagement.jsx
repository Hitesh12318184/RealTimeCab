import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import toast from 'react-hot-toast';

const RouteManagement = () => {
    const [routes, setRoutes] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingRoute, setEditingRoute] = useState(null);
    const [formData, setFormData] = useState({
        source: '',
        destination: '',
        distance: '',
        duration: '',
        vehicle: '',
        price: '',
        schedule: {
            journeyDate: new Date().toISOString().split('T')[0],
            departureTime: '08:00',
            arrivalTime: '12:00',
        },
    });

    useEffect(() => {
        fetchRoutes();
        fetchVehicles();
    }, []);

    const fetchRoutes = async () => {
        try {
            const response = await api.get('/routes');
            setRoutes(response.data.data.routes);
        } catch (error) {
            toast.error('Failed to load routes');
        }
    };

    const fetchVehicles = async () => {
        try {
            const response = await api.get('/vehicles?isActive=true');
            setVehicles(response.data.data.vehicles);
        } catch (error) {
            console.error('Failed to load vehicles');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingRoute) {
                await api.put(`/routes/${editingRoute._id}`, formData);
                toast.success('Route updated successfully');
            } else {
                await api.post('/routes', formData);
                toast.success('Route created successfully');
            }
            resetForm();
            fetchRoutes();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this route?')) {
            try {
                await api.delete(`/routes/${id}`);
                toast.success('Route deleted');
                fetchRoutes();
            } catch (error) {
                toast.error('Failed to delete route');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            source: '',
            destination: '',
            distance: '',
            duration: '',
            vehicle: '',
            price: '',
            schedule: {
                journeyDate: new Date().toISOString().split('T')[0],
                departureTime: '08:00',
                arrivalTime: '12:00',
            },
        });
        setEditingRoute(null);
        setShowModal(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Route Management</h1>
                    <button onClick={() => setShowModal(true)} className="btn-primary">
                        Add Route
                    </button>
                </div>

                <div className="space-y-4">
                    {routes.map((route) => (
                        <div key={route._id} className="card flex justify-between items-center">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-2">
                                    {route.source} → {route.destination}
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Vehicle:</span> {route.vehicle?.name}
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Distance:</span> {route.distance} km
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Duration:</span> {route.duration}
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Price:</span> <span className="font-semibold text-primary-600">₹{route.price}</span>
                                    </div>
                                </div>
                                {route.schedule?.journeyDate && (
                                    <div className="mt-2 text-sm">
                                        <span className="text-gray-500">Journey Date:</span> <span className="font-medium">{new Date(route.schedule.journeyDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        <span className="mx-2">•</span>
                                        <span className="text-gray-500">Departure:</span> <span className="font-medium">{route.schedule.departureTime}</span>
                                        <span className="mx-2">•</span>
                                        <span className="text-gray-500">Arrival:</span> <span className="font-medium">{route.schedule.arrivalTime}</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex space-x-2 ml-4">
                                <button
                                    onClick={() => {
                                        setEditingRoute(route);
                                        setFormData({
                                            source: route.source,
                                            destination: route.destination,
                                            distance: route.distance,
                                            duration: route.duration,
                                            vehicle: route.vehicle?._id,
                                            price: route.price,
                                            schedule: route.schedule || {
                                                journeyDate: new Date().toISOString().split('T')[0],
                                                departureTime: '08:00',
                                                arrivalTime: '12:00'
                                            },
                                        });
                                        setShowModal(true);
                                    }}
                                    className="btn-secondary text-sm"
                                >
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(route._id)} className="btn-danger text-sm">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full">
                            <h2 className="text-2xl font-bold mb-4">{editingRoute ? 'Edit' : 'Add'} Route</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Source City"
                                    value={formData.source}
                                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                                    className="input-field"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Destination City"
                                    value={formData.destination}
                                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                    className="input-field"
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Distance (km)"
                                    value={formData.distance}
                                    onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                                    className="input-field"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Duration (e.g., 4 hours)"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    className="input-field"
                                    required
                                />
                                <select
                                    value={formData.vehicle}
                                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                                    className="input-field"
                                    required
                                >
                                    <option value="">Select Vehicle</option>
                                    {vehicles.map((v) => (
                                        <option key={v._id} value={v._id}>
                                            {v.name} ({v.vehicleNumber})
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    placeholder="Price (₹)"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="input-field"
                                    required
                                />
                                <div>
                                    <label className="block text-sm mb-1 text-gray-700 font-medium">Journey Date</label>
                                    <input
                                        type="date"
                                        value={formData.schedule.journeyDate}
                                        onChange={(e) => setFormData({ ...formData, schedule: { ...formData.schedule, journeyDate: e.target.value } })}
                                        className="input-field"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm mb-1 text-gray-700 font-medium">Departure Time</label>
                                        <input
                                            type="time"
                                            value={formData.schedule.departureTime}
                                            onChange={(e) => setFormData({ ...formData, schedule: { ...formData.schedule, departureTime: e.target.value } })}
                                            className="input-field"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-1 text-gray-700 font-medium">Arrival Time</label>
                                        <input
                                            type="time"
                                            value={formData.schedule.arrivalTime}
                                            onChange={(e) => setFormData({ ...formData, schedule: { ...formData.schedule, arrivalTime: e.target.value } })}
                                            className="input-field"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button type="submit" className="btn-primary flex-1">
                                        {editingRoute ? 'Update' : 'Create'}
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

export default RouteManagement;

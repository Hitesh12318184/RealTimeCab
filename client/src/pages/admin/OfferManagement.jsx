import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import toast from 'react-hot-toast';

const OfferManagement = () => {
    const [offers, setOffers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingOffer, setEditingOffer] = useState(null);
    const [formData, setFormData] = useState({
        code: '',
        title: '',
        description: '',
        discountType: 'percentage',
        discountValue: '',
        maxDiscount: '',
        minBookingAmount: 0,
        validFrom: '',
        validTill: '',
        applicableOn: 'all',
    });

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            const response = await api.get('/offers');
            setOffers(response.data.data.offers);
        } catch (error) {
            toast.error('Failed to load offers');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingOffer) {
                await api.put(`/offers/${editingOffer._id}`, formData);
                toast.success('Offer updated');
            } else {
                await api.post('/offers', formData);
                toast.success('Offer created');
            }
            resetForm();
            fetchOffers();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const toggleStatus = async (id) => {
        try {
            await api.patch(`/offers/${id}/toggle`);
            toast.success('Offer status updated');
            fetchOffers();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this offer?')) {
            try {
                await api.delete(`/offers/${id}`);
                toast.success('Offer deleted');
                fetchOffers();
            } catch (error) {
                toast.error('Failed to delete');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            code: '',
            title: '',
            description: '',
            discountType: 'percentage',
            discountValue: '',
            maxDiscount: '',
            minBookingAmount: 0,
            validFrom: '',
            validTill: '',
            applicableOn: 'all',
        });
        setEditingOffer(null);
        setShowModal(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Offer Management</h1>
                    <button onClick={() => setShowModal(true)} className="btn-primary">
                        Add Offer
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {offers.map((offer) => (
                        <div key={offer._id} className="card">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold">{offer.title}</h3>
                                    <p className="text-sm text-gray-600">{offer.code}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => toggleStatus(offer._id)}
                                        className={`px-3 py-1 rounded text-xs ${offer.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                    >
                                        {offer.isActive ? 'Active' : 'Inactive'}
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-700 mb-4">{offer.description}</p>
                            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                                <div><span className="text-gray-500">Discount:</span> {offer.discountType === 'percentage' ? `${offer.discountValue}%` : `₹${offer.discountValue}`}</div>
                                <div><span className="text-gray-500">Min Amount:</span> ₹{offer.minBookingAmount}</div>
                                <div><span className="text-gray-500">Valid Till:</span> {new Date(offer.validTill).toLocaleDateString()}</div>
                                <div><span className="text-gray-500">Used:</span> {offer.usedCount} times</div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => {
                                        setEditingOffer(offer);
                                        setFormData({
                                            ...offer,
                                            validFrom: offer.validFrom.split('T')[0],
                                            validTill: offer.validTill.split('T')[0],
                                        });
                                        setShowModal(true);
                                    }}
                                    className="btn-secondary text-sm flex-1"
                                >
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(offer._id)} className="btn-danger text-sm flex-1">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                            <h2 className="text-2xl font-bold mb-4">{editingOffer ? 'Edit' : 'Add'} Offer</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input type="text" placeholder="Offer Code (e.g., SAVE50)" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })} className="input-field" required />
                                <input type="text" placeholder="Offer Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="input-field" required />
                                <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input-field" rows="3" required />
                                <select value={formData.discountType} onChange={(e) => setFormData({ ...formData, discountType: e.target.value })} className="input-field">
                                    <option value="percentage">Percentage</option>
                                    <option value="flat">Flat Amount</option>
                                </select>
                                <input type="number" placeholder="Discount Value" value={formData.discountValue} onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })} className="input-field" required />
                                <input type="number" placeholder="Max Discount (optional)" value={formData.maxDiscount} onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })} className="input-field" />
                                <input type="number" placeholder="Min Booking Amount" value={formData.minBookingAmount} onChange={(e) => setFormData({ ...formData, minBookingAmount: e.target.value })} className="input-field" />
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm mb-1">Valid From</label>
                                        <input type="date" value={formData.validFrom} onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })} className="input-field" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-1">Valid Till</label>
                                        <input type="date" value={formData.validTill} onChange={(e) => setFormData({ ...formData, validTill: e.target.value })} className="input-field" required />
                                    </div>
                                </div>
                                <select value={formData.applicableOn} onChange={(e) => setFormData({ ...formData, applicableOn: e.target.value })} className="input-field">
                                    <option value="all">All Vehicles</option>
                                    <option value="car">Car Only</option>
                                    <option value="bus">Bus Only</option>
                                </select>
                                <div className="flex space-x-2">
                                    <button type="submit" className="btn-primary flex-1">{editingOffer ? 'Update' : 'Create'}</button>
                                    <button type="button" onClick={resetForm} className="btn-secondary flex-1">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OfferManagement;

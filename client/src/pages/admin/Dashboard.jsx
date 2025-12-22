import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await api.get('/admin/stats');
            setStats(response.data.data.stats);
            setRecentBookings(response.data.data.recentBookings);
        } catch (error) {
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="card bg-blue-50 border-blue-200 border-2">
                        <div className="text-3xl mb-2">👥</div>
                        <h3 className="text-gray-600 text-sm">Total Users</h3>
                        <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
                    </div>

                    <div className="card bg-green-50 border-green-200 border-2">
                        <div className="text-3xl mb-2">📋</div>
                        <h3 className="text-gray-600 text-sm">Total Bookings</h3>
                        <p className="text-3xl font-bold text-green-600">{stats.totalBookings}</p>
                    </div>

                    <div className="card bg-yellow-50 border-yellow-200 border-2">
                        <div className="text-3xl mb-2">⏳</div>
                        <h3 className="text-gray-600 text-sm">Pending Bookings</h3>
                        <p className="text-3xl font-bold text-yellow-600">{stats.pendingBookings}</p>
                    </div>

                    <div className="card bg-purple-50 border-purple-200 border-2">
                        <div className="text-3xl mb-2">💰</div>
                        <h3 className="text-gray-600 text-sm">Total Revenue</h3>
                        <p className="text-3xl font-bold text-purple-600">₹{stats.totalRevenue.toLocaleString()}</p>
                    </div>
                </div>

                {/* Booking Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="card">
                        <h3 className="text-sm font-medium text-gray-600 mb-2">Approved</h3>
                        <p className="text-2xl font-bold text-green-600">{stats.approvedBookings}</p>
                    </div>
                    <div className="card">
                        <h3 className="text-sm font-medium text-gray-600 mb-2">Rejected</h3>
                        <p className="text-2xl font-bold text-red-600">{stats.rejectedBookings}</p>
                    </div>
                    <div className="card">
                        <h3 className="text-sm font-medium text-gray-600 mb-2">Cancelled</h3>
                        <p className="text-2xl font-bold text-gray-600">{stats.cancelledBookings}</p>
                    </div>
                </div>

                {/* Recent Bookings */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Bookings</h2>
                    <div className="card">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking #</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {recentBookings.map((booking) => (
                                        <tr key={booking._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.bookingNumber}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.user?.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {booking.route?.source} → {booking.route?.destination}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">₹{booking.finalAmount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {new Date(booking.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

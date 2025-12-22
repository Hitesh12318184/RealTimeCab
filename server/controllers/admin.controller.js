const User = require('../models/user.model');
const Booking = require('../models/booking.model');

/**
 * Get dashboard statistics (Admin only)
 */
const getDashboardStats = async (req, res) => {
    try {
        // Get total users
        const totalUsers = await User.countDocuments({ role: 'user' });

        // Get total bookings
        const totalBookings = await Booking.countDocuments();

        // Get bookings by status
        const pendingBookings = await Booking.countDocuments({ status: 'pending' });
        const approvedBookings = await Booking.countDocuments({ status: 'approved' });
        const rejectedBookings = await Booking.countDocuments({ status: 'rejected' });
        const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });

        // Calculate total revenue
        const revenueData = await Booking.aggregate([
            { $match: { status: 'approved', paymentStatus: 'completed' } },
            { $group: { _id: null, total: { $sum: '$finalAmount' } } }
        ]);
        const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

        // Get recent bookings
        const recentBookings = await Booking.find()
            .populate('user', 'name email')
            .populate('route')
            .populate('vehicle')
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json({
            success: true,
            data: {
                stats: {
                    totalUsers,
                    totalBookings,
                    pendingBookings,
                    approvedBookings,
                    rejectedBookings,
                    cancelledBookings,
                    totalRevenue
                },
                recentBookings
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard statistics',
            error: error.message
        });
    }
};

/**
 * Get all users (Admin only)
 */
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' })
            .select('-password -refreshToken')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            data: { users }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
};

/**
 * Toggle user active status (Admin only)
 */
const toggleUserStatus = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.role === 'admin') {
            return res.status(400).json({
                success: false,
                message: 'Cannot modify admin user status'
            });
        }

        user.isActive = !user.isActive;
        await user.save();

        res.status(200).json({
            success: true,
            message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
            data: { user }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error toggling user status',
            error: error.message
        });
    }
};

module.exports = {
    getDashboardStats,
    getAllUsers,
    toggleUserStatus
};

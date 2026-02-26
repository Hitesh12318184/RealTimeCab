require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');
const Vehicle = require('./models/vehicle.model');
const Route = require('./models/route.model');
const Offer = require('./models/offer.model');

const connectDB = require('./config/db');

const seedDatabase = async () => {
    try {
        await connectDB();

        // Clear existing data
        console.log('Clearing existing data...');
        await User.deleteMany({});
        await Vehicle.deleteMany({});
        await Route.deleteMany({});
        await Offer.deleteMany({});

        // Create users
        console.log('Creating users...');
        const users = await User.create([
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'admin123',
                phone: '9876543210',
                role: 'admin',
            },
            {
                name: 'John Doe',
                email: 'user@example.com',
                password: 'user123',
                phone: '9876543211',
                role: 'user',
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: 'user123',
                phone: '9876543212',
                role: 'user',
            },
        ]);

        // Create vehicles
        console.log('Creating vehicles...');
        const vehicles = await Vehicle.create([
            {
                name: 'Luxury Sedan',
                vehicleNumber: 'DL01AB1234',
                type: 'car',
                brand: 'Toyota',
                model: 'Camry',
                capacity: 4,
                carType: 'luxury',
            },
            {
                name: 'SUV Express',
                vehicleNumber: 'MH02CD5678',
                type: 'car',
                brand: 'Mahindra',
                model: 'XUV700',
                capacity: 7,
                carType: 'suv',
            },
            {
                name: 'Volvo AC Sleeper',
                vehicleNumber: 'KA03EF9012',
                type: 'bus',
                brand: 'Volvo',
                model: 'Multi-Axle',
                capacity: 40,
                busType: 'sleeper',
            },
            {
                name: 'AC Seater Bus',
                vehicleNumber: 'TN04GH3456',
                type: 'bus',
                brand: 'Ashok Leyland',
                model: 'Viking',
                capacity: 50,
                busType: 'ac',
            },
            {
                name: 'Premium Sedan',
                vehicleNumber: 'DL05XY7890',
                type: 'car',
                brand: 'Honda',
                model: 'Accord',
                capacity: 4,
                carType: 'sedan',
            },
            {
                name: 'Luxury SUV',
                vehicleNumber: 'MH06PQ4567',
                type: 'car',
                brand: 'Toyota',
                model: 'Fortuner',
                capacity: 7,
                carType: 'suv',
            },
        ]);

        // Create routes
        console.log('Creating routes...');
        const routes = await Route.create([
            {
                source: 'Delhi',
                destination: 'Mumbai',
                distance: 1450,
                duration: '18 hours',
                vehicle: vehicles[2]._id, // Bus
                price: 1200,
                schedule: {
                    departureTime: '20:00',
                    arrivalTime: '14:00',
                },
            },
            {
                source: 'Delhi',
                destination: 'Mumbai',
                distance: 1450,
                duration: '20 hours',
                vehicle: vehicles[4]._id, // Premium Sedan (car)
                price: 3500,
                schedule: {
                    departureTime: '06:00',
                    arrivalTime: '02:00',
                },
            },
            {
                source: 'Delhi',
                destination: 'Jaipur',
                distance: 280,
                duration: '5 hours',
                vehicle: vehicles[0]._id, // Luxury Sedan (car)
                price: 800,
                schedule: {
                    departureTime: '08:00',
                    arrivalTime: '13:00',
                },
            },
            {
                source: 'Mumbai',
                destination: 'Pune',
                distance: 150,
                duration: '3 hours',
                vehicle: vehicles[1]._id, // SUV Express (car)
                price: 500,
                schedule: {
                    departureTime: '10:00',
                    arrivalTime: '13:00',
                },
            },
            {
                source: 'Bangalore',
                destination: 'Chennai',
                distance: 350,
                duration: '6 hours',
                vehicle: vehicles[3]._id, // Bus
                price: 600,
                schedule: {
                    departureTime: '06:00',
                    arrivalTime: '12:00',
                },
            },
            {
                source: 'Bangalore',
                destination: 'Chennai',
                distance: 350,
                duration: '5 hours',
                vehicle: vehicles[5]._id, // Luxury SUV (car)
                price: 1800,
                schedule: {
                    departureTime: '08:00',
                    arrivalTime: '13:00',
                },
            },
            {
                source: 'Kolkata',
                destination: 'Guwahati',
                distance: 1000,
                duration: '14 hours',
                vehicle: vehicles[2]._id, // Bus
                price: 1000,
                schedule: {
                    departureTime: '18:00',
                    arrivalTime: '08:00',
                },
            },
        ]);

        // Create offers
        console.log('Creating offers...');
        const now = new Date();
        const futureDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

        await Offer.create([
            {
                code: 'FIRST50',
                title: 'First Booking Offer',
                description: 'Get 50% off on your first booking',
                discountType: 'percentage',
                discountValue: 50,
                maxDiscount: 500,
                minBookingAmount: 500,
                validFrom: now,
                validTill: futureDate,
                applicableOn: 'all',
            },
            {
                code: 'SAVE100',
                title: 'Flat ₹100 Off',
                description: 'Get flat ₹100 off on bookings above ₹800',
                discountType: 'flat',
                discountValue: 100,
                minBookingAmount: 800,
                validFrom: now,
                validTill: futureDate,
                applicableOn: 'all',
            },
            {
                code: 'BUSFARE20',
                title: 'Bus Discount',
                description: '20% off on all bus bookings',
                discountType: 'percentage',
                discountValue: 20,
                maxDiscount: 300,
                minBookingAmount: 0,
                validFrom: now,
                validTill: futureDate,
                applicableOn: 'bus',
            },
        ]);

        console.log('✅ Database seeded successfully!');
        console.log('\nSample Credentials:');
        console.log('Admin: admin@example.com / admin123');
        console.log('User: user@example.com / user123');
        console.log('\nSample Offer Codes: FIRST50, SAVE100, BUSFARE20');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();

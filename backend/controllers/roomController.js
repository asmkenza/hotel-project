import { Room } from "../models/RoomModel.js";
import RoomCategory from '../models/categoryRoomModel.js';
import moment from 'moment';





// Création d'une chambre
export const createRoom = async (req, res) => {
    const hotelId = "67db40465c519d5288027a63";
    const { name, category, code, capacity, description } = req.body;

    try {
        const roomCategory = await RoomCategory.findById(category);

        if (!roomCategory) {
            return res.status(404).json({ message: 'Creation failed, category not found in db' });
        }

        const room = await Room.create({
            name,
            category,
            code,
            capacity,
            description,
            refHotel: hotelId
        });

        res.status(201).json({ message: 'Room created :)', room });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(error);
    }
};

// Toutes les chambres
export const getRooms = async (req, res) => {
    const hotelId = "67db40465c519d5288027a63";
    try {
        const rooms = await Room.find({ refHotel: hotelId })
                                .populate('category', 'name')
                                .select('+createdAt');

        // Format the dates
        const formattedRooms = rooms.map(room => {
            const formattedDate = moment(room.createdAt).format('DD-MM-YYYY à HH:mm');
            return {
                ...room._doc,
                createdAt: formattedDate,
                category: room.category ? room.category.name : 'No Category'
            };
        });

        res.status(200).json(formattedRooms);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(error);
    }
};

// Une seule chambre
export const getRoom = async (req, res) => {
    const { id } = req.params;
    const hotelId = "67db40465c519d5288027a63";
    try {
        const room = await Room.findById({ _id: id, refHotel: hotelId }).populate('category', 'name');

        if (!room) {
            return res.status(404).json({ message: 'Room not found :(' });
        }

        // Format the date
        const formattedDate = moment(room.createdAt).format('DD-MM-YYYY à HH:mm');
        const formattedRoom = {
            ...room._doc,
            createdAt: formattedDate,
            category: room.category.name
        };

        res.status(200).json(formattedRoom);

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(error);
    }
};

// Supprimer une chambre
export const deleteRoom = async (req, res) => {
    const { id } = req.params;
    const hotelId = "67db40465c519d5288027a63";
    try {
        const room = await Room.findById({ _id: id, hotelId });

        if (!room) {
            return res.status(404).json({ message: 'Room not found :(' });
        }

        await Room.findByIdAndDelete({ _id: id, hotelId });
        res.status(200).json({ message: "Room deleted :)" });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(error);
    }
};


// Mise à jour d'une chambre
export const updateRoom = async (req, res) => {
    const { id } = req.params;
    const hotelId = "67db40465c519d5288027a63";
    const { name, category, code, capacity, description } = req.body;

    try {
        const roomFound = await Room.findById({ _id: id, hotelId });

        if (!roomFound) {
            return res.status(404).json({ message: 'Room not found :(' });
        }

        const updatedData = {
            name,
            category,
            code,
            capacity,
            description,
        };

        const room = await Room.findByIdAndUpdate({ _id: id, hotelId }, updatedData, { new: true })
                               .populate('category', 'name');

        if (!room) {
            return res.status(404).json({ message: "Update failed, room not found." });
        }

        // Format the date
        const formattedDate = moment(room.createdAt).format('DD-MM-YYYY à HH:mm');
        const formattedRoom = {
            ...room._doc,
            createdAt: formattedDate,
            category: room.category ? room.category.name : 'No Category'
        };

        res.status(200).json(formattedRoom);

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(error);
    }
};
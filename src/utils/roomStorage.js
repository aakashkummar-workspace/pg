
const STORAGE_KEY = 'roomsync_rooms';

export const getRooms = () => {
    const rooms = localStorage.getItem(STORAGE_KEY);
    return rooms ? JSON.parse(rooms) : {};
};

export const saveRooms = (rooms) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
};

export const createRoom = (roomName, creator) => {
    const rooms = getRooms();
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    rooms[code] = {
        name: roomName,
        code: code,
        members: [{
            name: creator.name || 'Admin',
            role: 'Admin',
            status: '🏠 At Home',
            avatar: creator.name || 'Admin'
        }],
        createdAt: Date.now()
    };

    saveRooms(rooms);
    return rooms[code];
};

export const joinRoom = (roomCode, user) => {
    const rooms = getRooms();
    const room = rooms[roomCode];

    if (!room) return null;

    // Check if user already exists
    const exists = room.members.find(m => m.name === user.name);
    if (!exists) {
        room.members.push({
            name: user.name || 'Member',
            role: 'Member',
            status: '🏠 At Home',
            avatar: user.name || 'Member'
        });
        saveRooms(rooms);
    }

    return room;
};

export const getRoom = (roomCode) => {
    const rooms = getRooms();
    return rooms[roomCode] || null;
};

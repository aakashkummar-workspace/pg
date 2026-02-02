
const STORAGE_KEY = 'roomsync_rooms';

export const getRooms = () => {
    const rooms = localStorage.getItem(STORAGE_KEY);
    let parsedRooms = rooms ? JSON.parse(rooms) : {};

    // Seed Demo Rooms if they don't exist
    const seeds = [
        {
            code: 'DEMO123',
            name: 'Demo House',
            members: [
                { name: 'Alice', role: 'Admin', status: '🏠 At Home', avatar: 'Alice' },
                { name: 'Bob', role: 'Member', status: '🏢 At Work', avatar: 'Bob' },
                { name: 'Charlie', role: 'Member', status: '🏃 Gym', avatar: 'Charlie' }
            ]
        },
        {
            code: 'SKY123',
            name: 'Sky Castle 🏰',
            members: [
                { name: 'Queen', role: 'Admin', status: '🏰 Throneroom', avatar: 'Queen' },
                { name: 'Knight', role: 'Member', status: '🛡️ Guarding', avatar: 'Knight' }
            ]
        },
        {
            code: 'CHILL9',
            name: 'Chill Zone 🧊',
            members: [
                { name: 'CoolCat', role: 'Admin', status: '🧊 Chilling', avatar: 'CoolCat' }
            ]
        }
    ];

    let dirty = false;
    seeds.forEach(seed => {
        if (!parsedRooms[seed.code]) {
            parsedRooms[seed.code] = {
                name: seed.name,
                code: seed.code,
                members: seed.members,
                createdAt: Date.now()
            };
            dirty = true;
        }
    });

    if (dirty) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedRooms));
    }

    return parsedRooms;
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

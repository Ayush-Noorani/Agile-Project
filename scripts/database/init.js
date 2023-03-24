db.createUser({
    user: 'appUser',
    pwd: 'test',
    roles: [
        {
            role: 'readWrite',
            db: 'testDB',
        },
    ],
});

db = new Mongo().getDB("testDB");

db.user_details.insert({
    username:"test",
    password: Buffer.from('$2b$12$Z0h/vt43WrmIlYuFX/VzieWTAagc/UqHvcUDZMDlOhm7qrVr3Uk5O', 'utf-8'),
})


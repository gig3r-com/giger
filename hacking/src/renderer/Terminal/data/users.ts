// NO BIG LETTERS IN IDs!!!

export const users = {
    janedoeid123: {
        id: 'janedoeid123',
        name: 'Jane Doe',
        netId: 'testnetid',
        subnetId: 'testsubnetid',
        adminId: 'mikescottid123',
        address: 'addresshash123',
    },
    mikescottid123: {
        id: 'mikescottid123',
        name: 'Mike Scott',
        netId: 'testnetid',
        subnetId: 'testsubnetid',
        adminId: 'mikescottid123',
        address: 'addresshash234',
    },
};

export const usersHashes = {
    '1234567890': users.janedoeid123,
    'userhash': users.janedoeid123,
    'adminhash': users.mikescottid123,
};

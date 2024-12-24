import User from '../models/User';


export const seedUsers = async () => {
  
  // Eklenecek kullanıcılar
  const users = [
    { userId: '1', userName: 'Alice' },
    { userId: '2', userName: 'Bob' },
    { userId: '3', userName: 'Charlie' },
    { userId: '4', userName: 'Mike' },
    { userId: '5', userName: 'Michael' }
  ];

  try {
    
    await User.deleteMany();

    await User.insertMany(users);

    console.log('Users seeded successfully');
  } catch (err) {
    console.error(`Error: ${(err as Error).message}`);
  }
};

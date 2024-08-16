import { v4 as uuid } from 'uuid';

import { User } from '../../../models/user/user.model';

export const USERS_SEED: User[] = [
  {
    id: uuid(),
    nombre: 'Franco',
    correoElectronico: 'diazlunafrancoe@gmail.com',
    edad: 28,
  },
  {
    id: uuid(),
    nombre: 'Joaquin',
    correoElectronico: 'lallanajoaquin@gmail.com',
    edad: 25,
  },
  {
    id: uuid(),
    nombre: 'Ignacio',
    correoElectronico: 'gutierrezignacio@gmail.com',
    edad: 30,
  },
];

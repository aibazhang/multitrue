/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const User = require('../../src/models/userModel');

describe('src/models/userModel', () => {
  beforeAll(async () => {
    mongoose.Promise = global.Promise;
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  describe('normal', () => {
    it('should create user signup infomation correctly', async () => {
      const user = {
        email: 'example@email.com',
        name: 'name',
        password: 'pass1234',
        passwordConfirm: 'pass1234',
        role: 'admin',
      };
      await User.create(user);
      const result = (({ email, name, password, passwordConfirm, role }) => ({
        email,
        name,
        password,
        passwordConfirm,
        role,
      }))(await User.findOne({}).select('+password +passwordConfirm'));
      expect(result).toEqual(user);
    });
    it('should have default value for field role and active', async () => {
      const user = {
        email: 'example@email.com',
        name: 'name',
        password: 'pass1234',
        passwordConfirm: 'pass1234',
      };
      await User.create(user);
      const result = await User.findOne({}).select('+active');
      await expect(result.role).toEqual('user');
      await expect(result.active).toEqual(true);
    });
  });

  describe('exception', () => {
    it('should have same password and passwordConfirm', async () => {
      const user = {
        email: 'example@email.com',
        name: 'name',
        password: 'pass1234',
        passwordConfirm: 'passpass',
      };
      await expect(User.create(user)).rejects.toThrow(
        /Password are not the same/
      );
    });
    it('should valid email address', async () => {
      const user = {
        email: 'email.com',
        name: 'name',
        password: 'pass1234',
        passwordConfirm: 'pass1234',
      };
      await expect(User.create(user)).rejects.toThrow(
        /Please provide a valid email/
      );
    });
    it('should unique email address', async () => {
      const user = [
        {
          email: 'example@email.com',
          name: 'name1',
          password: 'pass1234',
          passwordConfirm: 'pass1234',
        },
        {
          email: 'example@email.com',
          name: 'name2',
          password: 'pass1234',
          passwordConfirm: 'pass1234',
        },
      ];
      await expect(User.insertMany(user)).rejects.toThrow(/E11000/);
    });
    it('should valid password length', async () => {
      const user = {
        email: 'example@email.com',
        name: 'name',
        password: 'pass123',
        passwordConfirm: 'pass123',
      };
      await expect(User.create(user)).rejects.toThrow(/shorter/);
    });
    it('should valid role', async () => {
      const user = {
        email: 'example@email.com',
        name: 'name',
        password: 'pass1234',
        passwordConfirm: 'pass1234',
        role: 'invalid-role',
      };
      await expect(User.create(user)).rejects.toThrow(/not a valid enum/);
    });
  });
});

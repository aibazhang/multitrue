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
    const user = {
      email: 'example@email.com',
      name: 'name',
      password: 'pass1234',
      passwordConfirm: 'pass1234',
      role: 'admin',
    };

    beforeEach(async () => {
      await User.deleteMany({});
      await User.create(user);
    });

    it('should create user signup infomation correctly', async () => {
      const result = await User.findOne({}).select(
        '+password +passwordConfirm'
      );
      expect(result.email).toEqual(user.email);
      expect(result.name).toEqual(user.name);
      expect(result.role).toEqual(user.role);
      expect(
        result.correctPassword(user.password, result.password)
      ).toBeTruthy();
      expect(result.passwordConfirm).not.toBeDefined();
    });

    it('should create result token', async () => {
      const result = await User.findOne({});
      const resetToken = result.createPasswordResetToken();
      expect(resetToken.length).toEqual(64);
    });

    it('should have default value for field role and active', async () => {
      const user1 = {
        email: 'example1@email.com',
        name: 'name1',
        password: 'pass1234',
        passwordConfirm: 'pass1234',
      };
      await User.create(user1);
      const result = await User.findOne({ email: user1.email }).select(
        '+active'
      );
      await expect(result.role).toEqual('user');
      await expect(result.active).toBeTruthy();
    });

    it('should hide unactive users', async () => {
      const user1 = {
        email: 'example2@email.com',
        name: 'name2',
        password: 'pass1234',
        passwordConfirm: 'pass1234',
        active: false,
      };
      await User.create(user1);
      const result = await User.find({});
      await expect(result.length).toEqual(1);
    });

    it('should judge changed password after', async () => {
      const dateNow = Date.now();
      const JWTTimeStamp = parseInt(dateNow / 1000, 10);
      const userPast = {
        email: 'example1@email.com',
        name: 'name1',
        password: 'pass1234',
        passwordConfirm: 'pass1234',
        passwordChangeAt: dateNow - 5000,
      };

      const userFuture = {
        email: 'example2@email.com',
        name: 'name2',
        password: 'pass1234',
        passwordConfirm: 'pass1234',
        passwordChangeAt: dateNow + 5000,
      };

      await User.create(userPast);
      await User.create(userFuture);

      const result = await User.findOne({ email: user.email });
      const resultPast = await User.findOne({ email: userPast.email });
      const resultFuture = await User.findOne({ email: userFuture.email });

      expect(result.changedPasswordAfter(JWTTimeStamp)).not.toBeTruthy();
      expect(resultPast.changedPasswordAfter(JWTTimeStamp)).not.toBeTruthy();
      expect(resultFuture.changedPasswordAfter(JWTTimeStamp)).toBeTruthy();
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
      const users = [
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
      await expect(User.insertMany(users)).rejects.toThrow(/E11000/);
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

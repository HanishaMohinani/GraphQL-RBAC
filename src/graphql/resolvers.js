const mongoose = require('mongoose');
const User = require('../models/User');
const Role = require('../models/Role');
const Ticket = require('../models/Ticket');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return User.findById(user.id).populate('roles');
    },
    getUsers: () => User.find().populate('roles'),
    getTickets: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      if (user.roles.includes("ADMIN") || user.roles.includes("MANAGER")) {
        return Ticket.find().populate("owner");
      }
      return Ticket.find({ owner: user.id }).populate("owner");
    }    
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {
      const user = new User({ username, email, password });
      const defaultRole = await Role.findOne({ name: 'USER' });
      user.roles = [defaultRole._id];
      await user.save();
      return jwt.sign({ id: user._id, roles: [defaultRole.name] }, process.env.JWT_SECRET);
    },

    login: async (_, { username, password }) => {
      const user = await User.findOne({ username }).populate('roles');
      if (!user) throw new Error('User not found');
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid password');
      return jwt.sign({ id: user._id, roles: user.roles.map(r => r.name) }, process.env.JWT_SECRET);
    },

    createTicket: async (_, { title, description }, { user }) => {
      const ticket = new Ticket({ title, description, owner: user.id });
      await ticket.save();
      return ticket.populate("owner");
    },    

    assignRole: async (_, { userId, roleName }) => {
      const role = await Role.findOne({ name: roleName });
      const user = await User.findById(userId);
    
      const defaultRole = await Role.findOne({ name: "USER" });
      const rolesSet = new Set([
        ...user.roles.map(r => r.toString()),
        defaultRole._id.toString(),
        role._id.toString()
      ]);
      
      user.roles = Array.from(rolesSet).map(id => new mongoose.Types.ObjectId(id));
    
      await user.save();
      return user.populate("roles");
    }    
  },
};

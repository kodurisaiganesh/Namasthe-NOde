const express = require('express');
const requestRouter = express.Router();

const User = require('../models/users');
const ConnectionRequest = require('../models/ConnectionRequest');
const { userauth } = require('../middlewears/auth');

requestRouter.post(
  '/request/send/:status/:toUserId',
  userauth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const { toUserId, status } = req.params;

      // Allowed status check
      const allowedStatus = ['ignore', 'interested'];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: `Invalid status type: ${status}`,
        });
      }

      // Check if target user exists
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({
          message: 'User not found',
        });
      }

      // Check existing request (both directions)
      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingRequest) {
        return res.status(400).json({
          message: 'Connection request already exists',
        });
      }

      // Create request (self-request is blocked by schema pre-hook)
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      return res.status(201).json({
        message: req.user.firstName + '   is  ' +status+ ' to '+ toUser.firstName,
        data,
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }
);

requestRouter.post(
  '/request/review/:status/:requestId',
  userauth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ['accepted', 'rejected'];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: 'Status not valid' });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: 'interested',
      });

      if (!connectionRequest) {
        return res.status(404).json({
          message: 'Connection request not found or not authorized',
        });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();

      return res.json({
        message: `Connection status updated to ${status}`,
        data,
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }
);


module.exports = requestRouter;

'use strict';

// Determine if crypto support is available
const crypto=require('crypto');

// NOTE: Best practice is to load the Zoom API Keys from environment files, not hardcoded
// Define this module
let ZoomUtil = {};

ZoomUtil.generateSignatureString = function (meetingNumber = 0, role = 0, apiKey, apiSecret) {
   // Prevent time sync issue between client signature generation and zoom
  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
  const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
  const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')

  return signature;
};

module.exports = ZoomUtil;

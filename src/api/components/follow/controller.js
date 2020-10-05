'use strict'

const { param } = require('./network')

module.exports = (followService) => {

  async function getUserFollowers (params) {
    return followService.getUserFollowers(params)
  }

  async function follow (params) {
    return followService.follow(params)
  }

  async function unFollow (params) {
    return followService.unFollow(params)
  }

  return {
    getUserFollowers,
    follow,
    unFollow
  }
}

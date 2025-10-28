const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const config = getDefaultConfig(__dirname)

// helper to escape paths for RegExp
const escapeRegExp = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')

// block the backend folder from Metro bundling
const backendPath = escapeRegExp(path.join(__dirname, 'backend'))
const backendRegex = new RegExp(`${backendPath}\\/.*`)

config.resolver = config.resolver || {}
config.resolver.blockList = backendRegex

module.exports = config
import { createApp } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

// createApp.use(SvgIcon)

const req = require.context('./svg', false, /\.svg$/)

const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().map(requireContext)

requireAll(req)

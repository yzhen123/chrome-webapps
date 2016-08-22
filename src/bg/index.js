/* global chrome */

import chromeEvents from './chromeEvents'
import userEvents from './userEvents'
import { initPopWindow } from './popWindow'

chromeEvents.bind()
userEvents.bind()
initPopWindow('http://localhost:8080/')

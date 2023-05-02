import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import adminReducer from '../features/admin/adminSlice'
import testReducer from '../features/taketest/testSlice'
import resultReducer from '../features/results/resultSlice'
import getalluserReducer from '../features/getuser/getuserSlice'
import gettesteduserReducer from '../features/testeduser/testedSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authadmin: adminReducer,
    testdata: testReducer,
    testresult: resultReducer,
    allusers: getalluserReducer,
    testedusers: gettesteduserReducer
  },
});
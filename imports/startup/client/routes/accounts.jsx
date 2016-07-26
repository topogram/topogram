import React from 'react'
import { FlowRouter } from 'meteor/kadira:flow-router'
// import { AccountsTemplates } from 'meteor/useraccounts:core'
import { mount } from 'react-mounter'

import MainLayout from '../../../ui/layouts/MainLayout.jsx'
//
// //UserAccounts Routes
// AccountsTemplates.configureRoute('changePwd')
// // AccountsTemplates.configureRoute('enrollAccount')
// AccountsTemplates.configureRoute('forgotPwd')
// AccountsTemplates.configureRoute('resetPwd')
// AccountsTemplates.configureRoute('signIn')
// AccountsTemplates.configureRoute('signUp')
// AccountsTemplates.configureRoute('verifyEmail')

/*
Accounts.config({
  sendVerificationEmail: false,
  forbidClientAccountCreation: false
})

Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY',
  loginPath: '/login',
  signUpPath: '/signup',
  resetPasswordPath: '/reset-password',
  profilePath: '/profile',
  onSignedInHook: () => FlowRouter.go('/topograms'),
  onSignedOutHook: () => FlowRouter.go('/'),
  minimumPasswordLength: 6
})


FlowRouter.route('/login', {
  action() {
    mount(mainLayout, {
      content: <Accounts.ui.LoginForm />
    })
  }
})

*/
// AccountsTemplates.configure({
//     defaultLayoutType: 'blaze', // Optional, the default is 'blaze'
//     defaultTemplate: 'myCustomFullPageAtForm',
//     defaultLayout: 'myLayout',
//     defaultLayoutRegions: {
//         nav: 'myNav',
//         footer: 'myFooter'
//     },
//     defaultContentRegion: 'main'
// });

/*
var pwd = AccountsTemplates.removeField( 'password' );
AccountsTemplates.removeField( 'email' );
AccountsTemplates.addFields( [ {
        _id: 'username',
        type: 'text',
        displayName: 'username',
        required: true,
        minLength: 5
    }, {
        _id: 'email',
        type: 'email',
        required: true,
        displayName: 'email',
        re: /.+@(.+){2,}\.(.+){2,}/,
        errStr: 'Invalid email'
    },
    pwd
] );
*/

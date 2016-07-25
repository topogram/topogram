import { AccountsTemplates } from 'meteor/useraccounts:core'

//UserAccounts Routes
AccountsTemplates.configureRoute('changePwd')
// AccountsTemplates.configureRoute('enrollAccount')
AccountsTemplates.configureRoute('forgotPwd')
AccountsTemplates.configureRoute('resetPwd')
AccountsTemplates.configureRoute('signIn')
AccountsTemplates.configureRoute('signUp')
AccountsTemplates.configureRoute('verifyEmail')

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

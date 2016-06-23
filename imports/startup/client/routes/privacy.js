import { Router } from 'meteor/iron:router'
import { AccountsTemplates } from 'meteor/useraccounts:core'

// user-based privacy
Router.plugin('ensureSignedIn', {
  except: ['root', 'showTopogram', 'signIn', 'atSignIn', 'atSignUp', 'atForgotPassword', 'atResetPwd']
})

// handle
var mySubmitFunc = function( error ) {
    if ( !error ) {
        Router.go('/');
    }
};

// Options
AccountsTemplates.configure( {
    //defaultLayout: 'emptyLayout',
    showForgotPasswordLink: true,
    overrideLoginErrors: true,
    enablePasswordChange: true,
    sendVerificationEmail: false,

    //enforceEmailVerification: true,
    //confirmPassword: true,
    //continuousValidation: false,
    //displayFormLabels: true,
    //forbidClientAccountCreation: false,
    //formValidationFeedback: true,
    homeRoutePath: '/',
    redirectTimeout: 4000,
    //showAddRemoveServices: false,
    //showPlaceholders: true,

    negativeValidation: true,
    positiveValidation: true,
    negativeFeedback: false,
    positiveFeedback: false,

    onSubmitHook: mySubmitFunc

    // Privacy Policy and Terms of Use
    //privacyUrl: 'privacy',
    //termsUrl: 'terms-of-use',
} );

//UserAccounts Routes
AccountsTemplates.configureRoute('changePwd')
AccountsTemplates.configureRoute('enrollAccount')
AccountsTemplates.configureRoute('forgotPwd')
AccountsTemplates.configureRoute('resetPwd')
AccountsTemplates.configureRoute('signIn')
AccountsTemplates.configureRoute('signUp')
AccountsTemplates.configureRoute('verifyEmail')


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

// internationalization
T9n.setLanguage( 'en' );

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

    // Privacy Policy and Terms of Use
    //privacyUrl: 'privacy',
    //termsUrl: 'terms-of-use',
} );

var pwd = AccountsTemplates.removeField( 'password' );
AccountsTemplates.removeField( 'email' );
AccountsTemplates.addFields( [ {
        _id: 'username',
        type: 'text',
        displayName: 'username',
        required: true,
        minLength: 5,
    }, {
        _id: 'email',
        type: 'email',
        required: true,
        displayName: 'email',
        re: /.+@(.+){2,}\.(.+){2,}/,
        errStr: 'Invalid email',
    },
    pwd
] );

var mySubmitFunc = function( error, state ) {
    if ( !error ) {
        Router.go('/');
    }
};

AccountsTemplates.configure( {
    onSubmitHook: mySubmitFunc
} );

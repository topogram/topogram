import { AccountsTemplates } from 'meteor/useraccounts:core'

AccountsTemplates.configure( {
  defaultLayout: 'mainLayout',
  defaultContentRegion: 'main',
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
  positiveFeedback: false

    // onSubmitHook: mySubmitFunc

    // Privacy Policy and Terms of Use
    //privacyUrl: 'privacy',
    //termsUrl: 'terms-of-use',
} )
